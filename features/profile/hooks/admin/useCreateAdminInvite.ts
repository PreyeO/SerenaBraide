"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { createAdminInvite } from "../../service/admin/general";
import { CreateStaffInvitePayload } from "../../type/admin/general.type";
import { notify } from "@/lib/notify";

interface UseCreateAdminInviteOptions {
  onSuccess?: () => void;
}

export const useCreateAdminInvite = (
  options?: UseCreateAdminInviteOptions,
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateStaffInvitePayload) => createAdminInvite(data),
    onSuccess: () => {
      notify.success("Invitation sent successfully!");
      // Invalidate and refetch staff list
      queryClient.invalidateQueries({ queryKey: ["staff"] });
      options?.onSuccess?.();
    },
    onError: () => {
      // Axios interceptor handles error toast
    },
  });
};

