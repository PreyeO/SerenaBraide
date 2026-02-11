"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createShippingArea } from "../../service/admin/order.service";
import { notify } from "@/lib/notify";

interface UseCreateShippingAreaOptions {
    onSuccess?: () => void;
}

export const useCreateShippingArea = (options?: UseCreateShippingAreaOptions) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: createShippingArea,
        onSuccess: async () => {
            notify.success("Shipping area created successfully!");
            await queryClient.invalidateQueries({ queryKey: ["shipping-areas"] });
            options?.onSuccess?.();
        },
        onError: () => {
            // Axios interceptor handles error toast
        },
    });
};
