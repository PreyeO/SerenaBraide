import { useQuery } from "@tanstack/react-query";
import { getCustomersByLocation } from "../../service/admin/general";

export const useGetCustomersByLocation = () => {
    return useQuery({
        queryKey: ["customers-by-location"],
        queryFn: getCustomersByLocation,
    });
};
