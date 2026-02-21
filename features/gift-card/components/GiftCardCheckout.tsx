"use client";

import BackNavigation from "@/components/ui/btns/back-navigation";
import React, { useState, useEffect } from "react";

import { useGiftCardStore } from "../giftcard.store";
import { useRouter } from "next/navigation";
import PaymentMethodSection from "@/features/cart-checkout/shared/PaymentMethodSection";
import { paymentType } from "@/features/cart-checkout/data/checkout.data";
import { useInitiatePayment } from "@/features/payment/hooks/useInitiatePayment";
import { useOrderPayments } from "@/features/payment/hooks/useOrderPayments";
import { notify } from "@/lib/notify";
import { useAuthStore } from "@/features/auth/auth.store";
import { useOrderDetail } from "@/features/cart-checkout/hooks/useOrderDetail";
import { useSearchParams } from "next/navigation";
import SuccessModal from "@/components/ui/modals/sucess";
import { formatCurrency } from "@/lib/utils";
import SimpleOrderSummary from "@/features/cart-checkout/shared/SimpleOrderSummary";

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

  // Fetch order details using order_number from gift card data
  const { data: orderData } = useOrderDetail(
    giftCardData ? giftCardData.order_number : null,
  );

  // Fetch payment details to check payment status
  const { data: payments } = useOrderPayments(
    giftCardData ? giftCardData.order_number : null,
  );

  useEffect(() => {
    // Check URL params first (from Flutterwave redirect)
    if (
      paymentStatusParam === "successful" ||
      paymentStatusParam === "success"
    ) {
      setShowSuccessModal(true);
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
        setShowSuccessModal(true);
        return;
      }
    }

    // Fallback: Check order status
    if (orderData?.status) {
      const status = orderData.status.toLowerCase();
      if (status === "paid" || status === "completed") {
        setShowSuccessModal(true);
      }
    }
  }, [orderData, payments, paymentStatusParam]);

  if (!giftCardData) {
    router.push("/giftcard");
    return null;
  }

  const totalAmount = parseFloat(
    orderData?.total_amount || giftCardData.amount,
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

    // If Flutterwave is selected, initiate payment
    if (selectedPayment === "2") {
      initiatePaymentMutation.mutate({
        orderNumber: giftCardData.order_number,
      });
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
              orderNumber={giftCardData.order_number}
              subtotal={giftCardData.amount}
              tax={orderData?.tax}
              shipping={orderData?.shipping_cost}
              total={totalAmount}
              className="xl:w-143 lg:w-100 w-full"
            />
          </div>
        </div>
      </section>
    </>
  );
};
export default GiftCardCheckout;
