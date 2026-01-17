"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { updateAddress } from "../service/checkout.service";
import { UpdateAddressPayload, Address } from "../type/checkout.type";
import { notify } from "@/lib/notify";

interface UseUpdateAddressOptions {
  onSuccess?: (address: Address) => void;
  onError?: (error: AxiosError<{ message?: string }>) => void;
}

export const useUpdateAddress = ({
  onSuccess,
  onError,
}: UseUpdateAddressOptions = {}) => {
  const queryClient = useQueryClient();

  return useMutation<
    Address,
    AxiosError<{ message?: string }>,
    { id: number; payload: UpdateAddressPayload }
  >({
    mutationFn: ({ id, payload }) => updateAddress(id, payload),
    onSuccess: (address) => {
      notify.success("Address updated successfully!");
      queryClient.invalidateQueries({ queryKey: ["addresses"] });
      onSuccess?.(address);
    },
    onError: (error) => {
      const errorMessage =
        error.response?.data?.message || error.message || "Failed to update address";
      notify.error(errorMessage);
      onError?.(error);
    },
  });
};


