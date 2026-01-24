"use client";

import { useState, useMemo } from "react";
import CategoryTabs from "@/features/products/components/shared/CategoryTabs";
import ProductGrid from "@/features/products/components/shared/ProductGrid";
import { useGetProductList } from "../hooks/useGetProductList";
import { Product } from "@/types/product";
import { ProductListItem } from "../product.type";

interface ProductCategoryProps {
  category: string;
}

// Helper function to format price
const formatPrice = (price: string): string => {
  const numPrice = parseFloat(price);
  return `₦${numPrice.toLocaleString()}`;
};

// Convert API product to UI Product type
const convertToProduct = (item: ProductListItem): Product => ({
  id: item.id,
  slug: item.slug,
  name: item.name,
  price: formatPrice(item.price_range || item.base_price),
  src: item.primary_image || "/placeholder-product.png",
  type: item.category_name,
  inStock: item.in_stock,
  categorySlug: item.category_slug,
  productId: item.id, // Store product ID for navigation to product detail
  // variantId is not available at product list level - user needs to select variant on product page
  variantId: undefined,
  // These fields are not in the API response, so leave undefined
  rating: undefined,
  sold: undefined,
  reviews: undefined,
});

const CategorySection = ({ category }: ProductCategoryProps) => {
  const [activeTab, setActiveTab] = useState("");
  const [sortType, setSortType] = useState("all");

  // Fetch products for this category
  const { data: productsData, isLoading: productsLoading } = useGetProductList({
    category: category,
  });

  // Convert API products to UI format
  const products: Product[] = useMemo(() => {
    if (!productsData?.results) return [];
    return productsData.results.map(convertToProduct);
  }, [productsData]);

  // Sort products
  const sortedProducts = useMemo(() => {
    const sorted = [...products];

    switch (sortType) {
      case "price-asc":
        sorted.sort(
          (a, b) =>
            parseInt(a.price.replace(/\D/g, "")) -
            parseInt(b.price.replace(/\D/g, "")),
        );
        break;
      case "price-desc":
        sorted.sort(
          (a, b) =>
            parseInt(b.price.replace(/\D/g, "")) -
            parseInt(a.price.replace(/\D/g, "")),
        );
        break;
      case "newest":
        // Products are already sorted by newest from API
        break;
      default:
        break;
    }

    return sorted;
  }, [products, sortType]);

  return (
    <section>
      <CategoryTabs category={category} onTabChange={setActiveTab} />
      <ProductGrid
        products={sortedProducts}
        sortType={sortType}
        onSortChange={setSortType}
        isLoading={productsLoading}
      />
    </section>
  );
};
export default CategorySection;
