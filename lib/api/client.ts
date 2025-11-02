import axios from "axios";
import { toast } from "sonner";

export const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});

// ✅ Global response interceptor
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const message =
      error?.response?.data?.message || error.message || "Something went wrong";

    toast.error(message); // auto-toast errors
    return Promise.reject(error);
  }
);
