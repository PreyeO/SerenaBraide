import { useQuery } from "@tanstack/react-query";
import { getCustomerDetail, getCustomers } from "../../service/admin/general";

export const useGetCustomers = () => {
  return useQuery({
    queryKey: ["customers"],
    queryFn: getCustomers,
  });
};

export const useGetCustomerDetail = (id: number) => {
  return useQuery({
    queryKey: ["customer", id],
    queryFn: () => getCustomerDetail(id),
    enabled: !!id,
  });
};
