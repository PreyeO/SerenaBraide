import z from "zod";
import {
  CreateCategorySchema,
  CreateProductSchema,
  CreateVariantSchema,
} from "../../schema/admin.schema";

export type CreateProductValues = z.infer<typeof CreateProductSchema>;
export type CreateCategoryValues = z.infer<typeof CreateCategorySchema>;
export type CreateVariantValues = z.infer<typeof CreateVariantSchema>;

export interface Category {
  id: number;
  name: string;
  slug?: string;
  parent?: number | null;
}

export interface AllProduct {
  id: number;
  name: string;
  slug: string;
  description: string;
  category: number;
  category_name: string;
  base_price: string;
  price_range: string;
  is_active: boolean;
  is_featured: boolean;
  in_stock: boolean;
  primary_image: string | null;
  created_at: string;
  updated_at: string;
}

export interface VariantImage {
  id: number;
  image_url: string;
  is_primary: boolean;
  alt_text: string;
  order: number;
  variant: number;
  created_at: string;
}

export interface ProductVariant {
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

export interface VariantsResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: ProductVariant[];
}
