import { useQuery } from "@tanstack/react-query";
import { getCategories } from "../../service/admin/product.service";

export const useGetCategories = () => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
    staleTime: 0,
    refetchOnWindowFocus: true,
    refetchOnMount: "always",
  });
};
