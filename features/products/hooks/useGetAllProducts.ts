import { useQuery } from "@tanstack/react-query";
import { getAllProducts } from "../product.service";

export const useGetAllProducts = () => {
    return useQuery({
        queryKey: ["all-products"],
        queryFn: getAllProducts,
        staleTime: 1000 * 60 * 5, // Cache for 5 minutes
    });
};
