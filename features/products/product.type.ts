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
  ingredients: string | null;
  inspiration: string | null;
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

export interface ReviewCustomerProfile {
  id: number;
  first_name: string;
  last_name: string;
  name: string;
}

export interface ProductReview {
  id: number;
  customer_profile: ReviewCustomerProfile;
  reviewer_name: string;
  order_item: OrderItem;
  rating: number;
  review: string | null;
  is_approved: boolean | null;
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
  parent_name?: string; // Present in children
  full_path?: string; // Present in parent categories
  is_active: boolean;
  children_count?: number; // Present in children
  children?: CategoryTree[];
  image_url?: string | null;
  image_alt_text?: string | null;
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
  total_ratings: number;
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
  ingredients: string | null;
  inspiration: string | null;
  created_at: string;
  updated_at: string;
  total_ratings: number;
}
