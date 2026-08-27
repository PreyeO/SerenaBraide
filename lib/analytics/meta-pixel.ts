// lib/analytics/meta-pixel.ts
/**
 * Typed wrapper around Meta's `fbq` (the Facebook Pixel).
 *
 * Every helper here is a safe no-op when the pixel isn't available — no env var
 * set, server render, ad blocker, or the script still in flight — so callers can
 * fire events without guarding. Tracking must never break a checkout.
 */

/** Set as NEXT_PUBLIC_META_PIXEL_ID. Empty means the pixel is switched off. */
export const META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID ?? "";

/** The store prices and charges in Naira, so every event value is NGN. */
export const PIXEL_CURRENCY = "NGN";

/** Meta's standard events — only the ones this store actually fires. */
export const PixelEvent = {
  PageView: "PageView",
  ViewContent: "ViewContent",
  Search: "Search",
  AddToCart: "AddToCart",
  InitiateCheckout: "InitiateCheckout",
  AddPaymentInfo: "AddPaymentInfo",
  Purchase: "Purchase",
  CompleteRegistration: "CompleteRegistration",
  Contact: "Contact",
} as const;

export type PixelEventName = (typeof PixelEvent)[keyof typeof PixelEvent];

/** One line item, in the shape Meta expects inside `contents`. */
export interface PixelContent {
  id: string;
  quantity: number;
  item_price: number;
}

export interface PixelEventParams {
  content_ids?: string[];
  content_name?: string;
  content_type?: "product" | "product_group";
  content_category?: string;
  contents?: PixelContent[];
  currency?: string;
  value?: number;
  num_items?: number;
  search_string?: string;
  order_id?: string;
}

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

/** True once the base code has run and `fbq` is callable. */
export function isPixelReady(): boolean {
  return (
    Boolean(META_PIXEL_ID) &&
    typeof window !== "undefined" &&
    typeof window.fbq === "function"
  );
}

/**
 * Fire a standard Meta event.
 *
 * `eventId` is Meta's deduplication key. It stops one conversion being counted
 * twice, and lets a server-side Conversions API event be matched to this browser
 * event later without inflating the numbers.
 */
export function pixelTrack(
  event: PixelEventName,
  params: PixelEventParams = {},
  eventId?: string,
): void {
  if (!isPixelReady()) return;

  try {
    if (eventId) {
      window.fbq!("track", event, params, { eventID: eventId });
    } else {
      window.fbq!("track", event, params);
    }
  } catch {
    /* never let a tracking failure surface to the customer */
  }
}

/**
 * Run `fire` only the first time `key` is seen in this browser session.
 *
 * Purchase is the case that matters: checkout detects success from a URL param,
 * so a refresh or an extra render would otherwise report the same order again.
 * If sessionStorage is unavailable (private mode) we fire anyway — an occasional
 * duplicate beats silently losing every conversion.
 */
export function pixelTrackOnce(key: string, fire: () => void): void {
  if (typeof window === "undefined") return;

  const storageKey = `sb_pixel_${key}`;
  try {
    if (window.sessionStorage.getItem(storageKey)) return;
    window.sessionStorage.setItem(storageKey, "1");
  } catch {
    /* storage blocked — fall through and fire rather than drop the event */
  }

  fire();
}
