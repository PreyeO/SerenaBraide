import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { Order } from "../../type/customers/profile.type";
import { getOrderDetails } from "../../service/admin/order.service";

export const useGetOrderDetails = (orderNumber: number | null) => {
  return useQuery<Order, AxiosError<{ message?: string }>>({
    queryKey: ["order-details", orderNumber],
    queryFn: () => getOrderDetails(orderNumber!),
    enabled: !!orderNumber,
  });
};





