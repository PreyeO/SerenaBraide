import { useMemo } from "react";
import { Order } from "../type/checkout.type";
import { calculateOrderTotals } from "../utils/checkout.utils";

/**
 * Custom hook to calculate order totals from order data
 */
export function useOrderCalculations(orderData: Order | null | undefined) {
  return useMemo(() => {
    return calculateOrderTotals(orderData);
  }, [orderData]);
}

