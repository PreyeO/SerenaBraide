"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { notify } from "@/lib/notify";
import { applyGiftCard } from "@/features/payment/payment.service";
import { ApplyGiftCardPayload, ApplyGiftCardResponse } from "../giftcard.type";

interface UseApplyGiftCardOptions {
  onSuccess?: (response: ApplyGiftCardResponse) => void;
  onError?: (error: AxiosError<{ message?: string }>) => void;
}

export const useApplyGiftCard = ({
  onSuccess,
  onError,
}: UseApplyGiftCardOptions = {}) => {
  const queryClient = useQueryClient();

  return useMutation<
    ApplyGiftCardResponse,
    AxiosError<{ message?: string }>,
    { orderNumber: number; payload: ApplyGiftCardPayload }
  >({
    mutationFn: ({ orderNumber, payload }) =>
      applyGiftCard(orderNumber, payload),
    onSuccess: (response, variables) => {
      notify.success(response.message || "Gift card applied successfully!");
      
      // Invalidate order query to refetch updated order data
      queryClient.invalidateQueries({ queryKey: ["order", variables.orderNumber] });
      
      onSuccess?.(response);
    },
    onError: (error) => {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Failed to apply gift card. Please verify your card number and PIN.";
      notify.error(errorMessage);
      onError?.(error);
    },
  });
};

