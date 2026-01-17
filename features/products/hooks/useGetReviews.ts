"use client";

import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { getReviews } from "../product.service";
import { ReviewsResponse } from "../product.type";

export const useGetReviews = (productId: number | null) => {
  return useQuery<ReviewsResponse, AxiosError<{ message?: string }>>({
    queryKey: ["reviews", productId],
    queryFn: () => getReviews(productId!),
    enabled: !!productId, // Only fetch if productId exists
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};
