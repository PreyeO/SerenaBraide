import { api } from "@/lib/axios";
import { AxiosResponse } from "axios";
import { Order, OrdersResponse } from "../../type/customers/profile.type";

export interface GetOrdersParams {
  status?: "paid" | "shipped" | "delivered" | "pending";
  search?: string;
}

export async function getOrders(
  params?: GetOrdersParams,
): Promise<OrdersResponse> {
  const response: AxiosResponse<OrdersResponse> = await api.get("/api/orders/", {
    params,
  });
  return response.data;
}

export async function getOrderDetails(
  orderNumber: number,
): Promise<Order> {
  const response: AxiosResponse<Order> = await api.get(
    `/api/orders/${orderNumber}/`,
  );
  return response.data;
}

export interface UpdateOrderStatusPayload {
  status: "pending" | "paid" | "shipped" | "delivered";
}

export async function updateOrderStatus(
  orderNumber: number,
  payload: UpdateOrderStatusPayload,
): Promise<Order> {
  const response: AxiosResponse<Order> = await api.patch(
    `/api/orders/${orderNumber}/update-status/`,
    payload,
  );
  return response.data;
}

