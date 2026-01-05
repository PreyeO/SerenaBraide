export interface CartItemProps {
  image: string;
  name: string;
  price: string;
  quantity?: number;
  showQuantity?: boolean;
  onIncrease?: () => void;
  onDecrease?: () => void;
  onRemove?: () => void;
  editLink?: string;
  metaLabel: React.ReactNode;
  width: number;
  height: number;
  showRemoveButton?: boolean;
  showQuantityBox?: boolean;
  showRemoveEdit?: boolean;
  className: string;
}

export interface CartVariantImage {
  id: number;
  image_url: string;
  is_primary: boolean;
  alt_text: string;
  order: number;
  variant: number;
  created_at: string;
}

export interface CartVariant {
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
  images: CartVariantImage[];
  created_at: string;
  updated_at: string;
}

export interface CartItem {
  id: number;
  variant: CartVariant;
  quantity: number;
  subtotal: number;
  created_at: string;
  updated_at: string;
}

export interface AddToCartPayload {
  variant_id: number;
  quantity?: number;
}
export interface CartResponse {
  id: number;
  items: CartItem[];
  total_items: number;
  total_price: number;
  created_at: string;
  updated_at: string;
}
