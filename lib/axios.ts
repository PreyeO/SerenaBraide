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

// A bare client (no interceptors) used only to refresh tokens, so a refresh
// call never recurses back through the request interceptor below.
const refreshClient = axios.create({
  baseURL: getBaseURL(),
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});

// Dedupe concurrent refreshes: when the access token has expired, many requests
// can fire at once — they all await the same in-flight refresh instead of each
// hitting the endpoint.
let refreshPromise: Promise<string | null> | null = null;

const refreshAccessToken = (): Promise<string | null> => {
  const { tokens, clearAuth } = useAuthStore.getState();
  const refresh = tokens?.refresh;

  if (!refresh) {
    clearAuth();
    return Promise.resolve(null);
  }

  if (!refreshPromise) {
    refreshPromise = refreshClient
      .post<{
        access?: string;
        refresh?: string;
        tokens?: { access?: string; refresh?: string };
      }>("/api/users/refresh-token/", { refresh })
      .then((res) => {
        // Handle both a flat { access, refresh } and a nested
        // { tokens: { access, refresh } } response shape.
        const data = res.data;
        const newAccess = data?.access ?? data?.tokens?.access;
        if (!newAccess) {
          clearAuth();
          return null;
        }
        // Keep the rotated refresh token if the backend returns one.
        const newRefresh = data?.refresh ?? data?.tokens?.refresh ?? refresh;
        // Update only the tokens; the persisted user stays as-is.
        useAuthStore.setState({
          tokens: { access: newAccess, refresh: newRefresh },
        });
        return newAccess;
      })
      .catch(() => {
        // The refresh token itself is invalid/expired — end the session
        // silently (no toast); the app's guards handle any redirect to login.
        clearAuth();
        return null;
      })
      .finally(() => {
        refreshPromise = null;
      });
  }

  return refreshPromise;
};

// Request interceptor
api.interceptors.request.use(async (config) => {
  const { tokens, isTokenExpired } = useAuthStore.getState();

  let accessToken: string | null | undefined = tokens?.access;

  // If the access token has expired, transparently refresh it in the background
  // so the customer's session renews instead of silently dropping.
  if (accessToken && isTokenExpired()) {
    accessToken = await refreshAccessToken();
    if (!accessToken) {
      return Promise.reject("Token expired");
    }
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
