"use client";

import { useMutation } from "@tanstack/react-query";
import { notify } from "@/lib/notify";
import { createProduct } from "../../service/admin/product.service";

export const useCreateProduct = () => {
  return useMutation({
    mutationFn: createProduct,
    onSuccess: () => notify.success("Product created successfully!"),
    onError: () => notify.error("Failed to create product"),
  });
};
