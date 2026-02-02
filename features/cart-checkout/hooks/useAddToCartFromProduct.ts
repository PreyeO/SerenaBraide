// features/cart-checkout/hooks/useAddToCartFromProduct.ts
"use client";

import { useCallback } from "react";
import { useRouter } from "next/navigation";
import { notify } from "@/lib/notify";
import { getProductById } from "@/features/products/product.service";
import { useAddToCartMutation } from "./useAddToCartMutation";
import { Product } from "@/types/product";

interface UseAddToCartFromProductOptions {
  onSuccess?: () => void;
}

export const useAddToCartFromProduct = (
  options?: UseAddToCartFromProductOptions
) => {
  const router = useRouter();
  const addToCartMutation = useAddToCartMutation();
  const { onSuccess } = options || {};

  const addToCartFromProduct = useCallback(
    async (product: Product) => {
      // Check if product is in stock
      if (!product.inStock) {
        notify.error("This product is out of stock");
        return;
      }

      // If variantId exists, use it directly
      if (product.variantId) {
        addToCartMutation.mutate(
          {
            variant_id: product.variantId,
            quantity: 1,
          },
          {
            onSuccess: () => {
              onSuccess?.();
            },
          }
        );
        return;
      }

      // If no variantId but we have productId, fetch product details to get first variant
      if (product.productId) {
        try {
          const productDetail = await getProductById(product.productId);
          const firstVariant = productDetail.variants?.[0];

          if (!firstVariant) {
            notify.error("No variants available for this product");
            return;
          }

          if (!firstVariant.is_in_stock) {
            notify.error("This product is out of stock");
            return;
          }

          addToCartMutation.mutate(
            {
              variant_id: firstVariant.id,
              quantity: 1,
            },
            {
              onSuccess: () => {
                onSuccess?.();
              },
            }
          );
        } catch (error) {
          notify.error("Failed to load product details");
        }
        return;
      }

      // Fallback: navigate to product page if we can't determine variant
      if (product.slug && product.categorySlug) {
        router.push(`/categories/${product.categorySlug}/${product.slug}`);
      } else {
        notify.error("Please select a variant first");
      }
    },
    [addToCartMutation, router, onSuccess]
  );

  return {
    addToCartFromProduct,
    isPending: addToCartMutation.isPending,
  };
};

