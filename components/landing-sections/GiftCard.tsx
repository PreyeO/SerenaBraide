import React from "react";
import SubHeading from "../ui/typography/subHeading";

const GiftCard = () => {
  return (
    <section className="px-16 py-[50px] bg-[#F5F5F5]">
      <div className="flex flex-col max-w-[525px] pt-5 gap-[34px] mx-auto">
        <SubHeading
          title="A Scent for Everyone.  A Gift for Every Occasion"
          className={`font-extralight italic text-[40px] text-center  `}
        />
        <span className="bg-[#3B3B3B]  py-3 rounded-full w-[126px] text-sm text-white mx-auto flex  justify-center">
          Buy A Gift Card
        </span>
      </div>
    </section>
  );
};

export default GiftCard;
