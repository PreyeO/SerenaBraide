/**
 * Sale ("was") price display rules — one place, used by cards, the product page
 * and the cart.
 *
 * The backend's compare_at_price is display-only: checkout always charges the
 * selling price (effective_price). We only ever show a crossed-out price when
 * it is genuinely higher than what the customer will pay, so a stale or
 * mistyped value can never produce a fake "was" price.
 */

type PriceInput = string | number | null | undefined;

export interface SaleInfo {
  /** The "was" price to show crossed out. */
  compareAt: number;
  /** Whole-number discount for a "-20%" badge; omitted when not exact. */
  percentOff?: number;
}

/** "88000.00" → {low: 88000, high: 88000}; "9000.00 - 16000.00" → {9000, 16000}. */
function parseRange(value: PriceInput): { low: number; high: number } | null {
  if (value === null || value === undefined || value === "") return null;
  const parts = String(value)
    .split("-")
    .map((p) => parseFloat(p.trim()))
    .filter((n) => !isNaN(n));
  if (!parts.length) return null;
  return { low: Math.min(...parts), high: Math.max(...parts) };
}

function percentOff(price: number, compareAt: number): number {
  return Math.round((1 - price / compareAt) * 100);
}

/** One price against one "was" price — a specific size/variant, or the cart. */
export function getSaleInfo(price: PriceInput, compareAt: PriceInput): SaleInfo | null {
  const p = parseRange(price);
  const c = parseRange(compareAt);
  if (!p || !c || p.low <= 0 || c.low <= p.low) return null;
  return { compareAt: c.low, percentOff: percentOff(p.low, c.low) };
}

/**
 * Product cards, which only know price ranges across all sizes.
 *
 * The backend's compare_at_price_range only covers sizes that have a "was"
 * price, while price_range covers every size — so with mixed sizes the two
 * ranges may not line up. We therefore only show a sale on a card when:
 *  - the product has a single price and a single "was" price above it, or
 *  - both are ranges and the whole "was" range sits above the price range.
 * Anything else shows the plain price on the card; the product page still
 * shows the exact sale per size.
 */
export function getListSaleInfo(
  priceRange: PriceInput,
  compareAtRange: PriceInput,
): SaleInfo | null {
  const p = parseRange(priceRange);
  const c = parseRange(compareAtRange);
  if (!p || !c || p.low <= 0) return null;

  const priceIsSingle = p.low === p.high;
  const compareIsSingle = c.low === c.high;

  if (priceIsSingle && compareIsSingle && c.low > p.low) {
    return { compareAt: c.low, percentOff: percentOff(p.low, c.low) };
  }
  if (!priceIsSingle && !compareIsSingle && c.low > p.low && c.high > p.high) {
    // Card shows the lowest price, so cross out the lowest "was" price. The
    // per-size discount may differ, so no percentage badge here.
    return { compareAt: c.low };
  }
  return null;
}
