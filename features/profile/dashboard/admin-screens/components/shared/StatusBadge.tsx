import { ReactNode } from "react";

export type BadgeVariant =
  | "pending"
  | "paid"
  | "processing"
  | "shipped"
  | "in_transit"
  | "delivered"
  | "success"
  | "error"
  | "warning"
  | "info"
  | "default";

interface StatusBadgeProps {
  variant: BadgeVariant | string;
  children: ReactNode;
  className?: string;
}

const variantStyles: Record<BadgeVariant, { bg: string; text: string }> = {
  pending: { bg: "bg-orange-100", text: "text-orange-700" },
  paid: { bg: "bg-blue-100", text: "text-blue-700" },
  processing: { bg: "bg-yellow-100", text: "text-yellow-700" },
  shipped: { bg: "bg-purple-100", text: "text-purple-700" },
  in_transit: { bg: "bg-indigo-100", text: "text-indigo-700" },
  delivered: { bg: "bg-green-100", text: "text-green-700" },
  success: { bg: "bg-green-100", text: "text-green-700" },
  error: { bg: "bg-red-100", text: "text-red-700" },
  warning: { bg: "bg-yellow-100", text: "text-yellow-700" },
  info: { bg: "bg-blue-100", text: "text-blue-700" },
  default: { bg: "bg-gray-100", text: "text-gray-700" },
};

export function StatusBadge({
  variant,
  children,
  className = "",
}: StatusBadgeProps) {
  const normalizedVariant = variant.toLowerCase() as BadgeVariant;
  const styles = variantStyles[normalizedVariant] || variantStyles.default;

  return (
    <span
      className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${styles.bg} ${styles.text} ${className}`}
    >
      {children}
    </span>
  );
}
