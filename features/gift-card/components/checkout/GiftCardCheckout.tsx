"use client";

import BackNavigation from "@/components/ui/btns/back-navigation";
import SubHeading from "@/components/ui/typography/subHeading";
import React, { useState, useEffect } from "react";
import SubmitButton from "@/components/ui/btns/submit-cta";
import Paragraph from "@/components/ui/typography/paragraph";
import { useGiftCardStore } from "../../giftcard.store";
import { useRouter } from "next/navigation";
import { RadioGroup } from "@/components/ui/radio-group";
import PaymentItem from "@/features/cart-checkout/shared/PaymentItem";
import { paymentType } from "@/features/cart-checkout/data/checkout.data";
import { useInitiatePayment } from "@/features/payment/hooks/useInitiatePayment";
import { useOrderPayments } from "@/features/payment/hooks/useOrderPayments";
import { notify } from "@/lib/notify";
import { useAuthStore } from "@/features/auth/auth.store";
import { useOrderDetail } from "@/features/cart-checkout/hooks/useOrderDetail";
import { useSearchParams } from "next/navigation";
import SuccessModal from "@/components/ui/modals/sucess";

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
      <SuccessModal isOpen={showSuccessModal} />
      <section className="pt-38 px-16 mt-10 pb-12.5">
        <BackNavigation href="/giftcard" text="Gift Card" />

        <div className="flex gap-10 mt-10">
          <div className="flex flex-col gap-6">
            <div className="w-175">
              <div className="bg-[#F6F7F8] rounded-[10px] border border-[#F5F5F5] w-full p-15">
                <SubHeading
                  title="Gift Card Details"
                  className="text-[#3B3B3B] text-base font-medium mb-6"
                />
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <Paragraph
                      className="text-[#6F6E6C]"
                      content="Card Number:"
                    />
                    <Paragraph
                      className="font-medium"
                      content={giftCardData.card_number}
                    />
                  </div>
                  <div className="flex justify-between">
                    <Paragraph className="text-[#6F6E6C]" content="Amount:" />
                    <Paragraph
                      className="font-medium"
                      content={`${giftCardData.currency} ${giftCardData.amount}`}
                    />
                  </div>
                  <div className="flex justify-between">
                    <Paragraph
                      className="text-[#6F6E6C]"
                      content="Order Number:"
                    />
                    <Paragraph
                      className="font-medium"
                      content={`#${giftCardData.order_number}`}
                    />
                  </div>
                  <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded">
                    <Paragraph
                      className="text-yellow-800 text-sm"
                      content={giftCardData.message}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-[#F6F7F8] rounded-[10px] border border-[#F5F5F5] w-175 flex flex-col gap-8 px-15 py-7.5">
              <SubHeading
                title="Payment Method"
                className="text-[#3B3B3B] text-base font-medium"
              />
              <RadioGroup
                value={selectedPayment}
                onValueChange={(val) => setSelectedPayment(val)}
              >
                {paymentType.map((type, index) => (
                  <div key={index} className="mb-6">
                    <PaymentItem
                      src={type.src}
                      alt={type.alt}
                      className=""
                      height={type.height}
                      width={type.width}
                      detail={type.detail}
                      optionID={type.id}
                    />
                  </div>
                ))}
              </RadioGroup>

              <div>
                <SubmitButton
                  label="Continue"
                  loadingLabel="Processing..."
                  isPending={initiatePaymentMutation.isPending}
                  onClick={handleSubmit}
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <div className="w-143 py-4 px-4 bg-[#F6F7F8] rounded-[10px] border border-[#F5F5F5]">
              <div className="bg-[#3B3B3B] py-7.5 px-[32.5px] flex gap-7.5">
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
              <div className="flex flex-col gap-4 pt-6">
                <div className="flex justify-between items-center">
                  <Paragraph className="text-[#3B3B3B]" content="Gift Card" />
                  <Paragraph
                    className="font-medium"
                    content={`${giftCardData.currency} ${giftCardData.amount}`}
                  />
                </div>
                {orderData && (
                  <>
                    {parseFloat(orderData.shipping_cost || "0") > 0 && (
                      <div className="flex justify-between items-center">
                        <Paragraph
                          className="text-[#6F6E6C]"
                          content="Shipping Cost"
                        />
                        <Paragraph
                          className="font-medium"
                          content={`${giftCardData.currency} ${parseFloat(orderData.shipping_cost).toFixed(2)}`}
                        />
                      </div>
                    )}
                    {parseFloat(orderData.tax || "0") > 0 && (
                      <div className="flex justify-between items-center">
                        <Paragraph className="text-[#6F6E6C]" content="Tax" />
                        <Paragraph
                          className="font-medium"
                          content={`${giftCardData.currency} ${parseFloat(orderData.tax).toFixed(2)}`}
                        />
                      </div>
                    )}
                  </>
                )}
                <div className="border-t pt-4">
                  <div className="flex justify-between items-center">
                    <Paragraph
                      className="text-[#3B3B3B] font-medium"
                      content="Total"
                    />
                    <Paragraph
                      className="font-bold text-lg"
                      content={`${giftCardData.currency} ${
                        orderData?.total_amount
                          ? parseFloat(orderData.total_amount).toFixed(2)
                          : giftCardData.amount
                      }`}
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
