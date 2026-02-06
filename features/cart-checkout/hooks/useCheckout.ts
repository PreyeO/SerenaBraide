"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuthStore } from "@/features/auth/auth.store";
import { useCreateOrder } from "./useCreateOrder";
import { useOrderDetail } from "./useOrderDetail";
import { useInitiatePayment } from "@/features/payment/hooks/useInitiatePayment";
import { useApplyGiftCard } from "@/features/gift-card/hooks/useApplyGiftCard";
import { usePaymentStatusCheck } from "./usePaymentStatusCheck";
import { useOrderCalculations } from "./useOrderCalculations";
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
        paymentType[0].id
    );
    const [orderCreated, setOrderCreated] = useState(false);
    const [showGiftCardModal, setShowGiftCardModal] = useState(false);
    const [showRemainingBalanceModal, setShowRemainingBalanceModal] =
        useState(false);
    const [showPaymentModal, setShowPaymentModal] = useState(false);
    const [isMobileOrderExpanded, setIsMobileOrderExpanded] = useState(false);
    const [giftCardResponse, setGiftCardResponse] =
        useState<GiftCardResponse | null>(null);

    // URL Params
    const orderNumberParam = searchParams.get("order_number");
    const orderNumber = orderNumberParam ? parseInt(orderNumberParam, 10) : null;
    const paymentStatusParam = searchParams.get("status");

    // Mutations
    const createOrderMutation = useCreateOrder({ redirectToCheckout: false });
    const initiatePaymentMutation = useInitiatePayment();

    // Fetch order details
    const { data: orderData, isLoading: isLoadingOrder } =
        useOrderDetail(orderNumber);

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

    // Auto-create order for authenticated users
    useEffect(() => {
        if (
            !isHydrated ||
            orderCreated ||
            createOrderMutation.isPending ||
            createOrderMutation.isSuccess ||
            orderNumber ||
            paymentStatusParam
        ) {
            return;
        }

        if (user?.email_validated) {
            createOrderMutation.mutate(undefined, {
                onSuccess: (order) => {
                    setOrderCreated(true);
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

    // Handlers
    const handleSubmit = useCallback(() => {
        const payment = paymentType.find((p) => p.id === selectedPayment);
        if (!payment) return;

        if (!user || !user.email_validated) {
            notify.error("Please log in to continue with payment.");
            router.push("/auth/login?return_url=/checkout");
            return;
        }

        if (!orderNumber) {
            notify.error("Order not found. Please try again.");
            return;
        }

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
    }, [selectedPayment, user, orderNumber, router, initiatePaymentMutation]);

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
        [orderNumber, applyGiftCardMutation]
    );

    const handlePayRemainingBalance = useCallback(() => {
        setShowRemainingBalanceModal(false);
        setSelectedPayment(PAYMENT_TYPES.FLUTTERWAVE);
        if (orderNumber) {
            initiatePaymentMutation.mutate({ orderNumber });
        }
    }, [orderNumber, initiatePaymentMutation]);

    const handleMobileContinue = useCallback(() => {
        setShowPaymentModal(true);
    }, []);

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
        isPaymentPending: initiatePaymentMutation.isPending,
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
