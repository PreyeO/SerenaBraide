import BackNavigation from "@/components/ui/btns/back-navigation";
import SubHeading from "@/components/ui/typography/subHeading";
import React from "react";
import GiftPaymentForm from "./GiftPaymentForm";

const GiftCardSection = () => {
  return (
    <section className="pt-[152px] px-16 mb-[100px]">
      <BackNavigation href="/" text="BackCheckout" />

      <div className="bg-[#F5F5F5] gap-[30px] py-[100px] px-[100px] max-w-[752px] flex flex-col items-center justify-center mx-auto">
        <SubHeading
          title="Pay with Gift Card"
          className=" font-PPEditorialNew text-[40px] font-normal text-[#3B3B3B]"
        />
        <GiftPaymentForm />
      </div>
    </section>
  );
};

export default GiftCardSection;
