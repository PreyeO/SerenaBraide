"use client";

import { useRouter } from "next/navigation";
import { useCallback } from "react";

/**
 * Custom hook for table row navigation and actions
 */
export function useTableNavigation() {
  const router = useRouter();

  const navigateTo = useCallback(
    (path: string) => {
      router.push(path);
    },
    [router],
  );

  const navigateToCustomer = useCallback(
    (customerId: number | string) => {
      navigateTo(`/admin/customers/${customerId}`);
    },
    [navigateTo],
  );

  const navigateToOrder = useCallback(
    (orderNumber: number | string) => {
      navigateTo(`/admin/orders/${orderNumber}`);
    },
    [navigateTo],
  );

  const navigateToProduct = useCallback(
    (productId: number | string, section?: string) => {
      const path = section
        ? `/admin/products/${productId}/${section}`
        : `/admin/products/${productId}`;
      navigateTo(path);
    },
    [navigateTo],
  );

  return {
    navigateTo,
    navigateToCustomer,
    navigateToOrder,
    navigateToProduct,
  };
}
