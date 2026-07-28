import { useAuthStore } from "@/features/auth/auth.store";
import axios from "axios";
import { toast } from "sonner";
import { getApiErrorMessage } from "./api-error";

const getBaseURL = () => {
  if (typeof window !== "undefined") {
    return process.env.NEXT_PUBLIC_API_BASE_URL || "";
  }
  // On server, we need an absolute URL
  return process.env.NEXT_PUBLIC_API_BASE_URL || "https://serenabraide.com"; // Fallback to live if not set
};

export const api = axios.create({
  baseURL: getBaseURL(),
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor
api.interceptors.request.use((config) => {
  const { tokens, isTokenExpired, clearAuth } = useAuthStore.getState();

  const accessToken = tokens?.access;

  if (accessToken && isTokenExpired()) {
    clearAuth();
    toast.error("Session expired. Please log in again.");
    return Promise.reject("Token expired");
  }

  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  // For FormData, let axios set the Content-Type automatically
  // This ensures proper multipart/form-data boundary is set
  if (config.data instanceof FormData) {
    delete config.headers["Content-Type"];
  }

  return config;
});

// Error handler
api.interceptors.response.use(
  (res) => res,
  (error) => {
    // Don't show toast for 401 errors (unauthenticated) - let the app handle redirect
    // Don't show toast for cancelled requests
    if (error?.response?.status === 401) {
      return Promise.reject(error);
    }

    // Don't show generic error for network errors or cancelled requests
    if (error.code === "ERR_CANCELED" || error.message === "canceled") {
      return Promise.reject(error);
    }

    // Extract a readable message from any backend response shape, including
    // DRF top-level field errors like { phone_number: ["...already exists."] }.
    toast.error(getApiErrorMessage(error));
    return Promise.reject(error);
  }
);
