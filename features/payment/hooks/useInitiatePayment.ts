"use client";

import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { notify } from "@/lib/notify";
import { initiatePayment } from "../payment.service";
import { PaymentResponse, InitiatePaymentPayload } from "../payment.type";

interface UseInitiatePaymentOptions {
  onSuccess?: (payment: PaymentResponse) => void;
  onError?: (error: AxiosError<{ message?: string }>) => void;
}

export const useInitiatePayment = ({
  onSuccess,
  onError,
}: UseInitiatePaymentOptions = {}) => {
  return useMutation<
    PaymentResponse,
    AxiosError<{ message?: string }>,
    { orderNumber: number; payload?: InitiatePaymentPayload }
  >({
    mutationFn: ({ orderNumber, payload }) =>
      initiatePayment(orderNumber, payload),
    onSuccess: (payment) => {
      // Redirect to Flutterwave payment link
      if (payment.payment_link) {
        window.location.href = payment.payment_link;
      } else {
        notify.error("Payment link not received");
      }
      onSuccess?.(payment);
    },
    onError: (error) => {
      // Axios interceptor handles error toast
      onError?.(error);
    },
  });
};

