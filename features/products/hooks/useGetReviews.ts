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
    staleTime: 0, // Always consider data stale to ensure fresh data per product
    refetchOnMount: "always", // Always refetch when component mounts
    refetchOnWindowFocus: false, // Don't refetch on window focus to avoid unnecessary calls
    retry: false, // Don't retry on error - if no reviews exist, that's fine
  });
};
