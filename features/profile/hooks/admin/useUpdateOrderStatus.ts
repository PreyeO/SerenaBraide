import { useMutation, useQueryClient } from "@tanstack/react-query";
import { notify } from "@/lib/notify";
import {
  updateOrderStatus,
  UpdateOrderStatusPayload,
} from "../../service/admin/order.service";

interface UseUpdateOrderStatusOptions {
  orderNumber: number;
  onSuccess?: () => void;
}

export const useUpdateOrderStatus = (options: UseUpdateOrderStatusOptions) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: UpdateOrderStatusPayload) =>
      updateOrderStatus(options.orderNumber, payload),
    onSuccess: () => {
      notify.success("Order status updated successfully!");
      queryClient.invalidateQueries({ queryKey: ["order-details", options.orderNumber] });
      queryClient.invalidateQueries({ queryKey: ["admin-orders"] });
      if (options.onSuccess) {
        options.onSuccess();
      }
    },
    onError: () => {
      notify.error("Failed to update order status");
    },
  });
};

