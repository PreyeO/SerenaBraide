import React from "react";
import SubHeading from "../ui/typography/subHeading";
import ProductImage from "../ui/images/product-image";
import LinkCta from "../ui/btns/link-cta";

const GiftCard = () => {
  return (
    <section className="px-16 py-[50px] bg-[#F5F5F5]">
      {/* Heading + CTA */}
      <div className="flex flex-col max-w-[525px] pt-5 gap-[34px] mx-auto">
        <SubHeading
          title="A Scent for Everyone.  A Gift for Every Occasion"
          className="font-extralight italic text-[40px] text-center"
        />

        <LinkCta label="Buy A Gift Card" className=" w-[160px] " />
      </div>

      {/* Cards Layout */}
      <div className="flex justify-center items-end mt-[78px]">
        {/* Left images */}
        <ProductImage
          className="object-contain w-[400px] h-[400px] -mr-[200px] "
          alt="giftcard"
          src="/card-1.png"
          width={439}
          height={439}
        />
        <ProductImage
          className="object-contain w-[400px] h-[400px] -mr-[130px] "
          alt="giftcard"
          src="/card-2.png"
          width={439}
          height={439}
        />

        {/* Center image (tallest + focus) */}
        <ProductImage
          className="object-contain w-[331px] h-[470px] z-10 shadow-xl hover:scale-105 transition"
          alt="giftcard"
          src="/front-card.png"
          width={331}
          height={470}
        />

        {/* Right images */}
        <ProductImage
          className="object-contain w-[400px] h-[400px] -ml-[130px]  z-6"
          alt="giftcard"
          src="/card-3.png"
          width={439}
          height={439}
        />
        <ProductImage
          className="object-contain w-[400px] h-[400px] -ml-[200px] "
          alt="giftcard"
          src="/card-4.png"
          width={439}
          height={439}
        />
      </div>
    </section>
  );
};

export default GiftCard;
