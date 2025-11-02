import { forgotPassword } from "@/lib/api/auth";
import { notify } from "@/lib/notify";
import { ForgotPasswordFormValues } from "@/types/auth";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

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
