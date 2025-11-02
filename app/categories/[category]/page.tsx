"use client";

import ProductCategory from "@/components/product-sections/all-product/ProductCategory";

export default function CategoryPage({
  params,
}: {
  params: { category: string };
}) {
  return <ProductCategory category={params.category} />;
}
