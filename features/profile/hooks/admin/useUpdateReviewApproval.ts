"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { updateReviewApproval } from "../../service/admin/general";
import { notify } from "@/lib/notify";

interface UseUpdateReviewApprovalOptions {
  onSuccess?: () => void;
}

export const useUpdateReviewApproval = (
  options?: UseUpdateReviewApprovalOptions,
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, isApproved }: { id: number; isApproved: boolean }) =>
      updateReviewApproval(id, isApproved),
    onSuccess: async (data, variables) => {
      notify.success(
        variables.isApproved
          ? "Review approved successfully!"
          : "Review rejected successfully!",
      );
      // Invalidate and refetch reviews to ensure fresh data
      await queryClient.invalidateQueries({ queryKey: ["admin-reviews"] });
      await queryClient.refetchQueries({ queryKey: ["admin-reviews"] });
      queryClient.invalidateQueries({
        queryKey: ["admin-review", variables.id],
      });
      options?.onSuccess?.();
    },
    onError: (error: AxiosError<any>) => {
      const errorMessage =
        error.response?.data?.message ||
        error.response?.data?.detail ||
        "Failed to update review approval status";
      notify.error(errorMessage);
    },
  });
};

