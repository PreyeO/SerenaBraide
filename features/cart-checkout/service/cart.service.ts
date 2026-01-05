import { api } from "@/lib/axios";
import { AxiosResponse } from "axios";
import { AddToCartPayload, CartItem, CartResponse } from "../type/cart.type";

export async function addToCart(payload: AddToCartPayload): Promise<CartItem> {
  const response: AxiosResponse<CartItem> = await api.post(
    "/api/cart/add_item/",
    payload
  );

  return response.data;
}

export async function getCurrentCart(): Promise<CartResponse> {
  const response: AxiosResponse<CartResponse> = await api.get(
    "/api/cart/current/"
  );
  return response.data;
}

export async function updateCartItem(
  itemId: number,
  quantity: number
): Promise<CartItem> {
  const response = await api.patch<CartItem>(
    `/api/cart/update-item/${itemId}/`,
    { quantity } // ✅ only send quantity
  );
  return response.data;
}

export async function removeCartItem(itemId: number): Promise<void> {
  await api.delete(`/api/cart/remove-item/${itemId}/`);
}
