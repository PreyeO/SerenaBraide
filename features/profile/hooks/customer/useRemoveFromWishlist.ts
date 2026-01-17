"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { notify } from "@/lib/notify";
import { removeFromWishlist } from "../../service/customer/customer.service";

export const useRemoveFromWishlist = () => {
  const queryClient = useQueryClient();

  return useMutation<void, AxiosError<{ message?: string }>, number>({
    mutationFn: removeFromWishlist,
    onSuccess: () => {
      notify.success("Removed from wishlist");
      queryClient.invalidateQueries({ queryKey: ["wishlist"] });
    },
    onError: (error) => {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Failed to remove from wishlist";
      notify.error(errorMessage);
    },
  });
};
