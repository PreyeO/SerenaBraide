"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { createAddress } from "../service/checkout.service";
import { CreateAddressPayload, Address } from "../type/checkout.type";
import { notify } from "@/lib/notify";

interface UseCreateAddressOptions {
  onSuccess?: (address: Address) => void;
  onError?: (error: AxiosError<{ message?: string }>) => void;
}

export const useCreateAddress = ({
  onSuccess,
  onError,
}: UseCreateAddressOptions = {}) => {
  const queryClient = useQueryClient();

  return useMutation<Address, AxiosError<{ message?: string }>, CreateAddressPayload>({
    mutationFn: createAddress,
    onSuccess: (address) => {
      notify.success("Address created successfully!");
      queryClient.invalidateQueries({ queryKey: ["addresses"] });
      onSuccess?.(address);
    },
    onError: (error) => {
      // Axios interceptor handles error toast
      onError?.(error);
    },
  });
};



