"use client";

import { useMutation } from "@tanstack/react-query";
import { notify } from "@/lib/notify";
import { useRouter } from "next/navigation";
import { SigninFormValues } from "../types";
import { signinUser } from "../api";

export function useSignin() {
  const router = useRouter();

  return useMutation({
    mutationFn: (data: SigninFormValues) => signinUser(data),
    onSuccess: (data) => {
      notify.success(data.message || "Signin successful");
      router.push("/dashboard");
    },
    onError: (error: any) => {
      notify.error(
        error?.response?.data?.message || "Signin failed, please try again."
      );
    },
  });
}
