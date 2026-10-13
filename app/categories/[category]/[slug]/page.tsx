import { cache } from "react";
import type { Metadata } from "next";
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

// Shared by generateMetadata and the page within one request, so building the
// title doesn't cost extra API calls.
const loadCategories = cache(getCategoriesTree);
const loadProduct = cache(getProductBySlug);

// Each product (or sub-category) gets its own title, e.g. "Ren | Serena Braide"
// via the root layout's template — so analytics and search results can tell
// pages apart instead of all showing the site-wide title.
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { category, slug } = await params;
  try {
    const categories = await loadCategories();
    const child = categories
      .find((cat) => cat.slug === category)
      ?.children?.find((c) => c.slug === slug);
    if (child) return { title: child.name };

    const product = await loadProduct(slug);
    return {
      title: product.name,
      description: product.description?.slice(0, 160) || undefined,
    };
  } catch {
    return {};
  }
}

const CategoryOrProductPage = async ({ params }: PageProps) => {
  const { category, slug } = await params;
  const queryClient = new QueryClient();

  // Parallel prefetching
  const prefetchPromises = [
    queryClient.prefetchQuery({
      queryKey: ["categories"],
      queryFn: loadCategories,
    }),
  ];

  // Logic to determine if it's a child category needs categories
  const categories = await loadCategories();

  // Find if it's a child category
  const parentCategory = categories.find((cat) => cat.slug === category);
  const isChildCategory = parentCategory?.children?.some((child) => child.slug === slug) ?? false;

  if (!isChildCategory) {
    prefetchPromises.push(
      queryClient.prefetchQuery({
        queryKey: ["product", "slug", slug],
        queryFn: () => loadProduct(slug),
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

