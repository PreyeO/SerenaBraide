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
import { ShoppingBag, ChevronDown } from "lucide-react";
import Paragraph from "@/components/ui/typography/paragraph";
import { RadioGroup } from "@/components/ui/radio-group";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuthStore } from "@/features/auth/auth.store";
import { useCreateOrder } from "../../hooks/useCreateOrder";
import { useOrderDetail } from "../../hooks/useOrderDetail";
import { useInitiatePayment } from "@/features/payment/hooks/useInitiatePayment";
import { notify } from "@/lib/notify";
import { formatCurrency } from "@/lib/utils";
import { paymentType, PAYMENT_TYPES } from "../../data/checkout.data";
import SuccessModal from "@/components/ui/modals/sucess";
import GiftCardForm from "@/features/gift-card/components/forms/GiftCardForm";
import FormModal from "@/components/ui/modals/form-modals";
import { useApplyGiftCard } from "@/features/gift-card/hooks/useApplyGiftCard";
import { BalanceFormValues } from "@/features/gift-card/giftcard.type";
import RemainingBalanceModal from "../modals/RemainingBalanceModal";
import PaymentMethodModal from "../modals/PaymentMethodModal";
import SubHeading from "@/components/ui/typography/subHeading";
import { usePaymentStatusCheck } from "../../hooks/usePaymentStatusCheck";
import { useOrderCalculations } from "../../hooks/useOrderCalculations";
import {
  getOrderItemImage,
  getOrderItemMetaLabel,
} from "../../utils/checkout.utils";
import { GiftCardResponse } from "../../type/checkout.type";

const CheckoutSection = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user, isHydrated } = useAuthStore();
  const [selectedPayment, setSelectedPayment] = useState<string>(
    paymentType[0].id,
  );
  const [orderCreated, setOrderCreated] = useState(false);
  const [showGiftCardModal, setShowGiftCardModal] = useState(false);
  const [showRemainingBalanceModal, setShowRemainingBalanceModal] =
    useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [isMobileOrderExpanded, setIsMobileOrderExpanded] = useState(false);
  const [giftCardResponse, setGiftCardResponse] =
    useState<GiftCardResponse | null>(null);
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
        setShowPaymentModal(false);
        setShowRemainingBalanceModal(true);
      } else {
        // Full payment - show success modal
        setShowGiftCardModal(false);
        setShowPaymentModal(false);
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

  // Fetch order details if order_number exists
  const { data: orderData, isLoading: isLoadingOrder } =
    useOrderDetail(orderNumber);

  // Check payment status and show success modal
  const { showSuccessModal, setShowSuccessModal } = usePaymentStatusCheck({
    orderNumber,
    orderData,
    paymentStatusParam,
  });

  // Calculate order totals
  const { orderItems, totalQuantity, totalPrice, subtotal, shippingCost, tax } =
    useOrderCalculations(orderData);

  const orderTotal = totalPrice;

  // Create order when authenticated user arrives at checkout without an order
  useEffect(() => {
    // Skip if not hydrated yet, already creating, or already have an order
    if (
      !isHydrated ||
      orderCreated ||
      createOrderMutation.isPending ||
      createOrderMutation.isSuccess ||
      orderNumber
    )
      return;

    // Skip if returning from payment (payment status in URL means cart was already converted to order)
    if (paymentStatusParam) return;

    // If user is authenticated and verified, create order automatically
    if (user?.email_validated) {
      createOrderMutation.mutate(undefined, {
        onSuccess: (order) => {
          setOrderCreated(true);
          // Update URL with order_number (remove any return_url param)
          router.replace(`/checkout?order_number=${order.order_number}`);
        },
      });
    }
  }, [
    isHydrated,
    user,
    orderCreated,
    createOrderMutation,
    orderNumber,
    paymentStatusParam,
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
    if (selectedPayment === PAYMENT_TYPES.GIFT_CARD) {
      setShowPaymentModal(false);
      setShowGiftCardModal(true);
      return;
    }

    // If Flutterwave is selected, initiate payment
    if (selectedPayment === PAYMENT_TYPES.FLUTTERWAVE) {
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
    setSelectedPayment(PAYMENT_TYPES.FLUTTERWAVE);
    if (orderNumber) {
      initiatePaymentMutation.mutate({ orderNumber });
    }
  };

  const handleMobileContinue = () => {
    setShowPaymentModal(true);
  };

  return (
    <>
      <SuccessModal isOpen={showSuccessModal} />

      {/* Mobile Payment Method Modal */}
      <PaymentMethodModal
        open={showPaymentModal}
        onClose={() => setShowPaymentModal(false)}
        selectedPayment={selectedPayment}
        onPaymentChange={setSelectedPayment}
        onSubmit={handleSubmit}
        isPending={initiatePaymentMutation.isPending}
        totalPrice={orderTotal}
      />

      {/* Gift Card Payment Modal */}
      <FormModal
        open={showGiftCardModal}
        onClose={() => setShowGiftCardModal(false)}
        title="Pay with Gift Card"
        className="font-PPEditorialNew text-lg lg:text-[40px] font-normal text-[#3B3B3B]"
      >
        <div className="w-full">
          <SubHeading
            className="text-base font-medium text-[#3B3B3B] mb-4 text-center"
            title={`Order Total: ₦${orderTotal.toFixed(2)}`}
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
      <section className="lg:pt-38 pt-33 lg:px-16 px-6 lg:pb-25 pb-12.5 ">
        <BackNavigation href="/cart" text="Cart" />
        <CartHeader totalItems={totalQuantity} />
        <div className="flex flex-col lg:flex-row flex-wrap lg:flex-nowrap lg:gap-10 md:gap-5 gap-0 lg:mt-10 mt-4">
          <div className="flex flex-col gap-6 order-2 lg:order-1">
            <div className="max-w-175 mt-4 lg:mt-0">
              <ShippingAddress />
            </div>
            {/* Desktop Payment Section - Hidden on mobile */}
            <div className="hidden lg:block bg-[#F6F7F8] rounded-[10px] border border-[#F5F5F5] w-175 flex-col gap-8.5 px-15 py-7.5">
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
                  label="Pay"
                  loadingLabel="Processing..."
                  isPending={initiatePaymentMutation.isPending}
                  onClick={handleSubmit}
                />
                <AuthSpan className="lg:text-sm max-w-83.75 text-xs mx-auto leading-5.5 pt-2.5 text-[#3B3B3B] font-normal">
                  By submitting my order, I confirm I have read and acknowledged
                  all
                  <span className="underline font-medium ">
                    <Link href="/terms_of_service"> terms </Link>and{" "}
                    <Link href="/purchase_service">policies.</Link>
                  </span>
                </AuthSpan>
              </div>
            </div>
          </div>

          {/* Right Column - Order & Receipt (order-1 on mobile, order-2 on lg) */}
          <div className="flex flex-col gap-6 mt-4 lg:mt-0 order-1 lg:order-2">
            <div className="lg:w-143 w-full lg:py-4 lg:px-4 bg-[#F6F7F8] rounded-[10px] border border-[#F5F5F5]">
              {/* Mobile Collapsible Header */}
              <button
                className="lg:hidden w-full bg-[#3B3B3B] rounded-md py-4 px-4 flex items-center justify-between"
                onClick={() => setIsMobileOrderExpanded(!isMobileOrderExpanded)}
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                    <ShoppingBag className="w-4 h-4 text-white" />
                  </div>
                  <div className="text-left">
                    <Paragraph
                      className="text-white font-medium text-sm"
                      content={`My cart - ${formatCurrency(totalPrice)}`}
                    />
                    <Paragraph
                      className="text-[#9A9A98] italic font-normal text-xs"
                      content={`You will earn ${totalQuantity * 2} points earned from this purchase*`}
                    />
                  </div>
                </div>
                <ChevronDown
                  className={`w-5 h-5 text-white transition-transform duration-200 ${
                    isMobileOrderExpanded ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* Desktop Header - Always visible on lg */}
              <div className="hidden lg:flex bg-[#3B3B3B] rounded-md py-7.5 px-[32.5px] gap-7.5 mb-4.5">
                <div>
                  <Paragraph
                    className="text-white font-medium text-sm"
                    content={`My order - ${formatCurrency(totalPrice)}`}
                  />
                  <Paragraph
                    className="text-[#9A9A98] italic font-normal text-sm"
                    content={`You will earn ${
                      totalQuantity * 2
                    } points earned from this purchase*`}
                  />
                </div>
              </div>

              {/* Order Items - Collapsible on mobile, always visible on desktop */}
              <div
                className={`flex flex-col gap-4 overflow-hidden transition-all duration-300 ${
                  isMobileOrderExpanded
                    ? "max-h-500 opacity-100 py-4 lg:py-0"
                    : "max-h-0 lg:max-h-none opacity-0 lg:opacity-100"
                }`}
              >
                {isLoadingOrder ? (
                  <div className="py-8 text-center text-[#6F6E6C]">
                    Loading order...
                  </div>
                ) : orderItems.length > 0 ? (
                  orderItems.map((item) => {
                    const image = getOrderItemImage(item.variant.images);
                    const metaLabel = getOrderItemMetaLabel(
                      item.variant.size,
                      item.variant.color,
                    );

                    return (
                      <CartItem
                        key={item.id}
                        image={image}
                        name={item.variant.product_name}
                        price={formatCurrency(item.price)}
                        metaLabel={metaLabel}
                        className="bg-white"
                        quantity={item.quantity}
                        showQuantity={true}
                        height={150}
                        width={130}
                        imageClassName="w-full h-full"
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
          </div>

          {/* Receipt Section (order-3 on mobile, part of right column on lg) */}
          <div className="order-3 lg:order-2 lg:hidden mt-4">
            <Receipt
              totalItems={totalQuantity}
              totalPrice={orderTotal}
              subtotal={subtotal}
              shippingCost={shippingCost}
              tax={tax}
              showButton={false}
              showMobilePayButton
              onMobilePayClick={handleMobileContinue}
            />
          </div>

          {/* Desktop Receipt - shown inside the right column on lg */}
          <div className="hidden lg:block lg:order-2">
            <div className="lg:pt-6">
              <Receipt
                totalItems={totalQuantity}
                totalPrice={orderTotal}
                subtotal={subtotal}
                shippingCost={shippingCost}
                tax={tax}
                showButton={false}
                showMobilePayButton
                onMobilePayClick={handleMobileContinue}
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default CheckoutSection;
