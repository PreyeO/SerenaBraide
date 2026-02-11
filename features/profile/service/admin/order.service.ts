import { api } from "@/lib/axios";
import { AxiosResponse } from "axios";
import { Order, OrdersResponse } from "../../type/customers/profile.type";

export interface GetOrdersParams {
  status?: "paid" | "shipped" | "delivered";
  search?: string;
}

export async function getOrders(
  params?: GetOrdersParams,
): Promise<OrdersResponse> {
  const response: AxiosResponse<OrdersResponse> = await api.get(
    "/api/orders/",
    {
      params,
    },
  );
  return response.data;
}

export async function getOrderDetails(orderNumber: number): Promise<Order> {
  const response: AxiosResponse<Order> = await api.get(
    `/api/orders/${orderNumber}/`,
  );
  return response.data;
}

export interface UpdateOrderStatusPayload {
  status: "paid" | "shipped" | "delivered";
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

// --- Shipping Areas ---

import {
  ShippingArea,
  ShippingAreasResponse,
} from "../../type/admin/general.type";

export interface CreateShippingAreaPayload {
  name: string;
  fee: string;
}

export async function getShippingAreas(): Promise<ShippingAreasResponse> {
  const response: AxiosResponse<ShippingAreasResponse> = await api.get(
    "/api/shipping-areas/",
  );
  return response.data;
}

export async function createShippingArea(
  payload: CreateShippingAreaPayload,
): Promise<ShippingArea> {
  const response: AxiosResponse<ShippingArea> = await api.post(
    "/api/shipping-areas/",
    payload,
  );
  return response.data;
}

export async function updateShippingArea(
  id: number,
  payload: Partial<CreateShippingAreaPayload>,
): Promise<ShippingArea> {
  const response: AxiosResponse<ShippingArea> = await api.patch(
    `/api/shipping-areas/${id}/`,
    payload,
  );
  return response.data;
}

export async function deleteShippingArea(id: number): Promise<void> {
  await api.delete(`/api/shipping-areas/${id}/`);
}
