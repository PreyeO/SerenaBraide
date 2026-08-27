// features/payment/payment.constants.ts

/**
 * Where the order number is stashed before the customer is handed to
 * Flutterwave, and recovered from when they come back.
 *
 * Two things make this necessary: Flutterwave's redirect doesn't reliably carry
 * `order_number`, and the return trip is a full page load, which wipes anything
 * held only in memory. Without the stash a customer who has already paid can
 * land back on the site with no way to identify their own order.
 *
 * Written by useInitiatePayment; read by the product checkout (useCheckout) and
 * the gift card checkout.
 */
export const PENDING_ORDER_NUMBER_KEY = "sb_pending_order_number";
