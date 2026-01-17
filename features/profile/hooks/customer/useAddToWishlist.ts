"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { notify } from "@/lib/notify";
import {
  CreateWishlistPayload,
  WishlistItem,
} from "../../type/customers/profile.type";
import { addToWishlist } from "../../service/customer/customer.service";

export const useAddToWishlist = () => {
  const queryClient = useQueryClient();

  return useMutation<
    WishlistItem,
    AxiosError<{ message?: string }>,
    CreateWishlistPayload
  >({
    mutationFn: addToWishlist,
    onSuccess: () => {
      notify.success("Added to wishlist");
      queryClient.invalidateQueries({ queryKey: ["wishlist"] });
    },
    onError: (error) => {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Failed to add to wishlist";
      notify.error(errorMessage);
    },
  });
};
