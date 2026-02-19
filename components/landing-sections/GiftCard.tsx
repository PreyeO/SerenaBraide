import React from "react";
import SubHeading from "../ui/typography/subHeading";
import ProductImage from "../ui/images/product-image";
import LinkCta from "../ui/btns/link-cta";
import TitleSpan from "../ui/typography/title-span";
import { Button } from "../ui/button";
import Link from "next/link";

const GiftCard = () => {
  return (
    <section className="lg:px-16 lg:py-12.5 px-6 py-6  pb-8.5">
      {/* Heading + CTA */}
      <div className="flex flex-col max-w-131.5 pt-5 lg:gap-8.5 gap-4 mx-auto">
        <SubHeading
          title="Scent is personal. Let them define their own signature"
          className="font-extralight italic lg:text-[40px] text-lg  leading-6 lg:leading-12 text-center"
        />
        <Link href="/giftcard" className="mx-auto">
          <Button className="py-4 px-6 rounded-full cursor-pointer ">
            Gift the Choice
          </Button>
        </Link>
      </div>

      {/* Cards Layout */}
      <div className="w-full h-39.25 md:h-75 lg:h-112.5 lg:mt-19.5 mt-8.5">
        <ProductImage
          src="/all-gift-card.png"
          alt="giftcard"
          fill
          className="object-cover"
        />

        {/* <ProductImage
          className="object-contain w-100 h-100 -mr-32.5 "
          alt="giftcard"
          src="/card-2.png"
          width={439}
          height={439}
        />

    
        <ProductImage
          className="object-contain w-82.75 h-117.5 z-10 hover:scale-105 transition"
          alt="giftcard"
          src="/front-card.png"
          width={331}
          height={470}
        />

  
        <ProductImage
          className="object-contain w-100 h-100 -ml-32.5 z-6"
          alt="giftcard"
          src="/card-3.png"
          width={439}
          height={439}
        />
        <ProductImage
          className="object-contain w-100 h-100 -ml-32.5 "
          alt="giftcard"
          src="/card-4.png"
          width={439}
          height={439}
        /> */}
      </div>
      <TitleSpan
        title="Timeless gifts have no expiration."
        className="pt-8.5 text-[#6F6E6C] text-sm font-normal  leading-5.5 max-w-163.75 mx-auto"
        span=""
      ></TitleSpan>
    </section>
  );
};

export default GiftCard;
