export interface Product {
  id?: string | number;
  slug?: string;
  name: string;
  price: string;
  src: string;

  inStock?: boolean;
  reviews?: number;

  categorySlug?: string;
  productId?: number;

  // unused (explicitly optional)
  type?: string;
  rating?: number;
  sold?: string;
  sizes?: string[];
  colors?: string[];
  variantId?: number;
}
