// features/auth/hooks/useResendOtp.ts
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { notify } from "@/lib/notify";
import { requestPasswordReset } from "@/features/auth/auth.service";
import { OtpResponse } from "@/features/auth/auth.type";

export const useResendOtp = () => {
  return useMutation<OtpResponse, AxiosError<{ message: string }>, string>({
    mutationFn: requestPasswordReset,
    onSuccess: (data) => {
      notify.success(data.detail || "OTP resent successfully!");
    },
    onError: () => {
      // Axios interceptor handles error toast
    },
  });
};
