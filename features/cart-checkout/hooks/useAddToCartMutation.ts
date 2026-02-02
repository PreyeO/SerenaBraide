"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { addToCart } from "../service/cart.service";
import { AddToCartPayload, CartItem } from "../type/cart.type";
import { notify } from "@/lib/notify";

export const useAddToCartMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<
    CartItem,
    AxiosError<{ message: string }>,
    AddToCartPayload
  >({
    mutationFn: addToCart,

    onSuccess: () => {
      notify.success("Added to cart");

      // Refetch the cart in the background (don't wait for it)
      queryClient.refetchQueries({ queryKey: ["cart"] });
    },

    onError: (error) => {
      notify.error(
        error.response?.data?.message ??
          error.message ??
          "Failed to add item to cart",
      );
    },
  });
};
