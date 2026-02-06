import { BadgeCheckIcon, BookDown, CalendarClock } from "lucide-react";
import {
  FulfilmentType,
  Order,
  OrderInfo,
} from "../type/customers/profile.type";

/**
 * Maps backend status to frontend FulfilmentType
 */
function mapStatusToFulfilmentType(
  status: string,
): FulfilmentType {
  switch (status.toLowerCase()) {
    case "delivered":
      return "DELIVERED";
    case "pending":
      return "PROCESSING";
    case "paid":
      return "PROCESSING"; // Paid status = Processing in UI
    case "shipped":
      return "IN_TRANSIT"; // Shipped status = In Transit in UI
    case "processing":
      return "PROCESSING";
    case "in_transit":
    case "in-transit":
      return "IN_TRANSIT";
    default:
      return "PROCESSING";
  }
}

/**
 * Formats date to "Mar 27, 2025" format
 */
function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

/**
 * Formats number to NGN currency format
 */
function formatCurrency(amount: string | number): string {
  const num = typeof amount === "string" ? parseFloat(amount) : amount;
  return `NGN${num.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

/**
 * Gets status configuration (icon, color, title, actions)
 */
function getStatusConfig(
  statusType: FulfilmentType,
  deliveryDate?: string,
) {
  switch (statusType) {
    case "DELIVERED":
      const deliveredDate = deliveryDate
        ? formatDate(deliveryDate)
        : formatDate(new Date().toISOString());
      return {
        icon: BadgeCheckIcon,
        iconBg: "#01AD73",
        color: "#01AD73",
        title: `Delivered on ${deliveredDate}`,
        OrderAction1: "Buy Again",
        orderAction2: "Leave a review",
      };
    case "PROCESSING":
      return {
        icon: CalendarClock,
        iconBg: "#D97705",
        color: "#D97705",
        title: "Processing",
        OrderAction1: "Buy Again",
        orderAction2: "View Order",
      };
    case "IN_TRANSIT":
      return {
        icon: BookDown,
        iconBg: "#2F88FF",
        color: "#2F88FF",
        title: "In Transit",
        OrderAction1: "Buy Again",
        orderAction2: "View Order",
      };
  }
}

/**
 * Gets primary image from variant images array
 */
function getPrimaryImage(images: Array<{ image_url: string; is_primary: boolean }>): string {
  const primaryImage = images.find((img) => img.is_primary);
  return primaryImage?.image_url || images[0]?.image_url || "";
}

/**
 * Transforms an order item to OrderInfo format
 */
function transformOrderItemToOrderInfo(
  order: Order,
  item: Order["items"][0],
): OrderInfo {
  const statusType = mapStatusToFulfilmentType(order.status);
  // Use updated_at for delivered orders as delivery date, otherwise use created_at
  const deliveryDate =
    statusType === "DELIVERED" ? order.updated_at : undefined;
  const statusConfig = getStatusConfig(statusType, deliveryDate);
  const orderDate = formatDate(order.created_at);
  const primaryImage = getPrimaryImage(item.variant.images);

  return {
    id: item.id,
    orderNumberId: order.order_number,
    statusType,
    title: statusConfig.title,
    color: statusConfig.color,
    orderNumber: `Order #${order.order_number}`,
    productName: item.variant.product_name,
    src: primaryImage,
    alt: item.variant.images[0]?.alt_text || "product image",
    price: formatCurrency(item.price),
    size: item.variant.size || "N/A",
    quantity: `X${item.quantity}`,
    date: `Order date: ${orderDate}`,
    total: `Total: ${formatCurrency(order.total_amount)}`,
    extraInfo:
      parseFloat(order.shipping_cost) > 0
        ? "Shipping fee included"
        : "",
    icon: statusConfig.icon,
    iconBg: statusConfig.iconBg,
    OrderAction1: statusConfig.OrderAction1,
    orderAction2: statusConfig.orderAction2,
    productId: item.variant.product,
  };
}

/**
 * Transforms a gift card order to OrderInfo format
 */
function transformGiftCardOrderToOrderInfo(order: Order): OrderInfo {
  const statusType = mapStatusToFulfilmentType(order.status);
  const deliveryDate =
    statusType === "DELIVERED" ? order.updated_at : undefined;
  const statusConfig = getStatusConfig(statusType, deliveryDate);
  const orderDate = formatDate(order.created_at);

  // Gift card specific info
  const giftCard = order.purchased_gift_card!;
  const giftCardAmount = giftCard.initial_amount || order.subtotal;

  return {
    id: order.order_number, // Use order_number as unique id
    orderNumberId: order.order_number,
    statusType,
    title: statusConfig.title,
    color: statusConfig.color,
    orderNumber: `Order #${order.order_number}`,
    productName: "Gift Card",
    src: "", // Placeholder - backend doesn't return colour yet
    alt: "Gift Card",
    price: formatCurrency(giftCardAmount),
    size: "Digital",
    quantity: "X1",
    date: `Order date: ${orderDate}`,
    total: `Total: ${formatCurrency(order.total_amount)}`,
    extraInfo: "Digital delivery via email",
    icon: statusConfig.icon,
    iconBg: statusConfig.iconBg,
    OrderAction1: "Buy Again",
    orderAction2: "View Order",
    productId: undefined, // Gift cards don't have a product ID
    isGiftCard: true, // Flag to identify gift card orders
    giftCardNumber: giftCard.card_number,
  };
}

/**
 * Transforms orders API response to OrderInfo array
 * Flattens orders so each item becomes a separate OrderInfo entry
 * Also handles gift card orders that have no items but have purchased_gift_card
 */
export function transformOrdersToOrderInfo(orders: Order[]): OrderInfo[] {
  const orderInfoList: OrderInfo[] = [];

  for (const order of orders) {
    // Handle regular product orders
    for (const item of order.items) {
      orderInfoList.push(transformOrderItemToOrderInfo(order, item));
    }

    // Handle gift card orders (orders with no items but have purchased_gift_card)
    if (order.items.length === 0 && order.purchased_gift_card) {
      orderInfoList.push(transformGiftCardOrderToOrderInfo(order));
    }
  }

  return orderInfoList;
}
