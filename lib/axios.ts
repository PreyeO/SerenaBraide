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

    const errorMessage = error?.response?.data?.message || 
                         error?.response?.data?.detail ||
                         "Something went wrong";
    toast.error(errorMessage);
    return Promise.reject(error);
  }
);
