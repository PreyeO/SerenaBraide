"use client";

import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { getReviews } from "../product.service";
import { ReviewsResponse } from "../product.type";

export const useGetReviews = (productId: number | null) => {
  return useQuery<ReviewsResponse, AxiosError<{ detail?: string; message?: string }>>({
    queryKey: ["reviews", productId],
    queryFn: () => getReviews(productId!),
    enabled: !!productId, // Only fetch if productId exists
    staleTime: 1000 * 60 * 5, // 5 minutes stability
    refetchOnMount: false, // Don't refetch on mount if data is fresh
    refetchOnWindowFocus: false, // Don't refetch on window focus to avoid unnecessary calls
    retry: false, // Don't retry on error - if no reviews exist, that's fine
  });
};
