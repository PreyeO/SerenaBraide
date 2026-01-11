import { api } from "@/lib/axios";
import { AxiosResponse } from "axios";
import { Order } from "../type/checkout.type";

export async function createOrder(): Promise<Order> {
  const response: AxiosResponse<Order> = await api.post("/api/orders/");
  return response.data;
}

export async function getOrderDetail(orderNumber: number): Promise<Order> {
  const response: AxiosResponse<Order> = await api.get(
    `/api/orders/${orderNumber}/`
  );
  return response.data;
}

