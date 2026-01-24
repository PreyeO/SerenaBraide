export interface Product {
  id?: string | number;
  slug?: string;
  type: string;
  price: string;
  name: string;
  src: string;
  rating?: number; // 4.5
  sold?: string;
  sizes?: string[]; // for fragrance
  colors?: string[];
  reviews?: number;
  variantId?: number; // For wishlist functionality
  productId?: number; // For review count
  inStock?: boolean;
  categorySlug?: string;
}
