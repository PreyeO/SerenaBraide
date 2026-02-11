"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteVariant } from "../../service/admin/product.service";
import { notify } from "@/lib/notify";

interface UseDeleteVariantOptions {
    onSuccess?: () => void;
}

export const useDeleteVariant = (options?: UseDeleteVariantOptions) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({
            productId,
            variantId,
        }: {
            productId: number;
            variantId: number;
        }) => deleteVariant(productId, variantId),
        onSuccess: async (_data, variables) => {
            notify.success("Variant deleted successfully!");
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
