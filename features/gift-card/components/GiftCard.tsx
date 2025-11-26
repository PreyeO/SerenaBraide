"use client";

import SubmitButton from "@/components/ui/btns/submit-cta";
import UnderlineLink from "@/components/ui/btns/underline-cta";
import ProductImage from "@/components/ui/images/product-image";
import Paragraph from "@/components/ui/typography/paragraph";
import SubHeading from "@/components/ui/typography/subHeading";
import { CornerUpLeft } from "lucide-react";
import { cardDesign } from "../general.data";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import Modal from "@/components/ui/modals/modal";
import RecipientForm from "./forms/RecipientForm";

const GiftCardSection = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
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
            content="Choose a design"
          />
          <div className="grid grid-cols-4 max-w-[382px] mb-[40px]  ">
            {cardDesign.map((item, index) => (
              <div key={index} className="">
                <ProductImage
                  alt={item.name}
                  src={item.src}
                  width={80}
                  height={80}
                  className=""
                />
              </div>
            ))}
          </div>
          <Paragraph
            className="text-[#3B3B3B] font-medium text-base mb-4 "
            content="Choose a amount"
          />
          <div className="grid grid-cols-4 max-w-[311px] mb-[40px]">
            {cardDesign.map((item, index) => (
              <div key={index} className="">
                <span className="hover:border-[#3B3B3B] cursor-pointer px-2 py-2 rounded-[5px] text-[#6F6E6C] text-base font-normal border">
                  {item.amount}
                </span>
              </div>
            ))}
          </div>
          <div className="w-full">
            <Paragraph
              className="text-[#3B3B3B] font-medium text-base mb-4 "
              content="Custom amount"
            />
            <Input
              className="rounded-[50px] text-[#9A9A98] px-5 h-[50px]"
              placeholder="$50 - $700"
            />
          </div>
          <SubmitButton
            label="Continue"
            loadingLabel="Continue..."
            className="mt-[40px]"
            onClick={() => setIsModalOpen(true)}
          />

          <Modal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            title="Add gift card recipient details"
          >
            <RecipientForm closeModal={() => setIsModalOpen(false)} />
          </Modal>
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
