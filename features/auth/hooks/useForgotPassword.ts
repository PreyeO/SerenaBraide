"use client";

import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { AxiosError } from "axios";
import { notify } from "@/lib/notify";
import { requestPasswordReset } from "@/features/auth/auth.service";
import { ForgotPasswordFormValues } from "@/features/auth/auth.type";

export const useForgotPassword = () => {
  const router = useRouter();

  return useMutation<
    { detail: string },
    AxiosError<{ message: string }>,
    ForgotPasswordFormValues
  >({
    mutationFn: (values: ForgotPasswordFormValues) =>
      requestPasswordReset(values.email),

    onSuccess: (_, values) => {
      notify.success("If this email exists, an OTP has been sent.");
      router.push(`/auth/reset-password?email=${values.email}`);
    },

    onError: (error) => {
      notify.error(
        error.response?.data?.message || error.message || "Failed to resend OTP"
      );
    },
  });
};
