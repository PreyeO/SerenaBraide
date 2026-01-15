import { api } from "@/lib/axios";
import { AxiosResponse } from "axios";
import { Order, Address, CreateAddressPayload, UpdateAddressPayload } from "../type/checkout.type";

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

// Address Service Functions
export async function createAddress(payload: CreateAddressPayload): Promise<Address> {
  const response: AxiosResponse<Address> = await api.post("/api/addresses/", payload);
  return response.data;
}

export async function updateAddress(id: number, payload: UpdateAddressPayload): Promise<Address> {
  const response: AxiosResponse<Address> = await api.patch(`/api/addresses/${id}/`, payload);
  return response.data;
}

export async function getAddresses(): Promise<Address[]> {
  const response: AxiosResponse<Address[]> = await api.get("/api/addresses/");
  return response.data;
}

export async function deleteAddress(id: number): Promise<void> {
  await api.delete(`/api/addresses/${id}/`);
}

