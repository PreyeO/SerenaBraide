import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { GetOrdersParams, getOrders } from "../../service/admin/order.service";
import { OrdersResponse } from "../../type/customers/profile.type";

export const useGetOrders = (params?: GetOrdersParams) => {
  return useQuery<OrdersResponse, AxiosError<{ message?: string }>>({
    queryKey: ["admin-orders", params],
    queryFn: () => getOrders(params),
    staleTime: 1000 * 30,
  });
};








