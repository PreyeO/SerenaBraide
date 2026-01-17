export interface VariantImage {
  id: number;
  image_url: string;
  is_primary: boolean;
  alt_text: string;
  order: number;
  variant: number;
  created_at: string;
}

export interface Variant {
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
  images: VariantImage[];
  created_at: string;
  updated_at: string;
}

export interface OrderItem {
  id: number;
  variant: Variant;
  variant_id: number;
  quantity: number;
  price: string;
  subtotal: string;
  created_at: string;
  updated_at: string;
}

export interface ProductReview {
  id: number;
  customer_profile: number;
  order_item: OrderItem;
  rating: number;
  review: string | null;
  created_at: string;
  updated_at: string;
}

export interface ReviewsResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: ProductReview[];
}
