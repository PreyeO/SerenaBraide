import React from "react";
import ProductImage from "../ui/images/product-image";
import AuthSpan from "../ui/typography/auth-span";
import { Sparkle } from "lucide-react";
import Paragraph from "../ui/typography/paragraph";
import Image from "next/image";

const Story = () => {
  return (
    <section className=" font-normal">
      <div className="grid lg:grid-cols-2  grid-cols-1">
        <div className="flex flex-col items-center  justify-center lg:gap-37.5 gap-10 pt-10 lg:pt-37.5 pb-10 lg:pb-26.75">
          <div className="max-[235px] flex flex-col gap-6 items-center px-7.5 ">
            <Sparkle className="size-7.5" fill="#3B3B3B" stroke="none" />
            <AuthSpan className=" text-[32px] max-w-78.75  leading-9.5 text-center">
              Essentials designed with intention,
              <span className="font-PPEditorialNew italic text-[#3B3B3B]">
                never excess
              </span>
            </AuthSpan>
          </div>
          <div className="flex flex-col lg:gap-12.5 gap-10 items-center text-center  ">
            <ProductImage
              alt="about us image"
              src="/about-image5.png"
              height={250}
              width={300}
              className="max-w-75 h-full"
            />
            <Paragraph
              className="px-6 lg:text-base text-sm leading-5.5 font-normal lg:leading-6 max-w-125 text-[#6F6E6C]"
              content="SerenaBraide was born from a lifelong sensitivity to scent.
From childhood, fragrance held meaning, it marked moments, shaped memory, and expressed identity without words."
            />
            <Paragraph
              className="px-6  lg:text-base text-sm leading-5.5 font-normal lg:leading-6 max-w-125 text-[#6F6E6C]"
              content="As that understanding deepened, beauty followed naturally. Not as transformation, but as completion. Small rituals. Finishing touches. Presence refined."
            />
          </div>
        </div>
        <div className="relative w-full h-142.25 lg:h-full">
          <Image
            src="/about-image2.png"
            alt="about us image"
            fill
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
};

export default Story;
