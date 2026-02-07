import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../product.service";

export const useSearchProducts = (query: string) => {
    return useQuery({
        queryKey: ["products", "search", query],
        queryFn: () => getProducts({ search: query }),
        enabled: query.length > 0,
        staleTime: 1000 * 60, // 1 minute
    });
};

export const useTrendingProducts = () => {
    return useQuery({
        queryKey: ["products", "trending"],
        queryFn: () => getProducts({ is_featured: true }),
        staleTime: 1000 * 60 * 5, // 5 minutes
    });
};
