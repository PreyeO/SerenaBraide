// features/cart-checkout/hooks/useAddToCart.ts
"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { addToCart } from "../service/cart.service";
import { AddToCartPayload, CartItem, CartResponse } from "../type/cart.type";
import { notify } from "@/lib/notify";
import { useRouter } from "next/navigation";

export const useAddToCart = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation<
    CartItem,
    AxiosError<{ message: string }>,
    AddToCartPayload
  >({
    mutationFn: addToCart,

    // Optimistic update to prevent empty screen flash
    onMutate: async (newItem) => {
      // Cancel any outgoing refetches to avoid overwriting optimistic update
      await queryClient.cancelQueries({ queryKey: ["cart"] });

      // Snapshot the previous value
      const previousCart = queryClient.getQueryData<CartResponse>(["cart"]);

      // Optimistically update React Query cache with the new item
      // Note: We don't have the full item data yet, so we'll just keep the previous data
      // The real data will come from the backend response

      return { previousCart };
    },

    onSuccess: (newItem) => {
      notify.success("Added to cart");
      // Invalidate and refetch to get the latest cart data from backend
      queryClient.invalidateQueries({ queryKey: ["cart"] });
      // Navigate after a small delay to ensure query is set
      setTimeout(() => {
        router.push("/cart");
      }, 100);
    },

    onError: (error, variables, context) => {
      // Rollback on error
      if (context?.previousCart) {
        queryClient.setQueryData(["cart"], context.previousCart);
      }
      notify.error(
        error.response?.data?.message ??
          error.message ??
          "Failed to add item to cart"
      );
    },
  });
};
