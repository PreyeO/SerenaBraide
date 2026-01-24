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

// Category Tree Types
export interface CategoryTree {
  id: number;
  name: string;
  slug: string;
  description: string;
  parent: number | null;
  is_active: boolean;
  children_count: number;
  children?: CategoryTree[];
  created_at: string;
  updated_at: string;
}

// Product List Types
export interface ProductListItem {
  id: number;
  name: string;
  slug: string;
  description: string;
  category: number;
  in_stock: boolean;
  category_name: string;
  category_slug: string;
  base_price: string;
  price_range: string;
  is_active: boolean;
  is_featured: boolean;
  primary_image: string | null;
  created_at: string;
  updated_at: string;
}

export interface ProductListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: ProductListItem[];
}

export interface ProductListParams {
  category?: string;
  search?: string;
  is_featured?: boolean;
}

// Product Detail Types
export interface ProductImage {
  id: number;
  image_url: string;
  is_primary: boolean;
  alt_text: string;
  order: number;
  variant: number | null;
  created_at: string;
}

export interface ProductDetail {
  id: number;
  name: string;
  slug: string;
  description: string;
  category: number;
  category_name: string;
  category_slug: string;
  base_price: string;
  price_range: string;
  is_active: boolean;
  is_featured: boolean;
  variants: Variant[];
  images: ProductImage[];
  created_at: string;
  updated_at: string;
}