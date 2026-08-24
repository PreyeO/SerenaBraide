"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateProduct } from "../../service/admin/product.service";
import { notify } from "@/lib/notify";
import { UpdateProductValues } from "../../type/admin/product.type";

interface UseUpdateProductOptions {
  onSuccess?: () => void;
}

export const useUpdateProduct = (options?: UseUpdateProductOptions) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      productId,
      data,
    }: {
      productId: number;
      data: UpdateProductValues;
    }) => updateProduct(productId, data),
    onSuccess: async (_data, variables) => {
      notify.success("Product updated successfully!");
      await queryClient.invalidateQueries({ queryKey: ["products"] });
      await queryClient.invalidateQueries({
        queryKey: ["product", variables.productId],
      });
      options?.onSuccess?.();
    },
    onError: () => {
      // Axios interceptor handles error toast
    },
  });
};
