// Payment Types
export interface PaymentResponse {
  id: number;
  order: number;
  transaction_reference: string;
  amount: string;
  amount_paid: string | null;
  currency: string;
  status: "pending" | "completed" | "failed" | "cancelled" | "successful";
  transaction_id: string | null;
  payment_link: string;
  redirect_verified: boolean | null;
  webhook_verified: boolean | null;
  verification_api_verified: boolean | null;
  updated_at: string;
  created_at: string;
}

// The API likely uses the order_number from the URL, but keeping this for potential payload
export interface InitiatePaymentPayload {
  [key: string]: unknown;
}
