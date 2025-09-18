import { notify } from "@/lib/notify";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { ForgotPasswordFormValues } from "../types";
import { forgotPassword } from "../api";

export const useForgotPassword = () => {
  const router = useRouter();
  return useMutation({
    mutationFn: (data: ForgotPasswordFormValues) => forgotPassword(data),
    onSuccess: (data: any) => {
      notify.success(data.message || "OTP sent to your email");
      router.push("/auth/reset-password");
    },
    onError: (error: any) => {
      notify.error(error?.response?.data?.message || "Failed to send OTP");
    },
  });
};
