"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuthStore } from "@/features/auth/auth.store";
import { useOrderDetail } from "./useOrderDetail";
import { useCreateOrder } from "./useCreateOrder";
import { useInitiatePayment } from "@/features/payment/hooks/useInitiatePayment";
import { useUpdateOrderAddress } from "./useUpdateOrderAddress";
import { useCheckoutAddressStore } from "../store/checkout-address.store";
import { useApplyGiftCard } from "@/features/gift-card/hooks/useApplyGiftCard";
import { usePaymentStatusCheck } from "./usePaymentStatusCheck";
import { useOrderCalculations } from "./useOrderCalculations";
import { useGetAddresses } from "./useGetAddresses";
import { notify } from "@/lib/notify";
import { paymentType, PAYMENT_TYPES } from "../data/checkout.data";
import { BalanceFormValues } from "@/features/gift-card/giftcard.type";
import { GiftCardResponse } from "../type/checkout.type";

/**
 * Custom hook that manages all checkout-related state and logic.
 * Extracts business logic from CheckoutSection for better maintainability.
 */
export function useCheckout() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user, isHydrated } = useAuthStore();

  // UI State
  const [selectedPayment, setSelectedPayment] = useState<string>(
    paymentType[0].id,
  );
  const [showGiftCardModal, setShowGiftCardModal] = useState(false);
  const [showRemainingBalanceModal, setShowRemainingBalanceModal] =
    useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  // Open on mobile by default so items are visible without a tap. The list is
  // height-capped + scrollable (OrderSummaryCard), so a long order won't push
  // the rest of the checkout down.
  const [isMobileOrderExpanded, setIsMobileOrderExpanded] = useState(true);
  const [giftCardResponse, setGiftCardResponse] =
    useState<GiftCardResponse | null>(null);

  // URL Params
  const orderNumberParam = searchParams.get("order_number");
  const orderNumber = orderNumberParam ? parseInt(orderNumberParam, 10) : null;
  const paymentStatusParam = searchParams.get("status");
  const shippingAreaIdParam = searchParams.get("shippingAreaId");

  // Mutations
  const initiatePaymentMutation = useInitiatePayment();
  const updateOrderAddressMutation = useUpdateOrderAddress();
  const selectedAddressId = useCheckoutAddressStore(
    (state) => state.selectedAddressId,
  );
  const createOrderMutation = useCreateOrder({ redirectToCheckout: true });
  const hasAutoCreatedOrder = useRef(false);
  const hasHandledCancelledPayment = useRef(false);

  // Fetch order details
  const { data: orderData, isLoading: isLoadingOrder } =
    useOrderDetail(orderNumber);

  // Whether the customer has a saved delivery address. Payment is gated on this
  // so nobody can pay without somewhere to ship to.
  const { data: addresses } = useGetAddresses();
  const hasAddress = (addresses?.length ?? 0) > 0;

  // Payment status check
  const { showSuccessModal, setShowSuccessModal } = usePaymentStatusCheck({
    orderNumber,
    orderData,
    paymentStatusParam,
  });

  // Order calculations
  const { orderItems, totalQuantity, totalPrice, subtotal, shippingCost, tax } =
    useOrderCalculations(orderData);

  // Gift card mutation with callbacks
  const applyGiftCardMutation = useApplyGiftCard({
    onSuccess: (response) => {
      if (parseFloat(response.remaining_amount) > 0) {
        setGiftCardResponse({
          remaining_amount: response.remaining_amount,
          gift_card_amount: response.gift_card_amount,
          gift_card_balance: response.gift_card_balance,
        });
        setShowGiftCardModal(false);
        setShowPaymentModal(false);
        setShowRemainingBalanceModal(true);
      } else {
        setShowGiftCardModal(false);
        setShowPaymentModal(false);
        setShowSuccessModal(true);
      }
    },
  });

  // Handle checkout entry
  useEffect(() => {
    if (!isHydrated || orderNumber || paymentStatusParam) {
      return;
    }

    // Arriving from auth with shippingAreaId — auto-create order
    if (shippingAreaIdParam && !hasAutoCreatedOrder.current) {
      hasAutoCreatedOrder.current = true;
      createOrderMutation.mutate({
        shipping_area_id: parseInt(shippingAreaIdParam),
      });
      return;
    }

    // No order_number, no shippingAreaId, no payment status — back to cart
    if (
      !shippingAreaIdParam &&
      !createOrderMutation.isPending &&
      !createOrderMutation.isSuccess
    ) {
      router.replace("/cart");
    }
  }, [
    isHydrated,
    orderNumber,
    paymentStatusParam,
    shippingAreaIdParam,
    router,
    createOrderMutation,
  ]);

  // Handle a cancelled or failed payment returning from Flutterwave.
  // Cancelling is a deliberate choice, not an error, so we acknowledge it,
  // strip the `status` param (so a refresh won't re-fire the message), then
  // keep the customer on this order's checkout to retry. If we have no order
  // context (e.g. the redirect dropped order_number), send them to their
  // orders, where the pending order shows with an "Awaiting payment" badge.
  useEffect(() => {
    if (!isHydrated || hasHandledCancelledPayment.current) return;
    if (!paymentStatusParam) return;

    const status = paymentStatusParam.toLowerCase();
    const isCancelled = status === "cancelled" || status === "canceled";
    const isFailed = status === "failed";
    if (!isCancelled && !isFailed) return; // success is handled elsewhere

    hasHandledCancelledPayment.current = true;

    notify.error(
      isCancelled
        ? "Payment was cancelled. You can try again when you're ready."
        : "Payment failed. Please try again.",
    );

    if (orderNumber) {
      router.replace(`/checkout?order_number=${orderNumber}`);
    } else {
      router.replace("/profile/order");
    }
  }, [isHydrated, paymentStatusParam, orderNumber, router]);

  // Block payment until a delivery address exists, and nudge the customer to
  // the shipping section so they can add one. Returns false when blocked.
  const ensureAddress = useCallback(() => {
    if (hasAddress) return true;
    notify.error("Please add a delivery address before you can pay.");
    document
      .getElementById("checkout-shipping-address")
      ?.scrollIntoView({ behavior: "smooth", block: "center" });
    return false;
  }, [hasAddress]);

  // Handlers
  const handleSubmit = useCallback(() => {
    const payment = paymentType.find((p) => p.id === selectedPayment);
    if (!payment) return;

    if (!user || !user.email_validated) {
      notify.error("Please log in to continue with payment.");
      const returnUrl = orderNumber
        ? `/checkout?order_number=${orderNumber}`
        : "/checkout";
      router.push(`/auth/login?return_url=${encodeURIComponent(returnUrl)}`);
      return;
    }

    if (!orderNumber) {
      notify.error("Order not found. Please try again.");
      return;
    }

    if (!ensureAddress()) return;

    // What to run once the order has the chosen address attached.
    const proceed = () => {
      if (selectedPayment === PAYMENT_TYPES.GIFT_CARD) {
        setShowPaymentModal(false);
        setShowGiftCardModal(true);
        return;
      }

      if (selectedPayment === PAYMENT_TYPES.FLUTTERWAVE) {
        initiatePaymentMutation.mutate({ orderNumber });
        return;
      }

      router.push(payment.href!);
    };

    // Attach the customer's selected delivery address to the order first; only
    // continue to payment if it succeeds, so we never pay against a wrong or
    // missing address. (Errors surface via the axios interceptor toast.)
    if (selectedAddressId) {
      updateOrderAddressMutation.mutate(
        { orderNumber, addressId: Number(selectedAddressId) },
        { onSuccess: proceed },
      );
    } else {
      proceed();
    }
  }, [
    selectedPayment,
    user,
    orderNumber,
    router,
    initiatePaymentMutation,
    ensureAddress,
    selectedAddressId,
    updateOrderAddressMutation,
  ]);

  const handleGiftCardSubmit = useCallback(
    (data: BalanceFormValues) => {
      if (!orderNumber) {
        notify.error("Order not found. Please try again.");
        return;
      }

      applyGiftCardMutation.mutate({
        orderNumber,
        payload: {
          card_number: data.card_number,
          pin: data.pin,
        },
      });
    },
    [orderNumber, applyGiftCardMutation],
  );

  const handlePayRemainingBalance = useCallback(() => {
    setShowRemainingBalanceModal(false);
    setSelectedPayment(PAYMENT_TYPES.FLUTTERWAVE);
    if (orderNumber) {
      initiatePaymentMutation.mutate({ orderNumber });
    }
  }, [orderNumber, initiatePaymentMutation]);

  const handleMobileContinue = useCallback(() => {
    if (!ensureAddress()) return;
    setShowPaymentModal(true);
  }, [ensureAddress]);

  const toggleMobileOrderExpanded = useCallback(() => {
    setIsMobileOrderExpanded((prev) => !prev);
  }, []);

  const closeGiftCardModal = useCallback(() => {
    setShowGiftCardModal(false);
  }, []);

  const closePaymentModal = useCallback(() => {
    setShowPaymentModal(false);
  }, []);

  const closeRemainingBalanceModal = useCallback(() => {
    setShowRemainingBalanceModal(false);
    setGiftCardResponse(null);
  }, []);

  return {
    // State
    selectedPayment,
    setSelectedPayment,
    orderNumber,
    orderData,
    orderItems,
    isLoadingOrder,
    totalQuantity,
    totalPrice,
    subtotal,
    shippingCost,
    tax,

    // Modal states
    showSuccessModal,
    showGiftCardModal,
    showRemainingBalanceModal,
    showPaymentModal,
    isMobileOrderExpanded,
    giftCardResponse,

    // Loading states
    isPaymentPending:
      initiatePaymentMutation.isPending || updateOrderAddressMutation.isPending,
    isGiftCardPending: applyGiftCardMutation.isPending,

    // Handlers
    handleSubmit,
    handleGiftCardSubmit,
    handlePayRemainingBalance,
    handleMobileContinue,
    toggleMobileOrderExpanded,
    closeGiftCardModal,
    closePaymentModal,
    closeRemainingBalanceModal,
  };
}
