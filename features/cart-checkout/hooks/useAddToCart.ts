// features/cart-checkout/hooks/useAddToCart.ts
"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { addToCart } from "../service/cart.service";
import { AddToCartPayload, CartItem } from "../type/cart.type";
import { notify } from "@/lib/notify";

export const useAddToCart = () => {
  const queryClient = useQueryClient();

  return useMutation<
    CartItem,
    AxiosError<{ message: string }>,
    AddToCartPayload
  >({
    mutationFn: addToCart,

    onSuccess: async () => {
      notify.success("Added to cart");

      // Refetch the cart and wait for it to complete before navigating
      await queryClient.refetchQueries({ queryKey: ["cart"] });
    },

    onError: () => {
      // Axios interceptor handles error toast
    },
  });
};
