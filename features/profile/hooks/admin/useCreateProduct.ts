"use client";

import { useMutation } from "@tanstack/react-query";
import { notify } from "@/lib/notify";
import { createProduct } from "../../service/admin/product.service";

interface UseCreateProductOptions {
  onSuccess?: (data: any) => void;
}

export const useCreateProduct = (options?: UseCreateProductOptions) => {
  return useMutation({
    mutationFn: createProduct,
    onSuccess: (data) => {
      notify.success("Product created successfully!");
      options?.onSuccess?.(data);
    },
    onError: () => notify.error("Failed to create product"),
  });
};
