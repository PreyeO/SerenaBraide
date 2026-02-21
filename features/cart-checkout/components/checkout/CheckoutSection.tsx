"use client";

import React from "react";
import BackNavigation from "@/components/ui/btns/back-navigation";
import ShippingAddress from "./ShippingAddress";
import Receipt from "../../shared/Receipt";
import OrderSummaryCard from "../../shared/OrderSummaryCard";
import PaymentMethodSection from "../../shared/PaymentMethodSection";
import SubHeading from "@/components/ui/typography/subHeading";
import { useCheckout } from "../../hooks/useCheckout";
import { formatCurrency } from "@/lib/utils";
import dynamic from "next/dynamic";

const SuccessModal = dynamic(() => import("@/components/ui/modals/sucess"), {
  ssr: false,
});
const FormModal = dynamic(() => import("@/components/ui/modals/form-modals"), {
  ssr: false,
});
const PaymentMethodModal = dynamic(
  () => import("../modals/PaymentMethodModal"),
  { ssr: false },
);
const RemainingBalanceModal = dynamic(
  () => import("../modals/RemainingBalanceModal"),
  { ssr: false },
);
const GiftCardForm = dynamic(
  () => import("@/features/gift-card/components/forms/GiftCardForm"),
  { loading: () => <p>Loading...</p> },
);

const CheckoutSection = () => {
  const {
    // State
    selectedPayment,
    setSelectedPayment,
    orderItems,
    isLoadingOrder,
    totalQuantity,
    totalPrice,
    subtotal,
    shippingCost,

    // Modal states
    showSuccessModal,
    showGiftCardModal,
    showRemainingBalanceModal,
    showPaymentModal,
    isMobileOrderExpanded,
    giftCardResponse,

    // Loading states
    isPaymentPending,
    isGiftCardPending,

    // Handlers
    handleSubmit,
    handleGiftCardSubmit,
    handlePayRemainingBalance,
    handleMobileContinue,
    toggleMobileOrderExpanded,
    closeGiftCardModal,
    closePaymentModal,
    closeRemainingBalanceModal,
  } = useCheckout();

  const orderTotal = totalPrice;

  return (
    <>
      <SuccessModal isOpen={showSuccessModal} />

      {/* Mobile Payment Method Modal */}
      <PaymentMethodModal
        open={showPaymentModal}
        onClose={closePaymentModal}
        selectedPayment={selectedPayment}
        onPaymentChange={setSelectedPayment}
        onSubmit={handleSubmit}
        isPending={isPaymentPending}
        totalPrice={orderTotal}
      />

      {/* Gift Card Payment Modal */}
      <FormModal
        open={showGiftCardModal}
        onClose={closeGiftCardModal}
        title="Pay with Gift Card"
        className="font-PPEditorialNew text-[22px] lg:text-[40px] font-normal text-[#3B3B3B]"
      >
        <div className="w-full">
          <SubHeading
            className="text-base font-medium text-[#3B3B3B] mb-4 text-center"
            title={`Order Total: ${formatCurrency(orderTotal)}`}
          />

          <GiftCardForm
            onSubmit={handleGiftCardSubmit}
            isLoading={isGiftCardPending}
            buttonLabel="Pay Now"
            showHelpText={false}
          />
        </div>
      </FormModal>

      {/* Remaining Balance Modal */}
      {giftCardResponse && (
        <RemainingBalanceModal
          open={showRemainingBalanceModal}
          onClose={closeRemainingBalanceModal}
          remainingAmount={giftCardResponse.remaining_amount}
          giftCardAmount={giftCardResponse.gift_card_amount}
          giftCardBalance={giftCardResponse.gift_card_balance}
          onPayRemaining={handlePayRemainingBalance}
        />
      )}

      <section className="lg:pt-38 pt-33 xl:px-16 px-6 lg:pb-25 pb-12.5">
        <BackNavigation href="/cart" text="Back to Cart" />

        <div className="flex flex-col lg:flex-row flex-wrap lg:flex-nowrap xl:gap-10 md:gap-5 gap-0 lg:mt-10 mt-4">
          {/* Left Column - Shipping & Payment */}
          <div className="flex flex-col gap-6 order-2 lg:order-1 mt-6 lg:mt-0">
            <div className=" w-full">
              <ShippingAddress />
            </div>

            <div className="hidden lg:flex bg-[#F6F7F8] rounded-[10px] border border-[#F5F5F5]  flex-col gap-8.5 px-15 py-7.5">
              <PaymentMethodSection
                selectedPayment={selectedPayment}
                onPaymentChange={setSelectedPayment}
                onSubmit={handleSubmit}
                isPending={isPaymentPending}
              />
            </div>
          </div>

          <div className="order-1 lg:order-2 ">
            <OrderSummaryCard
              totalPrice={totalPrice}
              totalQuantity={totalQuantity}
              items={orderItems}
              isLoading={isLoadingOrder}
              isExpanded={isMobileOrderExpanded}
              onToggleExpanded={toggleMobileOrderExpanded}
            />

            {/* Desktop Receipt */}
            <div className="hidden lg:block pt-6">
              <Receipt
                totalItems={totalQuantity}
                totalPrice={orderTotal}
                subtotal={subtotal}
                shippingCost={shippingCost}
                showButton={false}
                showMobilePayButton
                onMobilePayClick={handleMobileContinue}
              />
            </div>
          </div>
          {/* Mobile Receipt */}
          <div className="order-3 lg:hidden mt-6">
            <Receipt
              totalItems={totalQuantity}
              totalPrice={orderTotal}
              subtotal={subtotal}
              shippingCost={shippingCost}
              showButton={false}
              showMobilePayButton
              onMobilePayClick={handleMobileContinue}
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default CheckoutSection;
