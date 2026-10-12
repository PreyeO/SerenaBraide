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

/**
 * Customer details for Meta's advanced matching, normalised the way Meta asks
 * (lowercase, no spaces, phone as digits with country code). The pixel hashes
 * these in the browser before sending — they never leave as plain text.
 */
export interface PixelUserData {
  em?: string;
  ph?: string;
  fn?: string;
  ln?: string;
  ct?: string;
  country?: string;
  external_id?: string;
}

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
    // Read by the base code's init, for when the customer is known before the
    // pixel script runs.
    __sbPixelUserData?: PixelUserData;
  }
}

interface MatchableUser {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  phone_number: string | null;
  country: string;
  city: string | null;
}

const lower = (value?: string | null) => value?.trim().toLowerCase() || undefined;

// Meta wants digits only, including the country code. Local Nigerian numbers
// (0XXXXXXXXXX) are rewritten to 234XXXXXXXXXX.
function normalisePhone(phone: string | null): string | undefined {
  const digits = phone?.replace(/\D/g, "") ?? "";
  if (!digits) return undefined;
  if (digits.startsWith("0") && digits.length === 11) return `234${digits.slice(1)}`;
  return digits;
}

// Date of birth is deliberately left out: the signup form only asks for month
// and day and fills in the current year, so it would hand Meta a wrong year.
export function buildPixelUserData(user: MatchableUser): PixelUserData {
  return {
    em: lower(user.email),
    ph: normalisePhone(user.phone_number),
    fn: lower(user.first_name),
    ln: lower(user.last_name),
    ct: lower(user.city)?.replace(/\s+/g, ""),
    country: lower(user.country),
    external_id: String(user.id),
  };
}

/**
 * Attach the customer's details to every event from here on. Re-running init
 * with user data is how Meta takes advanced matching after the pixel has
 * already loaded (e.g. right after login or signup).
 */
export function pixelSetUserData(userData: PixelUserData): void {
  if (typeof window === "undefined") return;
  window.__sbPixelUserData = userData;
  if (!isPixelReady()) return;

  try {
    window.fbq!("init", META_PIXEL_ID, userData);
  } catch {
    /* never let a tracking failure surface to the customer */
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
