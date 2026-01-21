import { api } from "@/lib/axios";
import { AxiosResponse } from "axios";
import {
  GiftCardPurchasePayload,
  GiftCardPurchaseResponse,
  GiftCardBalancePayload,
  GiftCardBalanceResponse,
} from "./giftcard.type";

export async function purchaseGiftCard(
  payload: GiftCardPurchasePayload,
): Promise<GiftCardPurchaseResponse> {
  const response: AxiosResponse<GiftCardPurchaseResponse> = await api.post(
    "/api/gift-cards/",
    payload,
  );
  return response.data;
}

export async function checkGiftCardBalance(
  payload: GiftCardBalancePayload,
): Promise<GiftCardBalanceResponse> {
  const response: AxiosResponse<GiftCardBalanceResponse> = await api.post(
    "/api/gift-cards/check-balance/",
    payload,
  );
  return response.data;
}
