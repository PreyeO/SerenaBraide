"use client";
import BackNavigation from "@/components/ui/btns/back-navigation";
import CartHeader from "@/features/cart-checkout/shared/CartHeader";
import React, { useState, useEffect } from "react";
import ShippingAddress from "./ShippingAddress";
import PaymentItem from "../../shared/PaymentItem";
import SubmitButton from "@/components/ui/btns/submit-cta";
import AuthSpan from "@/components/ui/typography/auth-span";
import Link from "next/link";
import Receipt from "../../shared/Receipt";
import CartItem from "../../shared/CartItem";
import { ShoppingBag } from "lucide-react";
import Paragraph from "@/components/ui/typography/paragraph";
import { RadioGroup } from "@/components/ui/radio-group";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuthStore } from "@/features/auth/auth.store";
import { useCreateOrder } from "../../hooks/useCreateOrder";
import { useOrderDetail } from "../../hooks/useOrderDetail";
import { useInitiatePayment } from "@/features/payment/hooks/useInitiatePayment";
import { useOrderPayments } from "@/features/payment/hooks/useOrderPayments";
import { notify } from "@/lib/notify";
import { paymentType } from "../../data/checkout.data";
import SuccessModal from "@/components/ui/modals/sucess";
import GiftCardForm from "@/features/gift-card/components/forms/GiftCardForm";
import FormModal from "@/components/ui/modals/form-modals";
import { useApplyGiftCard } from "@/features/gift-card/hooks/useApplyGiftCard";
import { BalanceFormValues } from "@/features/gift-card/giftcard.type";
import RemainingBalanceModal from "../modals/RemainingBalanceModal";
import SubHeading from "@/components/ui/typography/subHeading";

const CheckoutSection = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user, isHydrated } = useAuthStore();
  const [selectedPayment, setSelectedPayment] = useState(paymentType[0].id);
  const [orderCreated, setOrderCreated] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showGiftCardModal, setShowGiftCardModal] = useState(false);
  const [showRemainingBalanceModal, setShowRemainingBalanceModal] =
    useState(false);
  const [giftCardResponse, setGiftCardResponse] = useState<{
    remaining_amount: string;
    gift_card_amount: string;
    gift_card_balance: string;
  } | null>(null);
  const createOrderMutation = useCreateOrder({ redirectToCheckout: false });
  const initiatePaymentMutation = useInitiatePayment();
  const applyGiftCardMutation = useApplyGiftCard({
    onSuccess: (response) => {
      // If there's remaining balance, show remaining balance modal
      if (parseFloat(response.remaining_amount) > 0) {
        setGiftCardResponse({
          remaining_amount: response.remaining_amount,
          gift_card_amount: response.gift_card_amount,
          gift_card_balance: response.gift_card_balance,
        });
        setShowGiftCardModal(false);
        setShowRemainingBalanceModal(true);
      } else {
        // Full payment - show success modal
        setShowGiftCardModal(false);
        setShowSuccessModal(true);
      }
      // Refresh order data to get updated status
      if (orderNumber) {
        // The order data will be refetched automatically by React Query
      }
    },
  });

  // Get order_number from URL params
  const orderNumberParam = searchParams.get("order_number");
  const orderNumber = orderNumberParam ? parseInt(orderNumberParam, 10) : null;

  // Check for payment success in URL params (from Flutterwave redirect)
  const paymentStatusParam = searchParams.get("status");
  const txRef = searchParams.get("tx_ref");

  // Fetch order details if order_number exists
  const { data: orderData, isLoading: isLoadingOrder } =
    useOrderDetail(orderNumber);

  // Fetch payment details to check payment status
  const { data: payments } = useOrderPayments(orderNumber);

  // Show success modal when payment is successful
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

  // Use order data if available, otherwise calculate from cart (fallback)
  const orderItems = orderData?.items ?? [];
  const totalQuantity =
    orderData?.items_count ??
    orderItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = orderData?.total_amount
    ? parseFloat(orderData.total_amount)
    : 0;
  const orderTotal = orderData?.total_amount
    ? parseFloat(orderData.total_amount)
    : 0;
  const subtotal = orderData?.subtotal ? parseFloat(orderData.subtotal) : 0;
  const shippingCost = orderData?.shipping_cost
    ? parseFloat(orderData.shipping_cost)
    : 0;
  const tax = orderData?.tax ? parseFloat(orderData.tax) : 0;

  // Create order when user arrives from auth flow
  useEffect(() => {
    if (
      !isHydrated ||
      orderCreated ||
      createOrderMutation.isPending ||
      createOrderMutation.isSuccess ||
      orderNumber
    )
      return;

    const returnUrl = searchParams.get("return_url");

    // If user is authenticated, verified, and coming from auth flow, create order
    if (user?.email_validated && returnUrl === "/checkout") {
      createOrderMutation.mutate(undefined, {
        onSuccess: (order) => {
          setOrderCreated(true);
          // Update URL with order_number
          router.push(`/checkout?order_number=${order.order_number}`);
        },
      });
    }
  }, [
    isHydrated,
    user,
    searchParams,
    orderCreated,
    createOrderMutation,
    orderNumber,
    router,
  ]);

  const handleSubmit = () => {
    const payment = paymentType.find((p) => p.id === selectedPayment);
    if (!payment) return;

    // Check if user is authenticated
    if (!user || !user.email_validated) {
      notify.error("Please log in to continue with payment.");
      router.push("/auth/login?return_url=/checkout");
      return;
    }

    if (!orderNumber) {
      notify.error("Order not found. Please try again.");
      return;
    }

    // If Gift Card is selected, show gift card modal
    if (selectedPayment === "1") {
      setShowGiftCardModal(true);
      return;
    }

    // If Flutterwave is selected, initiate payment
    if (selectedPayment === "2") {
      initiatePaymentMutation.mutate({ orderNumber });
      return;
    }

    // For other payment methods, navigate to payment page
    router.push(payment.href!);
  };

  const handleGiftCardSubmit = (data: BalanceFormValues) => {
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
  };

  const handlePayRemainingBalance = () => {
    // Switch to Flutterwave payment for remaining balance
    setShowRemainingBalanceModal(false);
    setSelectedPayment("2");
    if (orderNumber) {
      initiatePaymentMutation.mutate({ orderNumber });
    }
  };

  return (
    <>
      <SuccessModal
        isOpen={showSuccessModal}
        orderNumber={orderData?.order_number}
      />

      {/* Gift Card Payment Modal */}
      <FormModal
        open={showGiftCardModal}
        onClose={() => setShowGiftCardModal(false)}
        title="Pay with Gift Card"
      >
        <div className="w-full">
          <SubHeading
            className="text-base font-medium text-[#3B3B3B] mb-4 text-center"
            title={`Order Total: $${orderTotal.toFixed(2)}`}
          />
          <GiftCardForm
            onSubmit={handleGiftCardSubmit}
            isLoading={applyGiftCardMutation.isPending}
            buttonLabel="Pay Now"
            showHelpText={false}
          />
        </div>
      </FormModal>

      {/* Remaining Balance Modal */}
      {giftCardResponse && (
        <RemainingBalanceModal
          open={showRemainingBalanceModal}
          onClose={() => {
            setShowRemainingBalanceModal(false);
            setGiftCardResponse(null);
          }}
          remainingAmount={giftCardResponse.remaining_amount}
          giftCardAmount={giftCardResponse.gift_card_amount}
          giftCardBalance={giftCardResponse.gift_card_balance}
          onPayRemaining={handlePayRemainingBalance}
        />
      )}
      <section className="pt-38 px-16 mt-10 pb-12.5 ">
        <BackNavigation href="/cart" text="Cart" />
        <CartHeader totalItems={totalQuantity} />
        <div className="flex gap-10 mt-10">
          <div className=" flex flex-col gap-6">
            <div className="w-175">
              <ShippingAddress />
            </div>
            <div className="bg-[#F6F7F8] rounded-[10px] border border-[#F5F5F5] w-175  flex flex-col gap-8.5 px-15 py-7.5">
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
                <AuthSpan className="text-sm w-83.75 mx-auto leading-5.5 pt-2.5 text-[#3B3B3B] font-normal">
                  By submitting my order, I confirm I have read and
                  acknowledged all
                  <span className="underline font-medium ">
                    <Link href="/terms_of_service"> terms </Link> and{" "}
                    <Link href="/purchase_service"> policies.</Link>
                  </span>
                </AuthSpan>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-6">
            <div className="w-143 py-4 px-4 bg-[#F6F7F8] rounded-[10px] border border-[#F5F5F5]">
              <div className="bg-[#3B3B3B] py-7.5 px-[32.5px] flex gap-7.5">
                <ShoppingBag />
                <div>
                  <Paragraph
                    className="text-white font-medium text-sm"
                    content={`My order - $${totalPrice.toFixed(2)}`}
                  />
                  <Paragraph
                    className="text-[#9A9A98] italic font-normal text-sm"
                    content={`You will earn ${
                      totalQuantity * 2
                    } points earned from this purchase*`}
                  />
                </div>
              </div>
              <div className="flex flex-col gap-4">
                {isLoadingOrder ? (
                  <div className="py-8 text-center text-[#6F6E6C]">
                    Loading order...
                  </div>
                ) : orderItems.length > 0 ? (
                  orderItems.map((item) => {
                    const image =
                      item.variant.images.find((img) => img.is_primary)
                        ?.image_url ??
                      item.variant.images[0]?.image_url ??
                      "/cart-placeholder.png";

                    return (
                      <CartItem
                        key={item.id}
                        image={image}
                        name={item.variant.product_name}
                        price={`$${item.price}`}
                        metaLabel={
                          item.variant.size
                            ? `Size: ${item.variant.size}`
                            : item.variant.color
                              ? `Color: ${item.variant.color}`
                              : ""
                        }
                        className="bg-white"
                        quantity={item.quantity}
                        showQuantity={true}
                        height={150}
                        width={130}
                        showRemoveButton={false}
                        showQuantityBox={false}
                        showRemoveEdit={false}
                      />
                    );
                  })
                ) : (
                  <div className="py-8 text-center text-[#6F6E6C]">
                    No items in order
                  </div>
                )}
              </div>
            </div>
            <div className="pt-6">
              <Receipt
                totalItems={totalQuantity}
                totalPrice={orderTotal}
                subtotal={subtotal}
                shippingCost={shippingCost}
                tax={tax}
                showButton={false}
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default CheckoutSection;
