"use client";

import { useMemo } from "react";
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
  productId: item.id,
  variantId: undefined,
  rating: undefined,
  sold: undefined,
  reviews: undefined,
});

const CategorySection = ({ category }: ProductCategoryProps) => {
  // Fetch products for this category
  const { data: productsData, isLoading: productsLoading } = useGetProductList({
    category: category,
  });

  // Convert API products to UI format
  const products: Product[] = useMemo(() => {
    if (!productsData?.results) return [];
    return productsData.results.map(convertToProduct);
  }, [productsData]);

  return (
    <section>
      <ProductGrid
        products={products}
        isLoading={productsLoading}
      />
    </section>
  );
};
export default CategorySection;
