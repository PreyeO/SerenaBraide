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

export const formatCurrency = (
  amount: number | string,
  includeCurrency: boolean = true,
): string => {
  const numAmount = typeof amount === "string" ? parseFloat(amount) : amount;

  if (isNaN(numAmount)) {
    return includeCurrency ? "₦0" : "0";
  }

  const formatted = numAmount.toLocaleString("en-NG", {
    maximumFractionDigits: 0,
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
