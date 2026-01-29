import { Order } from "../type/checkout.type";
import { PaymentResponse } from "@/features/payment/payment.type";

/**
 * Get primary image from variant images array
 * Falls back to first image if no primary image found
 */
export function getOrderItemImage(
  images: Array<{ image_url: string; is_primary: boolean }>,
  fallback: string = "/cart-placeholder.png"
): string {
  const primaryImage = images.find((img) => img.is_primary);
  return primaryImage?.image_url ?? images[0]?.image_url ?? fallback;
}

/**
 * Calculate order totals from order data
 */
export function calculateOrderTotals(orderData: Order | null | undefined) {
  const orderItems = orderData?.items ?? [];
  const totalQuantity =
    orderData?.items_count ??
    orderItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = orderData?.total_amount
    ? parseFloat(orderData.total_amount)
    : 0;
  const subtotal = orderData?.subtotal ? parseFloat(orderData.subtotal) : 0;
  const shippingCost = orderData?.shipping_cost
    ? parseFloat(orderData.shipping_cost)
    : 0;
  const tax = orderData?.tax ? parseFloat(orderData.tax) : 0;

  return {
    orderItems,
    totalQuantity,
    totalPrice,
    subtotal,
    shippingCost,
    tax,
  };
}

/**
 * Check if payment is successful based on URL params, payment data, or order status
 */
export function isPaymentSuccessful(
  paymentStatusParam: string | null,
  payments: PaymentResponse[] | undefined,
  orderStatus: string | null | undefined
): boolean {
  // Check URL params first (from Flutterwave redirect)
  if (paymentStatusParam === "successful" || paymentStatusParam === "success") {
    return true;
  }

  // Check payment status from API
  if (payments && payments.length > 0) {
    const latestPayment = payments[payments.length - 1];
    const paymentStatus = latestPayment.status.toLowerCase();
    if (
      paymentStatus === "successful" ||
      paymentStatus === "completed" ||
      (latestPayment.redirect_verified === true &&
        latestPayment.amount_paid !== null)
    ) {
      return true;
    }
  }

  // Fallback: Check order status
  if (orderStatus) {
    const status = orderStatus.toLowerCase();
    if (status === "paid" || status === "completed") {
      return true;
    }
  }

  return false;
}

/**
 * Get meta label for order item (size or color)
 */
export function getOrderItemMetaLabel(
  size: string | null | undefined,
  color: string | null | undefined
): string {
  if (size) return `Size: ${size}`;
  if (color) return `Color: ${color}`;
  return "";
}

