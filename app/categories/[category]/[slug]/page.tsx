"use client";

import { Suspense } from "react";
import { useParams } from "next/navigation";
import ProductDetailContent from "@/features/products/components/ProductDetailContent";
import CategorySection from "@/features/products/components/CategorySection";
import HeroSection from "@/features/products/components/HeroSection";
import { useGetCategoriesTree } from "@/features/products/hooks/useGetCategoriesTree";
import { useMemo } from "react";

const CategoryOrProductContent = () => {
  const params = useParams();
  const category = params?.category as string;
  const slug = params?.slug as string;
  const { data: categories = [] } = useGetCategoriesTree();

  // Check if the slug is a child category
  const isChildCategory = useMemo(() => {
    // Find parent category
    const parentCategory = categories.find((cat) => cat.slug === category);
    if (!parentCategory) return false;

    // Check if slug matches any child category
    const childCategory = parentCategory.children?.find(
      (child) => child.slug === slug
    );
    return !!childCategory;
  }, [categories, category, slug]);

  // If it's a child category, render category page
  if (isChildCategory) {
    return (
      <>
        <HeroSection categorySlug={slug} />
        <CategorySection category={slug} />
      </>
    );
  }

  // Otherwise, render product detail page
  return <ProductDetailContent category={category} slug={slug} />;
};

const CategoryOrProductPage = () => {
  return (
    <Suspense fallback={<div className="flex items-center justify-center min-h-screen">Loading...</div>}>
      <CategoryOrProductContent />
    </Suspense>
  );
};

export default CategoryOrProductPage;
