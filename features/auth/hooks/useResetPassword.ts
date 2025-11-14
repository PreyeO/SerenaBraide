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
  const email = searchParams.get("email"); // we passed this in URL from step1

  return useMutation<
    { detail: string },
    AxiosError<{ message: string }>,
    ResetPasswordFormValues
  >({
    mutationFn: (values) =>
      completePasswordReset({
        email: email ?? "", // must send email back to API
        otp: values.otp,
        new_password: values.new_password,
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
