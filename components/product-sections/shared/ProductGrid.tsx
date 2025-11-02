"use client";

import { Product } from "@/types/product";
import ProductCard from "../../ui/cards/product-card";
import SortDropdown from "./SortDropdown";
import SubmitButton from "@/components/ui/btns/submit-cta";

interface ProductGridProps {
  products: Product[];
  sortType: string;
  onSortChange: (sort: string) => void;
}

export default function ProductGrid({
  products,
  sortType,
  onSortChange,
}: ProductGridProps) {
  if (products.length === 0)
    return (
      <p className="text-center text-gray-500 py-20">No products found.</p>
    );

  return (
    <div>
      <div className="flex justify-between items-center pt-[50px] text-[#3B3B3B]">
        <p className=" font-semibold">
          {products.length} {products.length === 1 ? "PRODUCT" : "PRODUCTS"}
        </p>
        <SortDropdown onSortChange={onSortChange} selected={sortType} />
      </div>

      {/* Product grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4  mt-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      <SubmitButton
        label="Load more"
        loadingLabel="Loading more..."
        className="max-w-[400px] mx-auto flex justify-center mb-[50px] mt-[60px]"
        // isPending={isPending}
      />
    </div>
  );
}
