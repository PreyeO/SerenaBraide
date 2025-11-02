import { resetPassword } from "@/lib/api/auth";
import { notify } from "@/lib/notify";
import { ResetPasswordFormValues } from "@/types/auth";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

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
