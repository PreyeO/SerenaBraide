import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import { notify } from "@/lib/notify";
import { verifyOtp } from "@/features/auth/auth.service";
import { OtpResponse, OtpPayload } from "@/features/auth/auth.type";
import { useAuthStore } from "../auth.store";

export const useVerifyOtp = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user, setAuth } = useAuthStore();

  return useMutation<OtpResponse, AxiosError<{ message: string }>, OtpPayload>({
    mutationFn: async (payload) => {
      const response = await verifyOtp(payload);
      // Update user in store after successful verification
      const currentUser = useAuthStore.getState().user;
      const currentTokens = useAuthStore.getState().tokens;
      
      if (currentUser && currentTokens) {
        setAuth({
          user: { ...currentUser, email_validated: true },
          tokens: currentTokens,
        });
      }
      return response;
    },
    onSuccess: (data) => {
      notify.success(data.detail || "OTP verified successfully!");
      
      // Check for return URL
      const returnUrl = searchParams.get("return_url");
      
      // After OTP verification, user needs to log in
      const loginUrl = returnUrl
        ? `/auth/login?return_url=${encodeURIComponent(returnUrl)}`
        : "/auth/login";
      
      router.push(loginUrl);
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
