"use client";

import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { getOrderDetail } from "../service/checkout.service";
import { Order } from "../type/checkout.type";

export const useOrderDetail = (orderNumber: number | null) => {
  return useQuery<Order, AxiosError<{ message?: string }>>({
    queryKey: ["order", orderNumber],
    queryFn: () => getOrderDetail(orderNumber!),
    enabled: !!orderNumber, // Only fetch if orderNumber exists
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};

