"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useAuthStore } from "@/features/auth/auth.store";
import { useGiftCardStore } from "../giftcard.store";

export const useGiftCardSelection = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const { user, isHydrated } = useAuthStore();
    const {
        selectedAmount,
        selectedDesign,
        setSelectedAmount,
        setSelectedDesign,
    } = useGiftCardStore();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [customAmount, setCustomAmount] = useState("");

    // Handle return from login/register
    useEffect(() => {
        if (isHydrated && user?.email_validated) {
            const returnUrl = searchParams.get("return_url");
            if (returnUrl === "/giftcard") {
                // Restore selections from localStorage
                const storedSelections = localStorage.getItem("giftcard_selections");
                if (storedSelections) {
                    try {
                        const {
                            selectedAmount: storedAmount,
                            selectedDesign: storedDesign,
                            customAmount: storedCustom,
                        } = JSON.parse(storedSelections);

                        if (storedAmount) setSelectedAmount(storedAmount);
                        if (storedDesign) setSelectedDesign(storedDesign);
                        if (storedCustom) setCustomAmount(storedCustom);

                        // Clear stored data
                        localStorage.removeItem("giftcard_selections");

                        // Open the modal if we have selections
                        if (storedAmount) {
                            setIsModalOpen(true);
                        }
                    } catch (error) {
                        console.error("Failed to parse stored selections", error);
                        localStorage.removeItem("giftcard_selections");
                    }
                }
            }
        }
    }, [
        isHydrated,
        user,
        searchParams,
        setSelectedAmount,
        setSelectedDesign,
    ]);

    const handleDesignSelect = (designName: string) => {
        setSelectedDesign(selectedDesign === designName ? null : designName);
    };

    const handleAmountSelect = (amount: number) => {
        setSelectedAmount(selectedAmount === amount ? null : amount);
        setCustomAmount(""); // Clear custom amount when selecting predefined
    };

    const handleCustomAmountChange = (value: string) => {
        setCustomAmount(value);
        const numValue = parseFloat(value);
        // Only set amount if valid number and >= 20000 (minimum amount)
        if (!isNaN(numValue) && numValue >= 20000) {
            setSelectedAmount(numValue);
        } else if (selectedAmount !== null && !customAmount) {
            // Don't clear selected amount if it was set via predefined button 
            // unless this input is being cleared and was the source
            // This logic might need adjustment depending on precise UX desired
            setSelectedAmount(null);
        } else {
            setSelectedAmount(null);
        }
    };

    const handleContinue = () => {
        if (!user || !user.email_validated) {
            // Store current selections in localStorage for when they return
            localStorage.setItem(
                "giftcard_selections",
                JSON.stringify({
                    selectedAmount,
                    selectedDesign,
                    customAmount,
                }),
            );
            // Redirect to login
            router.push(`/auth/login?return_url=/giftcard`);
            return;
        }
        // User is authenticated, open the modal
        setIsModalOpen(true);
    };

    const canContinue = selectedAmount !== null;

    return {
        // State
        isModalOpen,
        setIsModalOpen,
        customAmount,
        selectedAmount,
        selectedDesign,

        // Handlers
        handleDesignSelect,
        handleAmountSelect,
        handleCustomAmountChange,
        handleContinue,

        // Computed
        canContinue,
    };
};
