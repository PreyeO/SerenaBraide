"use client";

import BackNavigation from "@/components/ui/btns/back-navigation";
import React, { useState, useEffect, useMemo } from "react";

import { useGiftCardStore } from "../giftcard.store";
import { useRouter } from "next/navigation";
import PaymentMethodSection from "@/features/cart-checkout/shared/PaymentMethodSection";
import { paymentType } from "@/features/cart-checkout/data/checkout.data";
import { useInitiatePayment } from "@/features/payment/hooks/useInitiatePayment";
import { PENDING_ORDER_NUMBER_KEY } from "@/features/payment/payment.constants";
import { useOrderPayments } from "@/features/payment/hooks/useOrderPayments";
import { notify } from "@/lib/notify";
import { useAuthStore } from "@/features/auth/auth.store";
import { useOrderDetail } from "@/features/cart-checkout/hooks/useOrderDetail";
import { useSearchParams } from "next/navigation";
import SuccessModal from "@/components/ui/modals/sucess";
import { formatCurrency } from "@/lib/utils";
import SimpleOrderSummary from "@/features/cart-checkout/shared/SimpleOrderSummary";
import {
  trackAddPaymentInfo,
  trackPurchase,
} from "@/lib/analytics/pixel-events";

const GiftCardCheckout = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { giftCardData } = useGiftCardStore();
  const { user } = useAuthStore();
  const [selectedPayment, setSelectedPayment] = useState<string>(
    paymentType[0].id,
  );
  const initiatePaymentMutation = useInitiatePayment();
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  // Check for payment success in URL params (from Flutterwave redirect)
  const paymentStatusParam = searchParams.get("status");

  // Coming back from Flutterwave is a full page load, and the gift card store
  // only lives in memory — so by the time the customer lands here their card
  // details are gone and we no longer know which order they just paid for.
  // Recover the order number that useInitiatePayment stashed on the way out.
  // Without this a paid customer bounces straight back to /giftcard and never
  // sees a confirmation.
  const recoveredOrderNumber = useMemo(() => {
    if (giftCardData || typeof window === "undefined") return null;

    // Only recover when they're clearly returning from a payment attempt —
    // Flutterwave appends status / tx_ref / transaction_id.
    const returningFromPayment =
      !!paymentStatusParam ||
      !!searchParams.get("tx_ref") ||
      !!searchParams.get("transaction_id");
    if (!returningFromPayment) return null;

    try {
      const stored = sessionStorage.getItem(PENDING_ORDER_NUMBER_KEY);
      return stored ? parseInt(stored, 10) : null;
    } catch {
      return null;
    }
  }, [giftCardData, paymentStatusParam, searchParams]);

  const orderNumber = giftCardData?.order_number ?? recoveredOrderNumber;

  // Fetch order details using order_number from gift card data
  const { data: orderData } = useOrderDetail(orderNumber);

  // Fetch payment details to check payment status
  const { data: payments } = useOrderPayments(orderNumber);

  useEffect(() => {
    // Whichever signal confirms the sale first lands here. The Meta Purchase
    // needs the order for its value, so it is skipped until orderData arrives —
    // the effect re-runs then, and trackPurchase dedupes by order number.
    const succeed = () => {
      if (orderData) trackPurchase(orderData);
      setShowSuccessModal(true);
    };

    // Check URL params first (from Flutterwave redirect)
    if (
      paymentStatusParam === "successful" ||
      paymentStatusParam === "success"
    ) {
      succeed();
      return;
    }

    // Check payment status from API
    if (payments && payments.length > 0) {
      const latestPayment = payments[payments.length - 1];
      const paymentStatus = latestPayment.status.toLowerCase();
      if (
        paymentStatus === "successful" ||
        paymentStatus === "completed" ||
        (latestPayment.redirect_verified === true &&
          latestPayment.amount_paid !== null)
      ) {
        succeed();
        return;
      }
    }

    // Fallback: Check order status
    if (orderData?.status) {
      const status = orderData.status.toLowerCase();
      if (status === "paid" || status === "completed") {
        succeed();
      }
    }
  }, [orderData, payments, paymentStatusParam]);

  // Once the sale is confirmed the stashed order number has done its job.
  useEffect(() => {
    if (!showSuccessModal) return;
    try {
      sessionStorage.removeItem(PENDING_ORDER_NUMBER_KEY);
    } catch {
      /* ignore */
    }
  }, [showSuccessModal]);

  // No card in progress and nothing to recover — send them back to choose one.
  // In an effect rather than during render: navigating mid-render is a side
  // effect React warns about, and it ran on every render before.
  useEffect(() => {
    if (!orderNumber) router.push("/giftcard");
  }, [orderNumber, router]);

  if (!orderNumber) return null;

  const totalAmount = parseFloat(
    orderData?.total_amount || giftCardData?.amount || "0",
  );

  const handleSubmit = () => {
    const payment = paymentType.find((p) => p.id === selectedPayment);
    if (!payment) return;

    // Check if user is authenticated
    if (!user || !user.email_validated) {
      notify.error("Kindly log in to proceed.");
      router.push("/auth/login?return_url=/giftcard-checkout");
      return;
    }

    // Meta AddPaymentInfo — last funnel step before the payment provider.
    if (orderData) trackAddPaymentInfo(orderData);

    // If Flutterwave is selected, initiate payment
    if (selectedPayment === "2") {
      initiatePaymentMutation.mutate({ orderNumber });
      return;
    }

    // For gift card payment, navigate to payment page
    router.push(payment.href!);
  };

  return (
    <>
      <SuccessModal
        isOpen={showSuccessModal}
        message="Your acquisition is complete. The gift card details will be delivered to the recipient shortly."
      />

      <section className="lg:pt-38 pt-33 xl:px-16 px-6 lg:pb-25 pb-12.5">
        <BackNavigation href="/giftcard" text="Return to Gift Card" />

        <div className="flex flex-col lg:flex-row flex-wrap lg:flex-nowrap xl:gap-10 md:gap-5 gap-6 lg:mt-10 mt-4">
          {/* Left Column - Payment Method */}
          <div className="flex flex-col gap-6 order-2 lg:order-1">
            {/* Payment Method Section - Shown on both mobile and desktop */}
            <div className="xl:w-175 lg:w-120 w-full bg-[#F6F7F8] rounded-[10px] border border-[#F5F5F5] flex-col gap-8.5 lg:px-15 px-6 lg:py-7.5 py-6">
              <PaymentMethodSection
                selectedPayment={selectedPayment}
                onPaymentChange={setSelectedPayment}
                onSubmit={handleSubmit}
                isPending={initiatePaymentMutation.isPending}
                buttonLabel={`Complete Order for ${formatCurrency(totalAmount, true)}`}
              />
            </div>
          </div>

          {/* Right Column - Order Summary (Receipt-like) */}
          <div className="order-1 lg:order-2">
            <SimpleOrderSummary
              title="Your Selected Gift"
              subtitle="Secure digital delivery"
              orderNumber={orderNumber}
              subtotal={giftCardData?.amount ?? orderData?.subtotal ?? 0}
              tax={orderData?.tax}
              shipping={orderData?.shipping_cost}
              total={totalAmount}
              className=" lg:w-100 w-full"
            />
          </div>
        </div>
      </section>
    </>
  );
};
export default GiftCardCheckout;
