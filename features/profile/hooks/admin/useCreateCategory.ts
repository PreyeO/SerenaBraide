import { useMutation, useQueryClient } from "@tanstack/react-query";
import { notify } from "@/lib/notify";
import { createCategory } from "../../service/admin/product.service";

export const useCreateCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createCategory,
    onSuccess: () => {
      notify.success("Category created successfully!");
      queryClient.invalidateQueries({ queryKey: ["categories"] }); // <- refetch categories
    },
    onError: () => notify.error("Failed to create category"),
  });
};
