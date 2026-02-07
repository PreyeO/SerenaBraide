"use client";

import SubmitButton from "@/components/ui/btns/submit-cta";
import ProductImage from "@/components/ui/images/product-image";
import SubHeading from "@/components/ui/typography/subHeading";
import { cardDesign } from "../general.data";
import { Input } from "@/components/ui/input";
import RecipientForm from "./forms/RecipientForm";
import FormModal from "@/components/ui/modals/form-modals";
import { cn, formatCurrency } from "@/lib/utils";
import Paragraph from "@/components/ui/typography/paragraph";
import Image from "next/image";
import { useGiftCardSelection } from "../hooks/useGiftCardSelection";

const GiftCardSection = () => {
  const {
    isModalOpen,
    setIsModalOpen,
    customAmount,
    selectedAmount,
    selectedDesign,
    handleDesignSelect,
    handleAmountSelect,
    handleCustomAmountChange,
    handleContinue,
    canContinue,
  } = useGiftCardSelection();

  return (
    <section className="pt-28 lg:px-16 px-6">
      <div className="flex md:flex-nowrap flex-wrap justify-center xl:gap-15 gap-8.5 mt-8.5">
        {/* Product Image */}
        <div className="w-full flex md:justify-start justify-center">
          <Image
            alt="Product image"
            src={
              selectedDesign
                ? cardDesign.find((d) => d.name === selectedDesign)?.src ||
                  "/big-giftcard.png"
                : "/big-giftcard.png"
            }
            width={700}
            height={500}
            className="xl:max-w-175 lg:max-w-125 max-w-93.75 max-h-50 md:max-h-175"
          />
        </div>

        {/* Product Info */}
        <div className="w-full">
          <div className="max-w-127.75">
            <SubHeading
              className="font-PPEditorialNew text-[26px] lg:text-[40px] text-[#3B3B3B] font-normal"
              title="Serena Braide E-Gift Card"
            />
            <Paragraph
              className="text-[#6F6E6C] font-normal text-sm lg:text-lg mt-2"
              content="Treat your loved ones to the perfect gift."
            />
          </div>

          {/* Choose a design */}
          <Paragraph
            className="text-[#3B3B3B] font-medium text-sm lg:text-base lg:mt-10 mt-8.5 lg:mb-4 mb-2.5"
            content="Choose a design"
          />
          <div className="grid grid-cols-4 max-w-95.5 md:gap-1 lg:gap-2 gap-2.5 ">
            {cardDesign.map((item, index) => (
              <div
                key={index}
                className="cursor-pointer"
                onClick={() => handleDesignSelect(item.name)}
              >
                <Image
                  alt={item.name}
                  src={item.src}
                  width={80}
                  height={80}
                  className={cn(
                    "border w-15 h-15 lg:w-20 lg:h-20 ",
                    selectedDesign === item.name
                      ? "border-[#3B3B3B]"
                      : "border-transparent",
                  )}
                />
              </div>
            ))}
          </div>

          {/* Choose an amount */}
          <Paragraph
            className="text-[#3B3B3B] font-medium text-sm lg:text-base lg:mt-10 mt-8.5 lg:mb-4 mb-2.5"
            content="Choose amount"
          />
          <div className="flex flex-wrap max-w-125 gap-x-2 gap-y-4 lg:gap-x-3 lg:gap-y-6 mb-6 lg:mb-10">
            {cardDesign.map((item, index) => {
              const amountValue = parseFloat(item.amount);
              return (
                <div
                  key={index}
                  className="cursor-pointer"
                  onClick={() => handleAmountSelect(amountValue)}
                >
                  <span
                    className={cn(
                      "px-3 py-2 rounded-[5px] text-sm lg:text-base font-normal border hover:border-[#3B3B3B] whitespace-nowrap",
                      selectedAmount === amountValue
                        ? "border-[#3B3B3B] bg-[#3B3B3B] text-white"
                        : "text-[#6F6E6C] border-gray-300",
                    )}
                  >
                    {formatCurrency(amountValue, true)}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Custom amount */}
          <div className="w-full">
            <Paragraph
              className="text-[#3B3B3B] font-medium text-sm lg:text-base lg:mt-10 mt-8.5 lg:mb-4 mb-2.5"
              content="Custom amount:"
            />
            <Input
              className="rounded-[50px] text-[#9A9A98] px-5 py-6"
              placeholder="20000"
              value={customAmount}
              onChange={(e) => handleCustomAmountChange(e.target.value)}
              type="number"
              min="20000"
            />
          </div>

          {/* Mobile: Show inline recipient form */}
          <div className="md:hidden mt-6">
            <RecipientForm closeModal={() => {}} buttonLabel="Add to Cart" />
          </div>

          {/* Desktop: Show Continue button + Modal */}
          <div className="hidden md:block">
            <SubmitButton
              label="Continue"
              loadingLabel="Continue..."
              className="mt-10"
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
          </div>

          {/* Loyalty Points Section */}
          <div className="bg-[#F5F5F5] w-full mt-6 lg:mt-10 flex justify-between items-center rounded-lg">
            <ProductImage
              alt="shopping bag icon"
              src="/shop-bag.svg"
              width={85}
              height={90.43}
              className="max-w-21.25"
            />
            <span className="text-xs lg:text-sm leading-5.5 font-normal pr-3.75">
              <Paragraph content="16 points = $16.00" className="" />
              <Paragraph
                content="Earn loyalty points with this product"
                className="font-medium"
              />
            </span>
          </div>
          <Paragraph
            content="Standard Delivery within 3-5 workings days"
            className="font-normal pt-6 text-sm lg:text-base"
          />
        </div>
      </div>
    </section>
  );
};

export default GiftCardSection;
