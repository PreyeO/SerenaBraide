import { useQuery } from "@tanstack/react-query";
import { getCategories } from "../../service/admin/product.service";

export const useGetCategories = () => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
    select: (data) => data?.results ?? [],
  });
};
