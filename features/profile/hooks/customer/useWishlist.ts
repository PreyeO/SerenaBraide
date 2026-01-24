"use client";

import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { WishlistResponse } from "../../type/customers/profile.type";
import { getWishlist } from "../../service/customer/customer.service";
import { useAuthStore } from "@/features/auth/auth.store";

export const useWishlist = () => {
  const user = useAuthStore((state) => state.user);
  const tokens = useAuthStore((state) => state.tokens);
  
  return useQuery<WishlistResponse, AxiosError<{ message?: string }>>({
    queryKey: ["wishlist", user?.email],
    queryFn: getWishlist,
    staleTime: 1000 * 30, // 30s stability
    // Only fetch wishlist if user is authenticated
    enabled: !!user && !!tokens?.access,
  });
};
