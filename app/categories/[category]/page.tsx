"use client";

import CategorySection from "@/features/products/components/CategorySection";
import HeroSection from "@/features/products/components/HeroSection";
import { useParams } from "next/navigation";

const CategoryPage = () => {
  const params = useParams();
  const category = params?.category as string;

  return (
    <>
      <HeroSection categorySlug={category} />
      <CategorySection category={category} />
    </>
  );
};

export default CategoryPage;
