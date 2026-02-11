"use client";

import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRouter, usePathname } from "next/navigation";
import { notify } from "@/lib/notify";
import { createOrder, CreateOrderPayload } from "../service/checkout.service";
import { Order } from "../type/checkout.type";

interface UseCreateOrderOptions {
  onSuccess?: (order: Order) => void;
  onError?: (error: AxiosError<{ message?: string }>) => void;
  redirectToCheckout?: boolean;
}

export const useCreateOrder = ({
  onSuccess,
  onError,
  redirectToCheckout = true
}: UseCreateOrderOptions = {}) => {
  const router = useRouter();
  const pathname = usePathname();
  const isOnCheckoutPage = pathname === "/checkout";

  return useMutation<Order, AxiosError<{ message?: string }>, CreateOrderPayload | undefined>({
    mutationFn: (payload) => createOrder(payload),
    onSuccess: (order) => {
      notify.success("Order created successfully!");

      // Only redirect if not already on checkout page and redirectToCheckout is true
      if (redirectToCheckout && !isOnCheckoutPage) {
        router.push(`/checkout?order_number=${order.order_number}`);
      } else if (isOnCheckoutPage) {
        // If already on checkout page, add order_number to URL
        router.push(`/checkout?order_number=${order.order_number}`);
      }

      onSuccess?.(order);
    },
    onError: (error) => {
      // Axios interceptor handles error toast
      onError?.(error);
    },
  });
};

