"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteProduct } from "../../service/admin/product.service";
import { notify } from "@/lib/notify";

interface UseDeleteProductOptions {
    onSuccess?: () => void;
}

export const useDeleteProduct = (options?: UseDeleteProductOptions) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: number) => deleteProduct(id),
        onSuccess: async () => {
            notify.success("Product deleted successfully!");
            await queryClient.invalidateQueries({ queryKey: ["products"] });
            options?.onSuccess?.();
        },
        onError: () => {
            // Axios interceptor handles error toast
        },
    });
};
