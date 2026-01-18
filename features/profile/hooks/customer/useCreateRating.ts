"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { createRating } from "../../service/customer/customer.service";
import { CreateRatingPayload, Rating } from "../../type/customer/rating.type";
import { notify } from "@/lib/notify";

interface UseCreateRatingOptions {
  onSuccess?: (rating: Rating) => void;
  onError?: (error: AxiosError<{ message?: string }>) => void;
}

export const useCreateRating = ({
  onSuccess,
  onError,
}: UseCreateRatingOptions = {}) => {
  const queryClient = useQueryClient();

  return useMutation<Rating, AxiosError<{ message?: string }>, CreateRatingPayload>({
    mutationFn: createRating,
    onSuccess: (rating) => {
      notify.success("Review submitted successfully!");
      queryClient.invalidateQueries({ queryKey: ["ratings"] });
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      onSuccess?.(rating);
    },
    onError: (error) => {
      const errorMessage =
        error.response?.data?.message || error.message || "Failed to submit review";
      notify.error(errorMessage);
      onError?.(error);
    },
  });
};



