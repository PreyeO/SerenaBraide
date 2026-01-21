"use client";

import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { notify } from "@/lib/notify";
import { checkGiftCardBalance } from "../giftcard.service";
import {
  GiftCardBalancePayload,
  GiftCardBalanceResponse,
} from "../giftcard.type";

interface UseCheckBalanceOptions {
  onSuccess?: (balance: GiftCardBalanceResponse) => void;
  onError?: (error: AxiosError<{ message?: string }>) => void;
}

export const useCheckBalance = ({
  onSuccess,
  onError,
}: UseCheckBalanceOptions = {}) => {
  return useMutation<
    GiftCardBalanceResponse,
    AxiosError<{ message?: string }>,
    GiftCardBalancePayload
  >({
    mutationFn: (payload) => checkGiftCardBalance(payload),
    onSuccess: (balance) => {
      notify.success("Balance retrieved successfully!");
      onSuccess?.(balance);
    },
    onError: (error) => {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Failed to check balance. Please verify your card number and PIN.";
      notify.error(errorMessage);
      onError?.(error);
    },
  });
};

