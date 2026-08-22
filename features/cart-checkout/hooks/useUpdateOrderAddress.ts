"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { updateOrderAddress } from "../service/checkout.service";
import { Order } from "../type/checkout.type";

/**
 * Attaches a selected delivery address to an order via
 * PATCH /api/orders/{orderNumber}/ { address_id }.
 * Errors surface through the axios interceptor toast.
 */
export const useUpdateOrderAddress = () => {
  const queryClient = useQueryClient();

  return useMutation<
    Order,
    AxiosError<{ message?: string }>,
    { orderNumber: number; addressId: number }
  >({
    mutationFn: ({ orderNumber, addressId }) =>
      updateOrderAddress(orderNumber, addressId),
    onSuccess: (_data, { orderNumber }) => {
      queryClient.invalidateQueries({ queryKey: ["order", orderNumber] });
    },
  });
};
