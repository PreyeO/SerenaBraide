"use client";

import React from "react";
import BackNavigation from "@/components/ui/btns/back-navigation";
import CartHeader from "@/features/cart-checkout/shared/CartHeader";
import ShippingAddress from "./ShippingAddress";
import Receipt from "../../shared/Receipt";
import OrderSummaryCard from "../../shared/OrderSummaryCard";
import PaymentMethodSection from "../../shared/PaymentMethodSection";
import SuccessModal from "@/components/ui/modals/sucess";
import FormModal from "@/components/ui/modals/form-modals";
import PaymentMethodModal from "../modals/PaymentMethodModal";
import RemainingBalanceModal from "../modals/RemainingBalanceModal";
import GiftCardForm from "@/features/gift-card/components/forms/GiftCardForm";
import SubHeading from "@/components/ui/typography/subHeading";
import { useCheckout } from "../../hooks/useCheckout";
import { formatCurrency } from "@/lib/utils";

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
    tax,

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
        className="font-PPEditorialNew text-lg lg:text-[40px] font-normal text-[#3B3B3B]"
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

      <section className="lg:pt-38 pt-33 lg:px-16 px-6 lg:pb-25 pb-12.5">
        <BackNavigation href="/cart" text="Cart" />
        <CartHeader totalItems={totalQuantity} />

        <div className="flex flex-col lg:flex-row flex-wrap lg:flex-nowrap lg:gap-10 md:gap-5 gap-0 lg:mt-10 mt-4">
          {/* Left Column - Shipping & Payment */}
          <div className="flex flex-col gap-6 order-2 lg:order-1">
            <div className="max-w-175 mt-4 lg:mt-0">
              <ShippingAddress />
            </div>

            {/* Desktop Payment Section */}
            <div className="hidden lg:block bg-[#F6F7F8] rounded-[10px] border border-[#F5F5F5] w-175 flex-col gap-8.5 px-15 py-7.5">
              <PaymentMethodSection
                selectedPayment={selectedPayment}
                onPaymentChange={setSelectedPayment}
                onSubmit={handleSubmit}
                isPending={isPaymentPending}
              />
            </div>
          </div>

          {/* Right Column - Order Summary */}
          <div className="flex flex-col gap-6 mt-4 lg:mt-0 order-1 lg:order-2">
            <OrderSummaryCard
              totalPrice={totalPrice}
              totalQuantity={totalQuantity}
              items={orderItems}
              isLoading={isLoadingOrder}
              isExpanded={isMobileOrderExpanded}
              onToggleExpanded={toggleMobileOrderExpanded}
            />
          </div>

          {/* Mobile Receipt */}
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

          {/* Desktop Receipt */}
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
