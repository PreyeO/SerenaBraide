import React from "react";
import AuthSpan from "../ui/typography/auth-span";
import Paragraph from "../ui/typography/paragraph";
import { Sprout } from "lucide-react";
import ProductImage from "../ui/images/product-image";
import Caption from "../ui/typography/caption";
import { icons } from "@/constant/data";

const Philosophy = () => {
  return (
    <section className=" font-normal  w-full pb-[50px]">
      <div className="px-16 py-[88px] ">
        <AuthSpan className=" text-[54px] max-w-[529px]  leading-[59px] text-center">
          Clean Ingredients,
          <span className="font-PPEditorialNew italic text-[#3B3B3B]">
            {" "}
            Radical
          </span>{" "}
          Transparency.
        </AuthSpan>
        <div className="text-base font-normal leading-6 max-w-[464px] text-[#6F6E6C] pt-[50px] flex flex-col mx-auto">
          <Paragraph
            className=""
            content="We formulate to the highest standards of efficacy and safety – using only proven, 
              verified ingredientsin bio-compatible bases; and free from over 1800 questionable ingredients."
          />

          <Paragraph
            className=""
            content="With no black boxes, and nothing to hide, we strive for radical 
           
          formulation transparency, so you will never have to guess what and how much of it is in the products you use."
          />
        </div>
        <div className="rounded-full size-[50px] bg-[#F5F5F5] flex items-center justify-center">
          <Sprout fill="#55A630" color="#55A630" className="size-[40px] " />
        </div>
      </div>
      <ProductImage
        alt="images of our products"
        src="/about-image3.png"
        height={402.48}
        width={805.37}
        className="w-full h-full"
      />
      <div className="flex gap-[150px] justify-center py-[77px]">
        {icons.map(({ id, Icon, description }) => (
          <div key={id} className="flex flex-col items-center gap-[15.5px]">
            <div className="rounded-full size-[100px] bg-[#F5F5F5] flex items-center justify-center">
              <Icon className="size-[30x]" color="#3B3B3B" />
            </div>
            <Caption
              className="text-[12px] font-normal leading-[18px] text-[#3B3B3B] text-center max-w-[131px]"
              title={description}
            />
          </div>
        ))}
      </div>
      <div className="grid grid-cols-2 bg-black   ">
        <div className="flex flex-col items-center justify-center text-center">
          <AuthSpan className=" text-[32px] max-w-[332px] text-[#FFFFFF] font-medium  leading-[38px] text-center">
            Thoughtful Packaging, Carefully
            <span className="font-PPEditorialNew italic  font-normal">
              {" "}
              Crafted
            </span>{" "}
            .
          </AuthSpan>

          <Paragraph
            className="text-[#F5F5F5] font-normal text-base leading-6 max-w-[600px]"
            content="We formulate to the highest standards of efficacy and safety – 
            using only proven, verified ingredients in bio-compatible bases; and free 
            from over 1800 questionable ingredients."
          />
        </div>
        <ProductImage
          alt="images of our products"
          src="/about-image4.png"
          height={402.48}
          width={805.37}
          className="w-full h-full"
        />
      </div>
    </section>
  );
};

export default Philosophy;
