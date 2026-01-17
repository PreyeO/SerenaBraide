"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { deleteAddress } from "../service/checkout.service";
import { notify } from "@/lib/notify";

interface UseDeleteAddressOptions {
  onSuccess?: () => void;
  onError?: (error: AxiosError<{ message?: string }>) => void;
}

export const useDeleteAddress = ({
  onSuccess,
  onError,
}: UseDeleteAddressOptions = {}) => {
  const queryClient = useQueryClient();

  return useMutation<void, AxiosError<{ message?: string }>, number>({
    mutationFn: deleteAddress,
    onSuccess: () => {
      notify.success("Address deleted successfully!");
      queryClient.invalidateQueries({ queryKey: ["addresses"] });
      onSuccess?.();
    },
    onError: (error) => {
      const errorMessage =
        error.response?.data?.message || error.message || "Failed to delete address";
      notify.error(errorMessage);
      onError?.(error);
    },
  });
};


