"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteAdminProfile } from "../../service/admin/general";
import { notify } from "@/lib/notify";

interface UseDeleteStaffOptions {
    onSuccess?: () => void;
}

export const useDeleteStaff = (options?: UseDeleteStaffOptions) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: number) => deleteAdminProfile(id),
        onSuccess: async () => {
            notify.success("Staff member deleted successfully!");
            await queryClient.invalidateQueries({ queryKey: ["admin-profiles"] });
            options?.onSuccess?.();
        },
        onError: () => {
            // Axios interceptor handles error toast
        },
    });
};
