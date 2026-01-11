"use client";

import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { verifyPaymentRedirect } from "../payment.service";
import { PaymentResponse } from "../payment.type";
import { notify } from "@/lib/notify";

interface UsePaymentRedirectOptions {
  onSuccess?: (data: PaymentResponse) => void;
  onError?: (error: AxiosError<{ message?: string }>) => void;
}

export const usePaymentRedirect = ({
  onSuccess,
  onError,
}: UsePaymentRedirectOptions = {}) => {
  return useMutation<
    PaymentResponse,
    AxiosError<{ message?: string }>,
    { status: string; tx_ref: string; transaction_id: string }
  >({
    mutationFn: (params) => verifyPaymentRedirect(params),
    onSuccess: (data) => {
      onSuccess?.(data);
    },
    onError: (error) => {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Failed to verify payment";
      notify.error(errorMessage);
      onError?.(error);
    },
  });
};

