"use client";

import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { notify } from "@/lib/notify";
import { initiatePayment } from "../payment.service";
import { PENDING_ORDER_NUMBER_KEY } from "../payment.constants";
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
    onSuccess: (payment, variables) => {
      // Redirect to Flutterwave payment link
      if (payment.payment_link) {
        // Stash the order number so we can recover it if Flutterwave's redirect
        // comes back without order_number (then still load the order + detect
        // success on return).
        try {
          sessionStorage.setItem(
            PENDING_ORDER_NUMBER_KEY,
            String(variables.orderNumber),
          );
        } catch {
          /* sessionStorage unavailable — non-fatal */
        }
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

