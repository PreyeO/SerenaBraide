import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { notify } from "@/lib/notify";
import { verifyOtp } from "@/features/auth/auth.service";
import { OtpResponse, OtpPayload } from "@/features/auth/auth.type";

export const useVerifyOtp = () => {
  const router = useRouter();

  return useMutation<OtpResponse, AxiosError<{ message: string }>, OtpPayload>({
    mutationFn: (payload) => verifyOtp(payload),
    onSuccess: (data) => {
      notify.success(data.detail || "OTP verified successfully!");
      router.push("/auth/login");
    },
    onError: (error) => {
      notify.error(
        error.response?.data?.message ||
          error.message ||
          "OTP verification failed"
      );
    },
  });
};
