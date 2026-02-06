import { useMutation, useQueryClient } from "@tanstack/react-query";
import { notify } from "@/lib/notify";
import { createCategory } from "../../service/admin/product.service";
import { AxiosError } from "axios";

export const useCreateCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createCategory,
    onSuccess: async () => {
      notify.success("Category created successfully!");
      // Invalidate and refetch categories to show the newly created category
      await queryClient.invalidateQueries({ queryKey: ["categories"] });
      // Explicitly refetch to ensure the dropdown updates
      await queryClient.refetchQueries({ queryKey: ["categories"] });
    },
    onError: () => {
      // Axios interceptor handles error toast
    },
  });
};
