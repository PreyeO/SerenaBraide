"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { notify } from "@/lib/notify";
import { useCartStore } from "../store/cart.store";
import { removeCartItem } from "../service/cart.service";

export const useRemoveCartItem = () => {
  const queryClient = useQueryClient();
  const removeItem = useCartStore((state) => state.removeItem);

  return useMutation<void, AxiosError<{ message: string }>, number>({
    mutationFn: (id) => removeCartItem(id),

    onMutate: (id) => {
      // Optimistic remove
      removeItem(id);
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },

    onError: (error) => {
      notify.error(
        error.response?.data?.message ||
          error.message ||
          "Failed to remove item"
      );
    },
  });
};
