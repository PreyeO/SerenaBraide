// lib/analytics/tiktok-pixel.ts
/**
 * Typed wrapper around TikTok's `ttq`.
 *
 * This is deliberately a mirror of `meta-pixel.ts` rather than a shared
 * abstraction over both. The Meta pixel is live against real ad spend, and
 * keeping the platforms in separate files means nothing done here can regress it.
 * The two are worth consolidating once TikTok has run cleanly for a while — as
 * its own change, verified on its own.
 *
 * Every helper no-ops when the pixel isn't available and swallows its own errors,
 * so a TikTok failure can never reach a customer, and never interrupts the Meta
 * call that always fires before it.
 */

/** Set as NEXT_PUBLIC_TIKTOK_PIXEL_ID. Empty means TikTok is switched off. */
export const TIKTOK_PIXEL_ID = process.env.NEXT_PUBLIC_TIKTOK_PIXEL_ID ?? "";

/**
 * TikTok's standard events — only the ones this store fires.
 *
 * Note `CompletePayment`: TikTok has no `Purchase` event, and sending one is a
 * common reason a pixel appears installed but reports no conversions.
 */
export const TikTokEvent = {
  ViewContent: "ViewContent",
  Search: "Search",
  AddToCart: "AddToCart",
  InitiateCheckout: "InitiateCheckout",
  AddPaymentInfo: "AddPaymentInfo",
  CompletePayment: "CompletePayment",
  CompleteRegistration: "CompleteRegistration",
  Contact: "Contact",
} as const;

export type TikTokEventName = (typeof TikTokEvent)[keyof typeof TikTokEvent];

/**
 * One line item in TikTok's shape.
 *
 * `content_id` and `price`, where Meta uses `id` and `item_price`. Handing Meta's
 * shape to TikTok doesn't error — it reports a conversion with no value, which is
 * worse than failing loudly.
 */
export interface TikTokContent {
  content_id: string;
  content_type: "product";
  content_name?: string;
  quantity: number;
  price: number;
}

export interface TikTokEventProperties {
  contents?: TikTokContent[];
  content_type?: "product";
  content_name?: string;
  currency?: string;
  value?: number;
  query?: string;
}

declare global {
  interface Window {
    ttq?: {
      page: (...args: unknown[]) => void;
      track: (...args: unknown[]) => void;
    };
    TiktokAnalyticsObject?: string;
  }
}

/**
 * True once the base code has run and `ttq` is callable.
 *
 * The loader defines its methods synchronously and queues calls made before
 * `events.js` finishes downloading, so this goes true as soon as the snippet
 * executes — nothing is lost in the gap.
 */
export function isTikTokReady(): boolean {
  return (
    Boolean(TIKTOK_PIXEL_ID) &&
    typeof window !== "undefined" &&
    typeof window.ttq?.track === "function"
  );
}

/**
 * Fire a standard TikTok event.
 *
 * `eventId` is TikTok's deduplication key — `event_id`, not Meta's `eventID`. It
 * stops one conversion being counted twice and leaves the door open to the
 * Events API later without inflating numbers.
 */
export function tiktokTrack(
  event: TikTokEventName,
  properties: TikTokEventProperties = {},
  eventId?: string,
): void {
  if (!isTikTokReady()) return;

  try {
    if (eventId) {
      window.ttq!.track(event, properties, { event_id: eventId });
    } else {
      window.ttq!.track(event, properties);
    }
  } catch {
    /* never let a tracking failure surface to the customer */
  }
}

/** TikTok reports page views through `ttq.page()`, not a tracked event. */
export function tiktokPageView(): void {
  if (!isTikTokReady()) return;

  try {
    window.ttq!.page();
  } catch {
    /* as above */
  }
}
