"use client";

import BackNavigation from "@/components/ui/btns/back-navigation";
import React, { useState, useEffect } from "react";
import Paragraph from "@/components/ui/typography/paragraph";
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
      notify.error("Please log in to continue with payment.");
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
        message="Thank you for your purchase! Your gift card details including the card number and PIN will be sent to the recipient's email shortly."
      />

      <section className="lg:pt-38 pt-33 xl:px-16 px-6 lg:pb-25 pb-12.5">
        <BackNavigation href="/giftcard" text="Gift Card" />

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
                buttonLabel={`Pay ${formatCurrency(totalAmount, true)}`}
              />
            </div>
          </div>

          {/* Right Column - Order Summary (Receipt-like) */}
          <div className="order-1 lg:order-2">
            <div className="xl:w-143 lg:w-100 w-full bg-[#F6F7F8] rounded-[10px] border border-[#F5F5F5]">
              {/* Header */}
              <div className="bg-[#3B3B3B] lg:py-7.5 py-4 lg:px-8 px-4 rounded-t-[10px]">
                <div className="text-white">
                  <Paragraph
                    className="font-medium text-sm"
                    content="Gift Card Purchase"
                  />
                  <Paragraph
                    className="italic font-normal text-sm"
                    content="Digital delivery via email"
                  />
                </div>
              </div>

              {/* Receipt Details */}
              <div className="flex flex-col lg:gap-6 gap-4 lg:px-8 px-4 lg:py-8 py-6">
                {/* Order Number */}
                <div className="flex justify-between items-center">
                  <Paragraph
                    className="text-[#6F6E6C] lg:text-base text-sm"
                    content="Order Number"
                  />
                  <Paragraph
                    className="font-medium lg:text-base text-sm"
                    content={`#${giftCardData.order_number}`}
                  />
                </div>

                {/* Subtotal (Gift Card Amount) */}
                <div className="flex justify-between items-center">
                  <Paragraph
                    className="text-[#3B3B3B] font-medium lg:text-base text-sm"
                    content="Subtotal"
                  />
                  <Paragraph
                    className="font-normal lg:text-base text-sm"
                    content={formatCurrency(giftCardData.amount, true)}
                  />
                </div>

                {/* Tax */}
                {orderData && parseFloat(orderData.tax || "0") > 0 && (
                  <div className="flex justify-between items-center">
                    <Paragraph
                      className="text-[#3B3B3B] font-medium lg:text-base text-sm"
                      content="Tax"
                    />
                    <Paragraph
                      className="font-normal lg:text-base text-sm"
                      content={formatCurrency(orderData.tax, true)}
                    />
                  </div>
                )}

                {/* Shipping */}
                {orderData && parseFloat(orderData.shipping_cost || "0") > 0 ? (
                  <div className="flex justify-between items-center">
                    <Paragraph
                      className="text-[#3B3B3B] font-medium lg:text-base text-sm"
                      content="Shipping"
                    />
                    <Paragraph
                      className="font-normal lg:text-base text-sm"
                      content={formatCurrency(orderData.shipping_cost, true)}
                    />
                  </div>
                ) : (
                  <div className="flex justify-between items-center">
                    <Paragraph
                      className="text-[#3B3B3B] font-medium lg:text-base text-sm"
                      content="Shipping"
                    />
                    <Paragraph
                      className="font-normal lg:text-base text-sm text-[#6F6E6C]"
                      content="Free"
                    />
                  </div>
                )}

                {/* Total */}
                <div className="border-t pt-4 lg:pb-6 pb-4">
                  <div className="flex justify-between items-center">
                    <Paragraph
                      className="text-[#3B3B3B] font-medium lg:text-base text-sm"
                      content="Total"
                    />
                    <Paragraph
                      className="font-bold lg:text-lg text-base"
                      content={formatCurrency(totalAmount, true)}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
export default GiftCardCheckout;

