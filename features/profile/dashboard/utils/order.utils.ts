import { Order } from "@/features/profile/type/customers/profile.type";

/**
 * Calculate total quantity of items in an order
 */
export function calculateOrderTotalQuantity(order: Order): number {
  return order.items.reduce((total, item) => total + item.quantity, 0);
}

/**
 * Format order number with prefix
 */
export function formatOrderNumber(orderNumber: number | string): string {
  return `#${orderNumber}`;
}

/**
 * Get order status label
 */
export function getOrderStatusLabel(status: string): string {
  const statusLabels: Record<string, string> = {
    pending: "Pending",
    paid: "Paid",
    processing: "Processing",
    shipped: "Shipped",
    in_transit: "In Transit",
    delivered: "Delivered",
  };

  return statusLabels[status.toLowerCase()] || status;
}
