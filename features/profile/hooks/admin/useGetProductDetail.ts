"use client";

import { useQuery } from "@tanstack/react-query";
import { getProductById } from "@/features/products/product.service";
import { ProductDetail } from "@/features/products/product.type";

/**
 * Full product detail (incl. the complete images gallery) for the admin edit
 * form — the products list only carries `primary_image`.
 */
export const useGetProductDetail = (productId: number | null) => {
  return useQuery<ProductDetail>({
    queryKey: ["product", productId],
    queryFn: () => getProductById(productId!),
    enabled: !!productId,
  });
};
