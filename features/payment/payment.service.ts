import { api } from "@/lib/axios";
import { AxiosResponse } from "axios";
import { PaymentResponse, InitiatePaymentPayload } from "./payment.type";

export async function initiatePayment(
  orderNumber: number,
  payload?: InitiatePaymentPayload
): Promise<PaymentResponse> {
  const response: AxiosResponse<PaymentResponse> = await api.post(
    `/api/orders/${orderNumber}/payments/`,
    payload
  );
  return response.data;
}

export async function verifyPaymentRedirect(params: {
  status: string;
  tx_ref: string;
  transaction_id: string;
}): Promise<PaymentResponse> {
  const response: AxiosResponse<PaymentResponse> = await api.get(
    `/api/orders/payments/payment-redirect/`,
    {
      params,
    }
  );
  return response.data;
}

