"use client";

import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { notify } from "@/lib/notify";
import { purchaseGiftCard } from "../giftcard.service";
import {
  GiftCardPurchasePayload,
  GiftCardPurchaseResponse,
} from "../giftcard.type";

interface UsePurchaseGiftCardOptions {
  onSuccess?: (giftCard: GiftCardPurchaseResponse) => void;
  onError?: (error: AxiosError<{ message?: string }>) => void;
}

export const usePurchaseGiftCard = ({
  onSuccess,
  onError,
}: UsePurchaseGiftCardOptions = {}) => {
  return useMutation<
    GiftCardPurchaseResponse,
    AxiosError<{ message?: string }>,
    GiftCardPurchasePayload
  >({
    mutationFn: purchaseGiftCard,
    onSuccess: (giftCard) => {
      notify.success("Gift card created successfully!");
      onSuccess?.(giftCard);
    },
    onError: (error) => {
      // Axios interceptor handles error toast
      onError?.(error);
    },
  });
};
