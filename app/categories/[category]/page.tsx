"use client";

import CategorySection from "@/features/products/components/CategorySection";

const CategoryPage = ({ params }: { params: { category: string } }) => {
  return <CategorySection category={params.category} />;
};
export default CategoryPage;
