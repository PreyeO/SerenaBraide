"use client";

import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { WishlistResponse } from "../../type/customers/profile.type";
import { getWishlist } from "../../service/customer/customer.service";

export const useWishlist = () => {
  return useQuery<WishlistResponse, AxiosError<{ message?: string }>>({
    queryKey: ["wishlist"],
    queryFn: getWishlist,
    staleTime: 1000 * 30, // 30s stability
  });
};
