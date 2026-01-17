import { LucideIcon } from "lucide-react";
import { Variant, VariantImage } from "@/features/products/product.type";
import { CreateRatingFormValues } from "../../schema/customer.schema";

export type FulfilmentType = "PROCESSING" | "IN_TRANSIT" | "DELIVERED";

export interface FulfilmentStatusProps {
  statusType: FulfilmentType;
  header: string;
  status: string;
  title: string;
  src: string;
  alt: string;
  color: string;
  icon: LucideIcon;
  iconBg: string;
  price: string;
  quantity: string;
  size: string;
}
export interface OrderInfo {
  id?: number; // Order item ID for API calls
  statusType: FulfilmentType; // ✅ ADD THIS
  title: string;
  color: string;
  orderNumber: string;
  productName: string;
  src: string;
  alt: string;
  price: string;
  size: string;
  quantity: string;
  date: string;
  total: string;
  extraInfo: string;
  icon: LucideIcon;
  iconBg: string;
  OrderAction1: string;
  orderAction2: string;
}

export interface Props {
  statusType: FulfilmentType;
}

export type CreateRatingPayload = CreateRatingFormValues;

export interface Rating {
  id: number;
  order_item: number;
  rating: number;
  review: string | null;
  created_at: string;
  updated_at: string;
}

export interface WishlistItem {
  id: number;
  customer_profile: number;
  product_variant: Variant;
  created_on: string;
}

export interface WishlistResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: WishlistItem[];
}

export interface CreateWishlistPayload {
  product_variant: number;
}
