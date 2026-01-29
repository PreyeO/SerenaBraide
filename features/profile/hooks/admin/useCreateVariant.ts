"use client";

import { useMutation } from "@tanstack/react-query";
import { notify } from "@/lib/notify";
import { createVariant } from "../../service/admin/product.service";

export const useCreateVariant = () => {
  return useMutation({
    mutationFn: ({ productId, data }: { productId: number; data: Parameters<typeof createVariant>[1] }) =>
      createVariant(productId, data),
    onSuccess: () => notify.success("Variant created successfully!"),
    onError: () => notify.error("Failed to create variant"),
  });
};










