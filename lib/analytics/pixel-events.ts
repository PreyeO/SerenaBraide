// lib/analytics/pixel-events.ts
/**
 * Store-level Meta Pixel events.
 *
 * Holds the mapping from our domain objects (products, cart items, orders) to
 * Meta's parameter shape in one place, so every event reports content IDs,
 * currency and value the same way. Ads Manager can only optimise for a funnel
 * whose steps agree with each other.
 */

import { CartItem, CartVariant } from "@/features/cart-checkout/type/cart.type";
import { Order } from "@/features/cart-checkout/type/checkout.type";
import { ProductDetail, Variant } from "@/features/products/product.type";
import {
  PIXEL_CURRENCY,
  PixelContent,
  PixelEvent,
  pixelTrack,
  pixelTrackOnce,
} from "./meta-pixel";

/** Anything with the identity fields we need to build a content ID. */
type IdentifiableVariant = Pick<Variant | CartVariant, "id" | "sku">;

/**
 * Meta matches events to catalogue entries by content ID, so every event has to
 * use the same identifier for the same thing. Variants are what customers
 * actually buy, and SKU is their stable retail identifier — the variant's
 * primary key is only a fallback for the case where a SKU is missing.
 *
 * If a product catalogue is later uploaded to Meta, its `id` column must be
 * these same SKUs or none of this will match.
 */
function contentId(variant: IdentifiableVariant): string {
  return variant.sku?.trim() || String(variant.id);
}

/** Prices come off the API as strings; never hand Meta a NaN. */
function toAmount(value: string | number | null | undefined): number {
  const amount = typeof value === "number" ? value : parseFloat(value ?? "");
  return Number.isFinite(amount) ? amount : 0;
}

/**
 * Placeholder content ID for a gift card, which is not a catalogue product.
 */
const GIFT_CARD_CONTENT_ID = "GIFT_CARD";

/**
 * An order's line items in Meta's shape.
 *
 * Gift card orders carry no product lines, so they fall back to a single
 * placeholder entry: an order reported with empty `contents` reaches Ads Manager
 * as a zero-item conversion, which is no use for optimisation and drags the
 * reported average order value down.
 */
function orderContents(order: Order): PixelContent[] {
  const items = order.items ?? [];

  if (items.length === 0) {
    return [
      {
        id: GIFT_CARD_CONTENT_ID,
        quantity: 1,
        item_price: toAmount(order.total_amount),
      },
    ];
  }

  return items.map((item) => ({
    id: contentId(item.variant),
    quantity: item.quantity,
    item_price: toAmount(item.price),
  }));
}

/** Total units in an order, falling back to the line count for gift cards. */
function orderItemCount(order: Order, contents: PixelContent[]): number {
  return order.items_count || contents.length;
}

/**
 * Customer opened a product page.
 *
 * Reported against the variant on show, so retargeting can bring them back to
 * the exact size/shade they were looking at.
 */
export function trackViewContent(
  product: ProductDetail,
  variant: Variant | null,
): void {
  pixelTrack(PixelEvent.ViewContent, {
    content_ids: [variant ? contentId(variant) : String(product.id)],
    content_name: product.name,
    content_type: "product",
    content_category: product.category_name,
    currency: PIXEL_CURRENCY,
    value: toAmount(variant?.effective_price ?? product.base_price),
  });
}

/**
 * Customer added something to the cart.
 *
 * `quantity` is what was just added, not the line's new total — the API returns
 * the whole cart line, so reporting its subtotal would overstate every add to an
 * item the customer already had.
 */
export function trackAddToCart(item: CartItem, quantity: number = 1): void {
  const id = contentId(item.variant);
  const unitPrice = toAmount(item.variant.effective_price);

  pixelTrack(PixelEvent.AddToCart, {
    content_ids: [id],
    content_name: item.variant.product_name,
    content_type: "product",
    contents: [{ id, quantity, item_price: unitPrice }],
    currency: PIXEL_CURRENCY,
    value: unitPrice * quantity,
  });
}

/**
 * Customer committed to checking out — fired on the cart's proceed action,
 * before the login/verification detour, because the intent is real either way.
 */
export function trackInitiateCheckout(
  items: CartItem[],
  value: number,
): void {
  const contents = items.map<PixelContent>((item) => ({
    id: contentId(item.variant),
    quantity: item.quantity,
    item_price: toAmount(item.variant.effective_price),
  }));

  pixelTrack(PixelEvent.InitiateCheckout, {
    content_ids: contents.map((content) => content.id),
    content_type: "product",
    contents,
    currency: PIXEL_CURRENCY,
    value: toAmount(value),
    num_items: items.reduce((sum, item) => sum + item.quantity, 0),
  });
}

/** Customer picked a payment method and set payment in motion. */
export function trackAddPaymentInfo(order: Order): void {
  const contents = orderContents(order);

  pixelTrack(PixelEvent.AddPaymentInfo, {
    content_ids: contents.map((content) => content.id),
    content_type: "product",
    contents,
    currency: PIXEL_CURRENCY,
    value: toAmount(order.total_amount),
    num_items: orderItemCount(order, contents),
    order_id: String(order.order_number),
  });
}

/**
 * Payment succeeded. This is the event ad spend is optimised against, so it is
 * deduplicated hard: once per order number per session, plus an `eventID` Meta
 * can use to drop repeats it sees from anywhere else.
 *
 * Handles gift card orders too — one dedupe namespace covers every route to a
 * paid order (card, gift card, part-and-part), so an order can only ever be
 * counted once.
 */
export function trackPurchase(order: Order): void {
  pixelTrackOnce(`purchase_${order.order_number}`, () => {
    const contents = orderContents(order);

    pixelTrack(
      PixelEvent.Purchase,
      {
        content_ids: contents.map((content) => content.id),
        content_type: "product",
        contents,
        currency: PIXEL_CURRENCY,
        value: toAmount(order.total_amount),
        num_items: orderItemCount(order, contents),
        order_id: String(order.order_number),
      },
      `order_${order.order_number}`,
    );
  });
}

/** Customer searched the catalogue. */
export function trackSearch(query: string): void {
  const search = query.trim();
  if (!search) return;

  pixelTrack(PixelEvent.Search, {
    search_string: search,
    content_type: "product",
  });
}

/** A new account was created. */
export function trackCompleteRegistration(): void {
  pixelTrack(PixelEvent.CompleteRegistration, {
    currency: PIXEL_CURRENCY,
  });
}

/** Someone sent the contact form. */
export function trackContact(): void {
  pixelTrack(PixelEvent.Contact);
}
