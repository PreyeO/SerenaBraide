import { api } from "@/lib/axios";
import { AxiosResponse } from "axios";
import { ReviewsResponse } from "./product.type";

export async function getReviews(productId: number): Promise<ReviewsResponse> {
  const response: AxiosResponse<ReviewsResponse> = await api.get(
    `/api/ratings/?order_item__variant__product=${productId}`,
  );
  return response.data;
}
