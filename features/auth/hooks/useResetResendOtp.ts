import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { notify } from "@/lib/notify";
import { resetResendOtp } from "@/features/auth/auth.service";
import { OtpResponse } from "@/features/auth/auth.type";

export const useResetResendOtp = () => {
  return useMutation<OtpResponse, AxiosError<{ message: string }>, string>({
    mutationFn: resetResendOtp,
    onSuccess: (data) => {
      notify.success(data.detail || "OTP resent successfully!");
    },
    onError: () => {
      // Axios interceptor handles error toast
    },
  });
};
