import { api } from "@/lib/axios";
import { AxiosResponse } from "axios";
import {
  CreateRatingPayload,
  CreateWishlistPayload,
  OrdersResponse,
  Rating,
  WishlistItem,
  WishlistResponse,
} from "../../type/customers/profile.type";

export async function createRating(
  payload: CreateRatingPayload,
): Promise<Rating> {
  const response: AxiosResponse<Rating> = await api.post(
    "/api/ratings/",
    payload,
  );
  return response.data;
}

export async function getWishlist(): Promise<WishlistResponse> {
  const response: AxiosResponse<WishlistResponse> =
    await api.get("/api/favourites/");
  return response.data;
}

export async function addToWishlist(
  payload: CreateWishlistPayload,
): Promise<WishlistItem> {
  const response: AxiosResponse<WishlistItem> = await api.post(
    "/api/favourites/",
    payload,
  );
  return response.data;
}

export async function removeFromWishlist(
  wishlistItemId: number,
): Promise<void> {
  await api.delete(`/api/favourites/${wishlistItemId}/`);
}

export async function getOrders(): Promise<OrdersResponse> {
  const response: AxiosResponse<OrdersResponse> = await api.get(
    "/api/orders/",
  );
  return response.data;
}

