import { Product } from "@/types/product";
import { ProductListItem } from "../../product.type";
import { formatPrice } from "@/lib/utils";

export const convertToProduct = (item: ProductListItem): Product => ({
  id: item.id,
  slug: item.slug,
  name: item.name,
  price: formatPrice(item.price_range || item.base_price),
  src: item.primary_image || "/placeholder-product.png",

  // Stock
  inStock: item.in_stock,

  // Ratings
  reviews: item.total_ratings,

  // Navigation
  categorySlug: item.category_slug,
  productId: item.id,

  // Explicitly unset unused fields
  type: "",
  rating: undefined,
  sold: undefined,
  sizes: undefined,
  colors: undefined,
  variantId: undefined,
});
