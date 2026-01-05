"use client";

import { useQuery } from "@tanstack/react-query";
import { getCurrentCart } from "../service/cart.service";
import { CartResponse } from "../type/cart.type";

export const useCart = () => {
  return useQuery<CartResponse>({
    queryKey: ["cart"],
    queryFn: getCurrentCart,
    staleTime: 1000 * 30, // 30s stability
  });
};
