import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../product.service";
import { ProductListParams } from "../product.type";

export const useGetProductList = (params?: ProductListParams) => {
  return useQuery({
    queryKey: ["products", params],
    queryFn: () => getProducts(params),
    staleTime: 1000 * 60 * 2, // Cache for 2 minutes
  });
};



