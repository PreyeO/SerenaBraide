"use client";

import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { Product } from "@/types/product";
import ProductCard from "../../../../components/ui/cards/product-card";
import SortDropdown from "./SortDropdown";
import SubmitButton from "@/components/ui/btns/submit-cta";
import LoadingState from "@/components/ui/loaders/loading-state";
import { getProductById } from "@/features/products/product.service";

interface ProductGridProps {
  products: Product[];
  sortType: string;
  onSortChange: (sort: string) => void;
  isLoading?: boolean;
}

export default function ProductGrid({
  products,
  sortType,
  onSortChange,
  isLoading = false,
}: ProductGridProps) {
  const queryClient = useQueryClient();

  // Prefetch product details so add-to-cart from ProductCard is instant
  useEffect(() => {
    if (!products.length) return;
    products.slice(0, 12).forEach((p) => {
      if (p.productId && !p.variantId) {
        queryClient.prefetchQuery({
          queryKey: ["product", "id", p.productId],
          queryFn: () => getProductById(p.productId!),
          staleTime: 1000 * 60 * 2,
        });
      }
    });
  }, [products, queryClient]);

  if (isLoading) {
    return <LoadingState />;
  }

  if (products.length === 0) {
    return (
      <p className="text-center text-gray-500 py-20">No products found.</p>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center lg:pt-12.5 pt-6 font-normal text-sm text-[#3B3B3B]">
        <p className="">
          {products.length} {products.length === 1 ? "PRODUCT" : "PRODUCTS"}
        </p>
        <SortDropdown onSortChange={onSortChange} selected={sortType} />
      </div>

      {/* Product grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 mt-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {products.length >= 12 && (
        <SubmitButton
          label="Load more"
          loadingLabel="Loading more..."
          className="max-w-100 mx-auto flex justify-center mb-12.5 mt-15"
        />
      )}
    </div>
  );
}
