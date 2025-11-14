import { useAuthStore } from "@/features/auth/auth.store";
import axios from "axios";
import { toast } from "sonner";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
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

  return config;
});

// Error handler
api.interceptors.response.use(
  (res) => res,
  (error) => {
    toast.error(error?.response?.data?.message || "Something went wrong");
    return Promise.reject(error);
  }
);
