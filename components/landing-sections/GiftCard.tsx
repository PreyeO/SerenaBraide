import React from "react";
import SubHeading from "../ui/typography/subHeading";
import ProductImage from "../ui/images/product-image";
import LinkCta from "../ui/btns/link-cta";

const GiftCard = () => {
  return (
    <section className="px-16 py-12.5 bg-[#F5F5F5]">
      {/* Heading + CTA */}
      <div className="flex flex-col max-w-131.5 pt-5 gap-8.5 mx-auto">
        <SubHeading
          title="A Scent for Everyone.  A Gift for Every Occasion"
          className="font-extralight italic text-[40px] text-center"
        />

        <LinkCta label="Buy A Gift Card" className=" w-40 " />
      </div>

      {/* Cards Layout */}
      <div className="flex justify-center items-end mt-19.5">
        {/* Left images */}
        <ProductImage
          className="object-contain w-100 h-100 -mr-50 "
          alt="giftcard"
          src="/card-1.png"
          width={439}
          height={439}
        />
        <ProductImage
          className="object-contain w-100 h-100 -mr-32.5 "
          alt="giftcard"
          src="/card-2.png"
          width={439}
          height={439}
        />

        {/* Center image (tallest + focus) */}
        <ProductImage
          className="object-contain w-82.75 h-117.5 z-10 shadow-xl hover:scale-105 transition"
          alt="giftcard"
          src="/front-card.png"
          width={331}
          height={470}
        />

        {/* Right images */}
        <ProductImage
          className="object-contain w-100 h-100 -ml-32.5  z-6"
          alt="giftcard"
          src="/card-3.png"
          width={439}
          height={439}
        />
        <ProductImage
          className="object-contain w-100 h-100 -ml-30 "
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
