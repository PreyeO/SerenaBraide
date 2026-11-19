import CategorySection from "@/features/products/components/CategorySection";
import HeroSection from "@/features/products/components/HeroSection";
import { getCategoriesTree, getProducts } from "@/features/products/product.service";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";

// Re-fetch on the server at most once a minute (see app/all-products/page.tsx).
export const revalidate = 60;

// No categories are pre-built at deploy time; each one is rendered on its first
// visit and then cached/refreshed like All products (instead of re-rendering,
// and re-calling the API, on every single page view).
export async function generateStaticParams() {
  return [];
}

interface PageProps {
  params: Promise<{ category: string }>;
}

/**
 * The category's products and the category details for the hero are fetched on
 * the server and sent with the page, so cards and images are in the HTML on
 * arrival. Failed server fetches fall back to fetching in the browser.
 */
const CategoryPage = async ({ params }: PageProps) => {
  const { category } = await params;
  const queryClient = new QueryClient();

  await Promise.all([
    // Keys must match useGetProductList({ category }) and useGetCategoriesTree.
    queryClient.prefetchQuery({
      queryKey: ["products", { category }],
      queryFn: () => getProducts({ category }),
    }),
    queryClient.prefetchQuery({
      queryKey: ["categories-tree"],
      queryFn: getCategoriesTree,
    }),
  ]);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <HeroSection categorySlug={category} />
      <CategorySection category={category} />
    </HydrationBoundary>
  );
};

export default CategoryPage;
