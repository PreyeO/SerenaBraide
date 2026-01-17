"use client";

import CategorySection from "@/features/products/components/CategorySection";
import { useParams } from "next/navigation";

const CategoryPage = () => {
  const params = useParams();
  const category = params?.category as string;

  return <CategorySection category={category} />;
};
export default CategoryPage;
