// lib/analytics/google-analytics.ts
/**
 * Typed wrapper around Google Analytics 4's `gtag`.
 *
 * Same contract as the Meta and TikTok wrappers: every helper is a safe no-op
 * when GA isn't loaded, and swallows its own errors, so analytics can never
 * break a page or a checkout.
 */

/** Set as NEXT_PUBLIC_GA_MEASUREMENT_ID. Empty means GA is switched off. */
export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID ?? "";

export interface GaItem {
  item_id: string;
  item_name: string;
  item_category?: string;
  price: number;
  quantity: number;
}

export interface GaEventParams {
  currency?: string;
  value?: number;
  items?: GaItem[];
  transaction_id?: string;
  shipping?: number;
  tax?: number;
  search_term?: string;
  method?: string;
  page_location?: string;
}

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

export function isGaReady(): boolean {
  return (
    Boolean(GA_MEASUREMENT_ID) &&
    typeof window !== "undefined" &&
    typeof window.gtag === "function"
  );
}

export function gaEvent(name: string, params: GaEventParams = {}): void {
  if (!isGaReady()) return;
  try {
    window.gtag!("event", name, params);
  } catch {
    /* never let a tracking failure surface to the customer */
  }
}

/**
 * The current URL with anything identifying stripped out.
 *
 * Some pages carry the customer's email in the query string (password reset).
 * Google's terms forbid sending it, so any `email` param — or any value that
 * looks like an email — is dropped. Everything else, including `utm_*`, is
 * kept: GA reads traffic sources from those.
 */
export function redactedLocation(): string {
  const url = new URL(window.location.href);
  for (const [key, value] of [...url.searchParams.entries()]) {
    if (key.toLowerCase().includes("email") || value.includes("@")) {
      url.searchParams.delete(key);
    }
  }
  return url.toString();
}

export function gaPageView(): void {
  if (!isGaReady()) return;
  try {
    const location = redactedLocation();
    // Also set it as the default, so the automatic events that follow on this
    // page (scrolls, outbound clicks) carry the redacted URL too.
    window.gtag!("set", { page_location: location });
    window.gtag!("event", "page_view", { page_location: location });
  } catch {
    /* as above */
  }
}
