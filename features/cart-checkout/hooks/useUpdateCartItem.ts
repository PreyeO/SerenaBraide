// features/cart-checkout/hooks/useUpdateCartItem.ts
"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { updateCartItem } from "../service/cart.service";
import { CartItem, CartResponse } from "../type/cart.type";
import { notify } from "@/lib/notify";
import { useCartStore } from "../store/cart.store";

export const useUpdateCartItem = () => {
  const queryClient = useQueryClient();
  const updateItem = useCartStore((state) => state.updateItem);

  return useMutation<
    CartItem,
    AxiosError<{ message: string }>,
    { id: number; quantity: number },
    { previousCart: CartResponse | undefined }
  >({
    mutationFn: ({ id, quantity }) => {
      if (!id) throw new Error("Invalid cart item ID");
      return updateCartItem(id, quantity);
    },

    // Optimistic update - update UI immediately
    onMutate: async ({ id, quantity }) => {
      // Cancel any outgoing refetches to avoid overwriting optimistic update
      await queryClient.cancelQueries({ queryKey: ["cart"] });

      // Snapshot the previous value
      const previousCart = queryClient.getQueryData<CartResponse>(["cart"]);

      // Optimistically update the cart store
      updateItem({ id, quantity });

      // Optimistically update React Query cache
      if (previousCart) {
        const optimisticCart: CartResponse = {
          ...previousCart,
          items: previousCart.items.map((item) =>
            item.id === id
              ? {
                  ...item,
                  quantity,
                  subtotal: item.variant.effective_price * quantity,
                }
              : item
          ),
          total_items: previousCart.items.reduce(
            (sum, item) => sum + (item.id === id ? quantity : item.quantity),
            0
          ),
          total_price: previousCart.items.reduce(
            (sum, item) =>
              sum +
              (item.id === id
                ? item.variant.effective_price * quantity
                : item.subtotal),
            0
          ),
        };
        queryClient.setQueryData(["cart"], optimisticCart);
      }

      return { previousCart };
    },

    onSuccess: () => {
      // Refetch to ensure we have the latest data from backend
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },

    onError: (error, variables, context) => {
      // Rollback on error
      if (context?.previousCart) {
        queryClient.setQueryData(["cart"], context.previousCart);
      }
      notify.error(
        error.response?.data?.message ??
          error.message ??
          "Failed to update cart"
      );
    },
  });
};
