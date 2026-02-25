"use client";

import { useMemo } from "react";
import ProductGrid from "@/features/products/components/shared/ProductGrid";
import { useGetAllProducts } from "../hooks/useGetAllProducts";
import { Product } from "@/types/product";
import { ProductListItem } from "../product.type";

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
  variantId: undefined,
  rating: undefined,
  sold: undefined,
  reviews: undefined,
});

const AllProductsSection = () => {
  // Fetch all products
  const { data: productsData, isLoading: productsLoading } =
    useGetAllProducts();

  // Convert API products to UI format
  const products: Product[] = useMemo(() => {
    if (!productsData?.results) return [];
    return productsData.results.map(convertToProduct);
  }, [productsData]);

  return (
    <section>
      <div className="container mx-auto px-4 lg:px-12 my-8">
        <ProductGrid products={products} isLoading={productsLoading} />
      </div>
    </section>
  );
};

export default AllProductsSection;
