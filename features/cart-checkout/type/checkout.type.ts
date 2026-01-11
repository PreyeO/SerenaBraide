import z from "zod";
import { AddressSchema } from "../schema/checkout.schema";

export type AddressFormValues = z.infer<typeof AddressSchema>;

export interface PaymentItemProps {
  width: number;
  height: number;
  src: string;
  alt: string;
  className: string;
  detail: string;
  optionID: string;
}

// Order Types
export interface OrderVariantImage {
  id: number;
  image_url: string;
  is_primary: boolean;
  alt_text: string;
  order: number;
  variant: number;
  created_at: string;
}

export interface OrderVariant {
  id: number;
  product: number;
  product_name: string;
  sku: string;
  size: string;
  color: string | null;
  price: string;
  effective_price: number;
  stock_quantity: number;
  is_in_stock: boolean;
  is_active: boolean;
  images: OrderVariantImage[];
  created_at: string;
  updated_at: string;
}

export interface OrderItem {
  id: number;
  variant: OrderVariant;
  variant_id: number;
  quantity: number;
  price: string;
  subtotal: string;
  created_at: string;
  updated_at: string;
}

export interface Order {
  order_number: number;
  customer_profile: number;
  status: string;
  subtotal: string;
  shipping_cost: string;
  tax: string;
  total_amount: string;
  items: OrderItem[];
  items_count: number;
  created_at: string;
  updated_at: string;
}

export interface CreateOrderPayload {
  // The order is created from the current cart, so no payload needed
  // But keeping this for potential future use
}
