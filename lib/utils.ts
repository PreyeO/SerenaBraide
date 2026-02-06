import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export const effectiveDate = new Date().toLocaleDateString("en-US", {
  year: "numeric",
  month: "long",
  day: "numeric",
});

/**
 * Format a number or string as currency with commas and 2 decimal places
 * @param amount - The amount to format (number or string)
 * @param includeCurrency - Whether to include the ₦ symbol (default: true)
 * @returns Formatted string like "₦10,000.00" or "10,000.00"
 */
export const formatCurrency = (
  amount: number | string,
  includeCurrency: boolean = true
): string => {
  const numAmount = typeof amount === "string" ? parseFloat(amount) : amount;

  if (isNaN(numAmount)) {
    return includeCurrency ? "₦0.00" : "0.00";
  }

  const formatted = numAmount.toLocaleString("en-NG", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return includeCurrency ? `₦${formatted}` : formatted;
};

/**
 * @deprecated Use formatCurrency instead
 * Legacy function for backwards compatibility
 */
export const formatPrice = (price: string): string => {
  return formatCurrency(price, true);
};
