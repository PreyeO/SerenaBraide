import { z } from "zod";
import { BalanceSchema, RecipientSchema } from "./giftcard.schema";

export type RecipientFormValues = z.infer<typeof RecipientSchema>;
export type BalanceFormValues = z.infer<typeof BalanceSchema>;

export interface GiftCardPurchasePayload {
  initial_amount: number;
  recipient_first_name: string;
  recipient_last_name: string;
  recipient_email: string;
  message?: string;
}

export interface GiftCardPurchaseResponse {
  gift_card_id: number;
  card_number: string;
  pin: string;
  order_number: number;
  payment_link: string;
  amount: string;
  currency: string;
  message: string;
}

export interface GiftCardBalancePayload {
  card_number: string;
  pin: string;
}

export interface GiftCardBalanceResponse {
  card_number: string;
  balance: number;
  currency: string;
  status: string;
}