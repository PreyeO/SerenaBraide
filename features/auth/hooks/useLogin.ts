"use client";

import { useMutation } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
import { AxiosError } from "axios";
import { useAuthStore } from "../auth.store";
import { notify } from "@/lib/notify";
import { loginUser } from "@/features/auth/auth.service";
import { LoginFormValues, LoginResponse } from "../auth.type";

interface UseLoginOptions {
  onSuccess?: (data: LoginResponse) => void;
  onError?: (error: AxiosError<{ message: string }>) => void;
}

export const useLogin = ({ onSuccess, onError }: UseLoginOptions = {}) => {
  const setAuth = useAuthStore((state) => state.setAuth);
  const router = useRouter();
  const searchParams = useSearchParams();

  return useMutation<
    LoginResponse,
    AxiosError<{ message: string }>,
    LoginFormValues
  >({
    mutationFn: async (data) => loginUser(data),
    onSuccess: (data) => {
      const { tokens, ...user } = data;
      setAuth({ user, tokens });
      notify.success("Login successful!");

      // Check for return URL
      const returnUrl = searchParams.get("return_url");

      // Determine if user is admin
      const isAdmin = user.is_superuser || user.is_admin;

      if (returnUrl) {
        // If there's a return URL, redirect to it
        router.push(returnUrl);
      } else {
        // Default redirect based on user role
        if (isAdmin) {
          router.push("/admin");
        } else {
          router.push("/profile");
        }
      }

      onSuccess?.(data);
    },
    onError: (error) => {
      // Axios interceptor handles error toast
      onError?.(error);
    },
  });
};
