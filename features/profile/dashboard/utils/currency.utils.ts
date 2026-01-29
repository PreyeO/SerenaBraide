/**
 * Format number as Nigerian Naira currency
 */
export function formatNaira(amount: number | string): string {
  const numericAmount =
    typeof amount === "string" ? parseFloat(amount) : amount;
  return `₦${numericAmount.toLocaleString()}`;
}

/**
 * Format number as currency with custom symbol
 */
export function formatCurrency(
  amount: number | string,
  symbol: string = "₦",
): string {
  const numericAmount =
    typeof amount === "string" ? parseFloat(amount) : amount;
  return `${symbol}${numericAmount.toLocaleString()}`;
}

/**
 * Parse currency string to number
 */
export function parseCurrency(currencyString: string): number {
  const cleaned = currencyString.replace(/[^0-9.-]+/g, "");
  return parseFloat(cleaned) || 0;
}
