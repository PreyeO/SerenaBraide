import { CreateRatingFormValues } from "../../schema/customer.schema";

export type CreateRatingPayload = CreateRatingFormValues;

export interface Rating {
  id: number;
  order_item: number;
  rating: number;
  review: string | null;
  created_at: string;
  updated_at: string;
}

