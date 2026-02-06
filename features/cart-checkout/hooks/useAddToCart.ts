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

    onSuccess: async () => {
      notify.success("Added to cart");

      // Refetch the cart and wait for it to complete before navigating
      await queryClient.refetchQueries({ queryKey: ["cart"] });

      // Now navigate - cart data will be ready
      router.push("/cart");
    },

    onError: () => {
      // Axios interceptor handles error toast
    },
  });
};
