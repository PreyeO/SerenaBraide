"use client";

import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { AxiosError } from "axios";
import { useAuthStore } from "../auth.store";
import { notify } from "@/lib/notify";
import { loginUser } from "@/features/auth/auth.service";
import { LoginFormValues, LoginResponse } from "@/features/auth/auth.type";

interface UseLoginOptions {
  onSuccess?: (data: LoginResponse) => void;
  onError?: (error: AxiosError<{ message: string }>) => void;
}

export const useLogin = ({ onSuccess, onError }: UseLoginOptions = {}) => {
  const setAuth = useAuthStore((state) => state.setAuth);
  const router = useRouter();

  return useMutation<
    LoginResponse,
    AxiosError<{ message: string }>,
    LoginFormValues
  >({
    mutationFn: async (data) => await loginUser(data),
    onSuccess: (data) => {
      setAuth({ user: data.user, tokens: data.tokens });
      notify.success("Registration successful!");
      router.push("/cart");
      onSuccess?.(data);
    },
    onError: (error) => {
      notify.error(
        error.response?.data?.message || error.message || "Login failed"
      );
      onError?.(error);
    },
  });
};
