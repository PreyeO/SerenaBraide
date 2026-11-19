import AllProductsSection from "@/features/products/components/AllProductsSection";
import { getAllProducts } from "@/features/products/product.service";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";

// Re-fetch the product list on the server at most once a minute, so price
// changes made in the admin show up within ~60s while every visitor still gets
// a ready-made page.
export const revalidate = 60;

/**
 * The product list is fetched on the server and sent with the page, so product
 * cards (and their images) are in the HTML on arrival instead of waiting for
 * the browser to start the app and then call the API. Ad traffic lands here.
 *
 * If the server fetch fails, prefetchQuery swallows the error and the page
 * falls back to fetching in the browser, exactly as before.
 */
const AllProductsPage = async () => {
  const queryClient = new QueryClient();

  // Same key as useGetAllProducts, so the client picks this data up directly.
  await queryClient.prefetchQuery({
    queryKey: ["all-products"],
    queryFn: getAllProducts,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <AllProductsSection />
    </HydrationBoundary>
  );
};

export default AllProductsPage;
