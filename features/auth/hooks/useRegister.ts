"use client";

import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { AxiosError } from "axios";
import { useAuthStore } from "../auth.store";
import { notify } from "@/lib/notify";
import { RegisterFormValues, RegisterResponse } from "../auth.type";
import { registerUser } from "../auth.service";

interface UseRegisterOptions {
  onSuccess?: (data: RegisterResponse) => void;
  onError?: (error: AxiosError<{ message: string }>) => void;
}

export const useRegister = ({
  onSuccess,
  onError,
}: UseRegisterOptions = {}) => {
  const setAuth = useAuthStore((state) => state.setAuth);
  const router = useRouter();

  return useMutation<
    RegisterResponse,
    AxiosError<{ message: string }>,
    RegisterFormValues
  >({
    mutationFn: async (data) => registerUser(data),
    onSuccess: (data) => {
      const { tokens, ...user } = data; // separate tokens
      setAuth({ user, tokens });
      notify.success("Registration successful!");
      
      // Preserve return_url if present
      const searchParams = new URLSearchParams(window.location.search);
      const returnUrl = searchParams.get("return_url");
      const verifyUrl = returnUrl
        ? `/auth/verify-otp?email=${user.email}&return_url=${encodeURIComponent(returnUrl)}`
        : `/auth/verify-otp?email=${user.email}`;
      
      router.push(verifyUrl);
      onSuccess?.(data);
    },
    onError: (error) => {
      notify.error(
        error.response?.data?.message || error.message || "Registration failed"
      );
      onError?.(error);
    },
  });
};
