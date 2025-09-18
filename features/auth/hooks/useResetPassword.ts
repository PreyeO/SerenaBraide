import { notify } from "@/lib/notify";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { ResetPasswordFormValues } from "../types";
import { resetPassword } from "../api";

export const useResetPassword = () => {
  const router = useRouter();
  return useMutation({
    mutationFn: (data: ResetPasswordFormValues) => resetPassword(data),
    onSuccess: (data: any) => {
      notify.success(data.message || "Password reset successfully");
      router.push("/auth/signin");
    },
    onError: (error: any) => {
      notify.error(
        error?.response?.data?.message || "Failed to reset password"
      );
    },
  });
};
