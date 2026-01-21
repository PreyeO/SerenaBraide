"use client";

import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { getOrderPayments } from "../payment.service";
import { PaymentResponse } from "../payment.type";

export const useOrderPayments = (orderNumber: number | null) => {
  return useQuery<PaymentResponse[], AxiosError<{ message?: string }>>({
    queryKey: ["order-payments", orderNumber],
    queryFn: () => getOrderPayments(orderNumber!),
    enabled: !!orderNumber, // Only fetch if orderNumber exists
    staleTime: 1000 * 30, // 30 seconds - payment status changes frequently
    refetchInterval: (query) => {
      // Stop polling if payment is successful/completed
      const data = query.state.data;
      if (data && data.length > 0) {
        const latestPayment = data[data.length - 1];
        const status = latestPayment.status.toLowerCase();
        if (
          status === "successful" ||
          status === "completed" ||
          (latestPayment.redirect_verified === true &&
            latestPayment.amount_paid !== null)
        ) {
          return false; // Stop polling
        }
      }
      return 5000; // Poll every 5 seconds
    },
  });
};

