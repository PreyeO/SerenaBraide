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
    // Explicitly type the mutationFn
    mutationFn: async (data: RegisterFormValues): Promise<RegisterResponse> => {
      return await registerUser(data);
    },
    onSuccess: (data) => {
      setAuth({ user: data.user, tokens: data.tokens });
      notify.success("Registration successful!");
      router.push("/auth/verify-otp");
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
