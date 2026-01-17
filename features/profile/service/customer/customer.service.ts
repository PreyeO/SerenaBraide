import { api } from "@/lib/axios";
import { AxiosResponse } from "axios";
import { CreateRatingPayload, Rating } from "../../type/customer/rating.type";

export async function createRating(
  payload: CreateRatingPayload
): Promise<Rating> {
  const response: AxiosResponse<Rating> = await api.post(
    "/api/ratings/",
    payload
  );
  return response.data;
}

