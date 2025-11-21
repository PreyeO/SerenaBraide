"use client";

import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import { notify } from "@/lib/notify";
import { completePasswordReset } from "@/features/auth/auth.service";
import { ResetPasswordFormValues } from "@/features/auth/auth.type";

export const useResetPassword = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email");

  return useMutation<
    { detail: string },
    AxiosError<{ message: string }>,
    ResetPasswordFormValues
  >({
    mutationFn: (values) =>
      completePasswordReset({
        email: email ?? "",
        otp: values.otp,
        new_password: values.new_password,
        new_password_repeated: values.new_password_repeated, // ✅ include this
      }),

    onSuccess: () => {
      notify.success("Password reset successful!");
      router.push("/auth/login");
    },

    onError: (error) => {
      notify.error(
        error.response?.data?.message || "Reset failed. Please try again."
      );
    },
  });
};
