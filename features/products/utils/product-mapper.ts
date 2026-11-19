import { Product } from "@/types/product";
import { ProductListItem } from "../product.type";
import { listSaleFields } from "../components/shared/ConvertToProduct";

export const mapProductListItemToProduct = (item: ProductListItem): Product => {
    return {
        id: item.id,
        name: item.name,
        slug: item.slug,
        price: item.price_range || item.base_price, // Use range if available, else base
        ...listSaleFields(item),
        src: item.primary_image || "", // Handle null image
        inStock: item.in_stock,
        reviews: item.total_ratings,
        categorySlug: item.category_slug,
        productId: item.id,
    };
};
