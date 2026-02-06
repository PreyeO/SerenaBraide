"use client";

import { useMutation } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
import { AxiosError } from "axios";
import { notify } from "@/lib/notify";
import { requestPasswordReset } from "@/features/auth/auth.service";
import { ForgotPasswordFormValues } from "@/features/auth/auth.type";

export const useForgotPassword = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  return useMutation<
    { detail: string },
    AxiosError<{ message: string }>,
    ForgotPasswordFormValues
  >({
    mutationFn: (values: ForgotPasswordFormValues) =>
      requestPasswordReset(values.email),

    onSuccess: (_, values) => {
      notify.success("If this email exists, an OTP has been sent.");

      // Preserve return_url if it exists
      const returnUrl = searchParams.get("return_url");
      const resetPasswordUrl = returnUrl
        ? `/auth/reset-password?email=${values.email}&return_url=${encodeURIComponent(returnUrl)}`
        : `/auth/reset-password?email=${values.email}`;

      router.push(resetPasswordUrl);
    },

    onError: () => {
      // Axios interceptor handles error toast
    },
  });
};
