import React from "react";
import ProductImage from "../ui/images/product-image";
import AuthSpan from "../ui/typography/auth-span";
import { Sparkle } from "lucide-react";
import Paragraph from "../ui/typography/paragraph";
import Image from "next/image";
import SubHeading from "../ui/typography/subHeading";

const Story = () => {
  return (
    <section className=" font-normal">
      <SubHeading
        title="Founder’s Note"
        className="text-[32px] lg:px-8.5 px-6  font-PPEditorialNew font-medium"
      />
      <div className="grid lg:grid-cols-2  grid-cols-1">
        <div className="flex flex-col items-center  justify-center lg:gap-37.5 gap-10 pt-10 lg:pt-37.5 pb-10 lg:pb-26.75">
          <div className="max-[235px] flex flex-col gap-6 items-center px-7.5 ">
            <Sparkle className="size-7.5" fill="#3B3B3B" stroke="none" />
            <AuthSpan className=" text-[32px] max-w-78.75  leading-9.5 text-center">
              I Designed this for the individual
              <span className="font-PPEditorialNew italic text-[#3B3B3B]">
                {" "}
                never the crowd
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
              content="To me, perfume has always been more than a scent. It is a liquid personality. It is the attributes of Identity, Power, and Memory bottled."
            />
            <Paragraph
              className="px-6  lg:text-base text-sm leading-5.5 font-normal lg:leading-6 max-w-125 text-[#6F6E6C]"
              content="I believe that anyone can make an entrance, but not everyone is remembered. That is the signature I wanted to create. Simple. Classy. And designed to linger long after you are gone."
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
