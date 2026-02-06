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
    AxiosError<{ message?: string; detail?: string }>,
    CreateWishlistPayload
  >({
    mutationFn: (payload) => {
      console.log("Adding to wishlist with payload:", payload);
      return addToWishlist(payload);
    },
    onSuccess: (data) => {
      console.log("Successfully added to wishlist:", data);
      notify.success("Added to wishlist");
      queryClient.invalidateQueries({ queryKey: ["wishlist"] });
    },
    onError: (error) => {
      console.error("Failed to add to wishlist:", error.response?.data);
      // Axios interceptor handles error toast
    },
  });
};
