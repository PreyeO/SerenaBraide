import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../../service/admin/product.service";

export const useGetProducts = () => {
  return useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
    select: (data) => data?.results ?? [],
  });
};
