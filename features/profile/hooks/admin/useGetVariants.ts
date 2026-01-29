import { useQuery } from "@tanstack/react-query";
import { getProductVariants } from "../../service/admin/product.service";
import { VariantsResponse } from "../../type/admin/product.type";

export const useGetVariants = (productId: number | null) => {
  return useQuery<VariantsResponse>({
    queryKey: ["variants", productId],
    queryFn: () => getProductVariants(productId!),
    enabled: !!productId,
  });
};









