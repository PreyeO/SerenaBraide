"use client";

import { useMutation } from "@tanstack/react-query";
import { notify } from "@/lib/notify";
import { useRouter } from "next/navigation";
import { VerifyOtpFormValues } from "@/types/auth";
import { verifyOtp } from "@/lib/api/auth";

export function useVerifyOtp() {
  const router = useRouter();

  return useMutation({
    mutationFn: (data: VerifyOtpFormValues) => verifyOtp(data),
    onSuccess: (data) => {
      notify.success(data.message || "OTP verified successfully!");
      router.push("/auth/signin");
    },
    onError: (error: any) => {
      notify.error(
        error?.response?.data?.message || "OTP verification failed."
      );
    },
  });
}
