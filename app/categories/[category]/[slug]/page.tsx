import { Suspense } from "react";
import ProductDetailContent from "@/features/products/components/ProductDetailContent";
import CategorySection from "@/features/products/components/CategorySection";
import HeroSection from "@/features/products/components/HeroSection";
import { getCategoriesTree, getProductBySlug } from "@/features/products/product.service";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";

interface PageProps {
  params: Promise<{
    category: string;
    slug: string;
  }>;
}

const CategoryOrProductPage = async ({ params }: PageProps) => {
  const { category, slug } = await params;
  const queryClient = new QueryClient();

  // Parallel prefetching
  const prefetchPromises = [
    queryClient.prefetchQuery({
      queryKey: ["categories"],
      queryFn: getCategoriesTree,
    }),
  ];

  // Logic to determine if it's a child category needs categories
  const categories = await getCategoriesTree();

  // Find if it's a child category
  const parentCategory = categories.find((cat) => cat.slug === category);
  const isChildCategory = parentCategory?.children?.some((child) => child.slug === slug) ?? false;

  if (!isChildCategory) {
    prefetchPromises.push(
      queryClient.prefetchQuery({
        queryKey: ["product", "slug", slug],
        queryFn: () => getProductBySlug(slug),
      })
    );
  }

  // Wait for all prefetching to finish before rendering
  await Promise.all(prefetchPromises);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      {isChildCategory ? (
        <>
          <HeroSection categorySlug={slug} />
          <CategorySection category={slug} />
        </>
      ) : (
        <ProductDetailContent category={category} slug={slug} />
      )}
    </HydrationBoundary>
  );
};

export default CategoryOrProductPage;

