import z from "zod";
import {
  AddressSchema,
  CreateAddressSchema,
  UpdateAddressSchema,
} from "../schema/checkout.schema";

// Form values (what the form uses - all strings)
export type AddressFormValues = z.infer<typeof AddressSchema>;
export type CreateAddressFormValues = z.infer<typeof CreateAddressSchema>;
export type UpdateAddressFormValues = z.infer<typeof UpdateAddressSchema>;

// Address Types
export interface Address {
  id: number;
  customer_profile: number;
  phone_number: string | null;
  address: string;
  city: string;
  state: string;
  zip_code: string;
  country: string;
  is_default: boolean;
  created_on: string;
  updated_on: string;
}

export interface CreateAddressPayload {
  address: string;
  city: string;
  state: string;
  zip_code: string | number;
  country: string;
  phone_number?: string | null;
}

export interface UpdateAddressPayload {
  address?: string;
  city?: string;
  state?: string;
  zip_code?: string | number;
  country?: string;
  phone_number?: string | null;
}

export interface PaymentItemProps {
  width: number;
  height: number;
  src: string;
  alt: string;
  className?: string;
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

export interface PurchasedGiftCard {
  card_number: string;
  initial_amount: string;
  current_balance: string;
  currency: string;
  status: string;
  created_at: string;
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
  gift_card_amount: string;
  remaining_amount: string;
  purchased_gift_card: PurchasedGiftCard | null;
  address: string | null;
  created_at: string;
  updated_at: string;
}

// export interface CreateOrderPayload {

// }

// Gift Card Response Types
export interface GiftCardResponse {
  remaining_amount: string;
  gift_card_amount: string;
  gift_card_balance: string;
}

// Gift Card Response Types
export interface GiftCardResponse {
  remaining_amount: string;
  gift_card_amount: string;
  gift_card_balance: string;
}
