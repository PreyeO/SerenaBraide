import { useEffect, useState } from "react";
import { useOrderPayments } from "@/features/payment/hooks/useOrderPayments";
import { Order } from "../type/checkout.type";
import { isPaymentSuccessful } from "../utils/checkout.utils";

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
    }
  }, [orderData, payments, paymentStatusParam]);

  return { showSuccessModal, setShowSuccessModal };
}

