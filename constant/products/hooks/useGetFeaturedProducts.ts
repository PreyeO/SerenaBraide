import { useQuery } from "@tanstack/react-query";
import { getFeaturedProducts } from "../product.service";

export const useGetFeaturedProducts = () => {
    return useQuery({
        queryKey: ["featured-products"],
        queryFn: getFeaturedProducts,
        staleTime: 1000 * 60 * 5, // Cache for 5 minutes
    });
};
