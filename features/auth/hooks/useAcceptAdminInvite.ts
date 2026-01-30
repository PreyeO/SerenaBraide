"use client";

import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { AxiosError } from "axios";
import { useAuthStore } from "../auth.store";
import { notify } from "@/lib/notify";
import { acceptAdminInvite } from "@/features/auth/auth.service";
import { LoginResponse } from "../auth.type";

interface UseAcceptAdminInviteOptions {
  onSuccess?: (data: LoginResponse) => void;
  onError?: (error: AxiosError<{ message: string }>) => void;
}

export const useAcceptAdminInvite = ({
  onSuccess,
  onError,
}: UseAcceptAdminInviteOptions = {}) => {
  const setAuth = useAuthStore((state) => state.setAuth);
  const router = useRouter();

  return useMutation<LoginResponse, AxiosError<{ message: string }>, string>({
    mutationFn: async (token) => acceptAdminInvite(token),
    onSuccess: (data) => {
      const { tokens, ...user } = data;
      setAuth({ user, tokens });
      notify.success("Invitation accepted! You are now logged in.");

      // Redirect to admin dashboard
      router.push("/admin");

      onSuccess?.(data);
    },
    // onError: (error) => {
    //   notify.error(
    //     error.response?.data?.message ||
    //       error.response?.data?.detail ||
    //       "Failed to accept invitation"
    //   );
    //   onError?.(error);
    // },
  });
};
