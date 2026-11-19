import { Product } from "@/types/product";
import { ProductListItem } from "../../product.type";
import { formatPrice } from "@/lib/utils";
import { getListSaleInfo } from "@/lib/sale-price";

/**
 * Card sale fields ("was" price + "-20%" badge) for a product list item, or
 * nothing when it isn't on sale. Shared by every list → card converter.
 */
export const listSaleFields = (
  item: ProductListItem,
): Pick<Product, "compareAtPrice" | "percentOff"> => {
  const sale = getListSaleInfo(
    item.price_range || item.base_price,
    item.compare_at_price_range ?? item.compare_at_price,
  );
  if (!sale) return {};
  return {
    compareAtPrice: formatPrice(String(sale.compareAt)),
    percentOff: sale.percentOff,
  };
};

export const convertToProduct = (item: ProductListItem): Product => ({
  id: item.id,
  slug: item.slug,
  name: item.name,
  price: formatPrice(item.price_range || item.base_price),
  ...listSaleFields(item),
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
