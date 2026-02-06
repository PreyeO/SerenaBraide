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
      notify.success("Item Successfully Removed!");
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },

    onError: () => {
      // Axios interceptor handles error toast
    },
  });
};
