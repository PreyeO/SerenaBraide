"use client";

import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { OrdersResponse } from "../../type/customers/profile.type";
import { getOrders } from "../../service/customer/customer.service";

export const useOrders = () => {
  return useQuery<OrdersResponse, AxiosError<{ message?: string }>>({
    queryKey: ["orders"],
    queryFn: getOrders,
    staleTime: 1000 * 30, // 30s stability
  });
};

