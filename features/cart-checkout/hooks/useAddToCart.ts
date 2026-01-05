// features/cart-checkout/hooks/useAddToCart.ts
"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { addToCart } from "../service/cart.service";
import { AddToCartPayload, CartItem } from "../type/cart.type";
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

    onSuccess: () => {
      notify.success("Added to cart");
      queryClient.invalidateQueries({ queryKey: ["cart"] });
      router.push("/cart");
    },

    onError: (error) => {
      notify.error(
        error.response?.data?.message ??
          error.message ??
          "Failed to add item to cart"
      );
    },
  });
};
