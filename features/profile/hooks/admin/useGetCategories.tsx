import { useQuery } from "@tanstack/react-query";
import { getCategories } from "../../service/admin/product.service";

export const useGetCategories = () => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
    select: (data) => {
      // Handle both cases: data might be an array or an object with results
      if (Array.isArray(data)) {
        return data;
      }
      return data?.results ?? [];
    },
  });
};
