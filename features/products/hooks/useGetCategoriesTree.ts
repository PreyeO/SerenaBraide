import { useQuery } from "@tanstack/react-query";
import { getCategoriesTree } from "../product.service";

export const useGetCategoriesTree = () => {
  return useQuery({
    queryKey: ["categories-tree"],
    queryFn: getCategoriesTree,
    staleTime: 1000 * 60 * 5, // Cache for 5 minutes
  });
};






