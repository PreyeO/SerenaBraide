import { useQuery } from "@tanstack/react-query";
import { getProductBySlug, getProductById } from "../product.service";

export const useGetProductBySlug = (slug: string) => {
  return useQuery({
    queryKey: ["product", "slug", slug],
    queryFn: () => getProductBySlug(slug),
    enabled: !!slug,
    staleTime: 1000 * 60 * 2, // Cache for 2 minutes
    retry: 1,
  });
};

export const useGetProductById = (productId: number) => {
  return useQuery({
    queryKey: ["product", "id", productId],
    queryFn: () => getProductById(productId),
    enabled: !!productId && productId > 0,
    staleTime: 1000 * 60 * 2, // Cache for 2 minutes
  });
};

