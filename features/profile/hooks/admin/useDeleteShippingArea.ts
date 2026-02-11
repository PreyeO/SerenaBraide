"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteShippingArea } from "../../service/admin/order.service";
import { notify } from "@/lib/notify";

interface UseDeleteShippingAreaOptions {
    onSuccess?: () => void;
}

export const useDeleteShippingArea = (options?: UseDeleteShippingAreaOptions) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: number) => deleteShippingArea(id),
        onSuccess: async () => {
            notify.success("Shipping area deleted successfully!");
            await queryClient.invalidateQueries({ queryKey: ["shipping-areas"] });
            options?.onSuccess?.();
        },
        onError: () => {
            // Axios interceptor handles error toast
        },
    });
};
