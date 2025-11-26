"use client";

import { useState, useMemo } from "react";
import CategoryTabs from "@/features/products/components/shared/CategoryTabs";
import ProductGrid from "@/features/products/components/shared/ProductGrid";
import { sampleProducts } from "@/constant/product";
import { Product } from "@/types/product";

interface ProductCategoryProps {
  category: string;
}

const CategorySection = ({ category }: ProductCategoryProps) => {
  const [activeTab, setActiveTab] = useState("");
  const [sortType, setSortType] = useState("all");

  // ✅ Get products for the current category
  const categoryProducts = sampleProducts[category] || [];

  // ✅ Filter products based on the active tab
  const filteredProducts = useMemo(() => {
    if (!activeTab || activeTab.toLowerCase() === "all")
      return categoryProducts;

    return categoryProducts.filter(
      (product) => product.subCategory === activeTab
    );
  }, [categoryProducts, activeTab]);

  // ✅ Sort products
  const sortedProducts = useMemo(() => {
    const sorted = [...filteredProducts];

    switch (sortType) {
      case "price-asc":
        sorted.sort(
          (a, b) =>
            parseInt(a.price.replace(/\D/g, "")) -
            parseInt(b.price.replace(/\D/g, ""))
        );
        break;
      case "price-desc":
        sorted.sort(
          (a, b) =>
            parseInt(b.price.replace(/\D/g, "")) -
            parseInt(a.price.replace(/\D/g, ""))
        );
        break;
      case "best-sellers":
        sorted.sort((a, b) => parseInt(b.sold) - parseInt(a.sold));
        break;
      case "newest":
        sorted.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        break;
      default:
        break;
    }

    return sorted;
  }, [filteredProducts, sortType]);

  return (
    <section>
      <CategoryTabs category={category} onTabChange={setActiveTab} />
      <ProductGrid
        products={sortedProducts as Product[]}
        sortType={sortType}
        onSortChange={setSortType}
      />
    </section>
  );
};
export default CategorySection;
