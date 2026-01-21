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

export async function getPaymentDetails(
  orderNumber: number,
  paymentId: number
): Promise<PaymentResponse> {
  const response: AxiosResponse<PaymentResponse> = await api.get(
    `/api/orders/${orderNumber}/payments/${paymentId}/`
  );
  return response.data;
}

export async function getOrderPayments(
  orderNumber: number
): Promise<PaymentResponse[]> {
  const response: AxiosResponse<PaymentResponse[]> = await api.get(
    `/api/orders/${orderNumber}/payments/`
  );
  return response.data;
}

