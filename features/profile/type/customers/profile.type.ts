import { LucideIcon } from "lucide-react";
import { Variant } from "@/features/products/product.type";
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
  orderDetail?: any; // Using Order from cart-checkout type
  shippingAddress?: {
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
  };
  isGiftCard?: boolean;
  giftCardNumber?: string;
  giftCardStatus?: string;
}
export interface OrderInfo {
  id?: number; // Order item ID for API calls
  orderNumberId?: number; // Order number (numeric) for API calls
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
  productId?: number; // Product ID for navigation
  isGiftCard?: boolean; // Flag to identify gift card orders
  giftCardNumber?: string; // Gift card number for display
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

// API Response Types for Orders
export interface OrderItemImage {
  id: number;
  image_url: string;
  is_primary: boolean;
  alt_text: string;
  order: number;
  variant: number;
  created_at: string;
}

export interface OrderItemVariant {
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
  images: OrderItemImage[];
  created_at: string;
  updated_at: string;
}

export interface OrderItem {
  id: number;
  variant: OrderItemVariant;
  variant_id: number;
  quantity: number;
  price: string;
  subtotal: string;
  created_at: string;
  updated_at: string;
}

export interface CustomerAddress {
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

export interface CustomerProfile {
  user: number;
  addresses: CustomerAddress[];
}

export interface GiftCard {
  card_number: string;
  initial_amount: string;
  current_balance: string;
  currency: string;
  status: string;
  created_at: string;
}

export interface Order {
  order_number: number;
  customer_profile: CustomerProfile | number;
  status:
  | "delivered"
  | "pending"
  | "paid"
  | "processing"
  | "in_transit"
  | "shipped";
  subtotal: string;
  shipping_cost: string;
  tax: string;
  total_amount: string;
  items: OrderItem[];
  items_count: number;
  gift_card_amount: string;
  remaining_amount: string;
  purchased_gift_card: GiftCard | null;
  address: string | null;
  created_at: string;
  updated_at: string;
}

export interface OrdersResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Order[];
}
