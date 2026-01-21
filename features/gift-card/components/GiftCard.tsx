"use client";

import SubmitButton from "@/components/ui/btns/submit-cta";
import ProductImage from "@/components/ui/images/product-image";
import Paragraph from "@/components/ui/typography/subHeading";
import SubHeading from "@/components/ui/typography/subHeading";
import { cardDesign } from "../general.data";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";
import RecipientForm from "./forms/RecipientForm";
import FormModal from "@/components/ui/modals/form-modals";
import { useGiftCardStore } from "../giftcard.store";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/features/auth/auth.store";
import { useSearchParams } from "next/navigation";

const GiftCardSection = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [customAmount, setCustomAmount] = useState("");
  const searchParams = useSearchParams();
  const { user, isHydrated } = useAuthStore();
  const {
    selectedAmount,
    selectedDesign,
    setSelectedAmount,
    setSelectedDesign,
  } = useGiftCardStore();

  // Handle return from login/register
  useEffect(() => {
    if (isHydrated && user?.email_validated) {
      const returnUrl = searchParams.get("return_url");
      if (returnUrl === "/giftcard") {
        // Restore selections from localStorage
        const storedSelections = localStorage.getItem("giftcard_selections");
        if (storedSelections) {
          const {
            selectedAmount: storedAmount,
            selectedDesign: storedDesign,
            customAmount: storedCustom,
          } = JSON.parse(storedSelections);
          setSelectedAmount(storedAmount);
          setSelectedDesign(storedDesign);
          setCustomAmount(storedCustom || "");
          // Clear stored data
          localStorage.removeItem("giftcard_selections");
        }
        // Open the modal if we have selections
        if (selectedAmount) {
          setIsModalOpen(true);
        }
      }
    }
  }, [
    isHydrated,
    user,
    searchParams,
    selectedAmount,
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
    if (!isNaN(numValue) && numValue >= 50 && numValue <= 700) {
      setSelectedAmount(numValue);
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
      window.location.href = `/auth/login?return_url=/giftcard`;
      return;
    }
    // User is authenticated, open the modal
    setIsModalOpen(true);
  };

  const canContinue = selectedAmount !== null;

  return (
    <section className="pt-[152px] px-16">
      <div className="flex justify-center gap-[60px] mt-[34px]">
        {/* Product Image */}
        <div className="w-full">
          <ProductImage
            alt="Product image"
            src="/big-giftcard.png"
            width={700}
            height={500}
            className="max-w-[700px]"
          />
        </div>

        {/* Product Info */}
        <div className="w-full">
          <div className=" max-w-[511px]">
            <SubHeading
              className="font-PPEditorialNew text-[40px] text-[#3B3B3B] font-normal leading-tight"
              title="Serena Braide E-Gift Card"
            />
            <Paragraph
              className="text-[#6F6E6C] font-normal text-lg mt-2"
              content="Treat your loved ones to the perfect gift."
            />
          </div>

          {/* Variants */}
          <Paragraph
            className="text-[#3B3B3B] font-medium text-base mt-[40px] mb-4"
            content="Choose a design (optional)"
          />
          <div className="grid grid-cols-4 max-w-[382px] mb-[40px]  ">
            {cardDesign.map((item, index) => (
              <div
                key={index}
                className="cursor-pointer"
                onClick={() => handleDesignSelect(item.name)}
              >
                <ProductImage
                  alt={item.name}
                  src={item.src}
                  width={80}
                  height={80}
                  className={cn(
                    "border-2",
                    selectedDesign === item.name
                      ? "border-[#3B3B3B]"
                      : "border-transparent",
                  )}
                />
              </div>
            ))}
          </div>
          <Paragraph
            className="text-[#3B3B3B] font-medium text-base mb-4 "
            content="Choose an amount"
          />
          <div className="grid grid-cols-4 max-w-[311px] mb-[40px]">
            {cardDesign.map((item, index) => {
              const amountValue = parseFloat(item.amount.replace("$", ""));
              return (
                <div
                  key={index}
                  className="cursor-pointer"
                  onClick={() => handleAmountSelect(amountValue)}
                >
                  <span
                    className={cn(
                      "px-2 py-2 rounded-[5px] text-base font-normal border hover:border-[#3B3B3B]",
                      selectedAmount === amountValue
                        ? "border-[#3B3B3B] bg-[#3B3B3B] text-white"
                        : "text-[#6F6E6C] border-gray-300",
                    )}
                  >
                    {item.amount}
                  </span>
                </div>
              );
            })}
          </div>
          <div className="w-full">
            <Paragraph
              className="text-[#3B3B3B] font-medium text-base mb-4 "
              content="Custom amount ($50 - $700)"
            />
            <Input
              className="rounded-[50px] text-[#9A9A98] px-5 h-[50px]"
              placeholder="$50 - $700"
              value={customAmount}
              onChange={(e) => handleCustomAmountChange(e.target.value)}
              type="number"
              min="50"
              max="700"
            />
          </div>
          <SubmitButton
            label="Continue"
            loadingLabel="Continue..."
            className="mt-[40px]"
            onClick={handleContinue}
            disabled={!canContinue}
          />

          <FormModal
            open={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            title="Add gift card recipient details"
          >
            <RecipientForm closeModal={() => setIsModalOpen(false)} />
          </FormModal>
          <div className="bg-[#F5F5F5] w-full mt-[40px] flex justify-between items-center">
            <ProductImage
              alt="shopping bag icon"
              src="/shop-bag.svg"
              width={85}
              height={90.43}
              className="max-w-[85px]"
            />
            <span className="text-sm leading-[22px] font-normal pr-[15px] ">
              <Paragraph content="16 points = $16.00" className="" />
              <Paragraph
                content="Earn loyalty points with this product"
                className=" font-medium "
              />
            </span>
          </div>
          <Paragraph
            content="Standard Delivery within 3-5 workings days"
            className=" font-normal pt-6  "
          />
        </div>
      </div>
    </section>
  );
};

export default GiftCardSection;
