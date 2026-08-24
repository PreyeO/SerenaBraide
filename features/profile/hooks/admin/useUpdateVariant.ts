"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { updateVariant } from "../../service/admin/product.service";
import { notify } from "@/lib/notify";

interface UseUpdateVariantOptions {
  onSuccess?: () => void;
}

export const useUpdateVariant = (options?: UseUpdateVariantOptions) => {
  const queryClient = useQueryClient();

  return useMutation<
    unknown,
    AxiosError<{ message?: string }>,
    {
      productId: number;
      variantId: number;
      data: { stock_quantity?: number; is_active?: boolean; price?: string };
    }
  >({
    mutationFn: ({ productId, variantId, data }) =>
      updateVariant(productId, variantId, data),
    onSuccess: async (_data, variables) => {
      notify.success("Variant updated successfully!");
      await queryClient.invalidateQueries({
        queryKey: ["variants", variables.productId],
      });
      await queryClient.invalidateQueries({ queryKey: ["products"] });
      options?.onSuccess?.();
    },
    onError: () => {
      // Axios interceptor handles error toast
    },
  });
};
