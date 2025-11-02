import BorderLine from "@/components/ui/border-line";
import Paragraph from "@/components/ui/typography/paragraph";
import SubHeading from "@/components/ui/typography/subHeading";
import React from "react";

const ProductReview = () => {
  return (
    <section className=" px-16 text-[#3B3B3B] ">
      <BorderLine className="" />
      <div className="pt-[50px] flex flex-col gap-[16px] max-w-[503px] justify-center mx-auto items-center font-normal text-base ">
        <SubHeading
          title="What customers are saying"
          className="text-[40px] font-medium"
        />
        <Paragraph
          className="leading-6"
          content="96% of respondents would recommend this to a friend"
        />
      </div>
    </section>
  );
};

export default ProductReview;
