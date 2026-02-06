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

    // Extract error message from various backend response formats
    const data = error?.response?.data;
    let errorMessage = "Something went wrong";

    if (data) {
      if (typeof data === "string") {
        // Backend returned a plain string
        errorMessage = data;
      } else if (data.detail) {
        // Django REST Framework format - can be string or array
        errorMessage = Array.isArray(data.detail) ? data.detail[0] : data.detail;
      } else if (data.message) {
        errorMessage = data.message;
      } else if (data.error) {
        // Common format: { error: "message" }
        errorMessage = typeof data.error === "string" ? data.error : data.error.message || errorMessage;
      } else if (data.errors) {
        // Format: { errors: ["message1", "message2"] } or { errors: { field: ["error"] } }
        if (Array.isArray(data.errors)) {
          errorMessage = data.errors[0];
        } else if (typeof data.errors === "object") {
          // Field-specific errors: { errors: { email: ["Invalid email"] } }
          const firstField = Object.keys(data.errors)[0];
          const fieldErrors = data.errors[firstField];
          errorMessage = Array.isArray(fieldErrors) ? fieldErrors[0] : fieldErrors;
        }
      } else if (data.non_field_errors) {
        // Django REST Framework non-field errors
        errorMessage = Array.isArray(data.non_field_errors)
          ? data.non_field_errors[0]
          : data.non_field_errors;
      }
    }

    toast.error(errorMessage);
    return Promise.reject(error);
  }
);
