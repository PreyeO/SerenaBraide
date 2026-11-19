export interface Product {
  id?: string | number;
  slug?: string;
  name: string;
  price: string;
  /** Formatted "was" price (e.g. "₦88,000") — set only when on sale. */
  compareAtPrice?: string;
  /** Discount badge value (e.g. 20 for "-20%") — set only when exact. */
  percentOff?: number;
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
