// features/cart-checkout/hooks/useUpdateCartItem.ts
"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { updateCartItem } from "../service/cart.service";
import { CartItem } from "../type/cart.type";
import { notify } from "@/lib/notify";

export const useUpdateCartItem = () => {
  const queryClient = useQueryClient();

  return useMutation<
    CartItem,
    AxiosError<{ message: string }>,
    { id: number; quantity: number }
  >({
    mutationFn: ({ id, quantity }) => {
      if (!id) throw new Error("Invalid cart item ID");
      return updateCartItem(id, quantity);
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },

    onError: (error) => {
      notify.error(
        error.response?.data?.message ??
          error.message ??
          "Failed to update cart"
      );
    },
  });
};
