import { useEffect, useState } from "react";
import { useOrderPayments } from "@/features/payment/hooks/useOrderPayments";
import { Order } from "../type/checkout.type";
import { isPaymentSuccessful } from "../utils/checkout.utils";
import { trackPurchase } from "@/lib/analytics/pixel-events";

interface UsePaymentStatusCheckProps {
  orderNumber: number | null;
  orderData: Order | null | undefined;
  paymentStatusParam: string | null;
}

/**
 * Custom hook to check payment status and show success modal
 */
export function usePaymentStatusCheck({
  orderNumber,
  orderData,
  paymentStatusParam,
}: UsePaymentStatusCheckProps) {
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const { data: payments } = useOrderPayments(orderNumber);

  useEffect(() => {
    const isSuccessful = isPaymentSuccessful(
      paymentStatusParam,
      payments,
      orderData?.status
    );

    if (isSuccessful) {
      setShowSuccessModal(true);

      // Meta Purchase — the event ad spend is optimised against. It needs the
      // order for its line items and value, so it waits for orderData to arrive
      // (this effect re-runs when it does). trackPurchase is deduped by order
      // number, so the wait, a re-render, or a page refresh can't double-count.
      if (orderData) trackPurchase(orderData);
    }
  }, [orderData, payments, paymentStatusParam]);

  return { showSuccessModal, setShowSuccessModal };
}

