"use client";

import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { OrdersResponse } from "../../type/customers/profile.type";
import {
  GetOrdersParams,
  getOrders,
} from "../../service/customer/customer.service";

export const useOrders = (params?: GetOrdersParams) => {
  return useQuery<OrdersResponse, AxiosError<{ message?: string }>>({
    queryKey: ["orders", params],
    queryFn: () => getOrders(params),
    staleTime: 1000 * 30, // 30s stability
  });
};


