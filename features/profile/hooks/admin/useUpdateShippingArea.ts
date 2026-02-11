"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateShippingArea, CreateShippingAreaPayload } from "../../service/admin/order.service";
import { notify } from "@/lib/notify";

interface UseUpdateShippingAreaOptions {
    onSuccess?: () => void;
}

export const useUpdateShippingArea = (options?: UseUpdateShippingAreaOptions) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, payload }: { id: number; payload: Partial<CreateShippingAreaPayload> }) =>
            updateShippingArea(id, payload),
        onSuccess: async () => {
            notify.success("Shipping area updated successfully!");
            await queryClient.invalidateQueries({ queryKey: ["shipping-areas"] });
            options?.onSuccess?.();
        },
        onError: () => {
            // Axios interceptor handles error toast
        },
    });
};
