import React from "react";
import AuthSpan from "../ui/typography/auth-span";
import Paragraph from "../ui/typography/paragraph";
import Caption from "../ui/typography/caption";
import { icons } from "@/constant/data";
import Image from "next/image";

const Philosophy = () => {
  return (
    <section className=" font-normal  w-full">
      <div className="lg:px-16 px-6 lg:py-22 py-10 flex flex-col ">
        <AuthSpan className=" text-[32px] lg:text-[54px] max-w-132.25  lg:leading-14.75 text-center">
          Our
          <span className="font-PPEditorialNew italic text-[#3B3B3B]">
            {" "}
            Philosophy
          </span>{" "}
        </AuthSpan>
        <div className="order-2 lg:order-2  lg:leading-6 leading-5.5 max-w-116  lg:pt-12.5 pt-8.5 flex flex-col mx-auto">
          <Paragraph
            className="lg:text-base text-sm font-normal text-[#6F6E6C]"
            content="Everything at SerenaBraide is created with intention."
          />

          <Paragraph
            className="lg:text-base text-sm font-normal text-[#6F6E6C]"
            content="Ingredients are chosen with care.
Formulations are thoughtful, not excessive.
Packaging is considered, not loud."
          />
          <Paragraph
            className="lg:text-base pt-2.5 text-sm font-normal text-[#6F6E6C]"
            content="Nothing exists to impress. Everything exists to last."
          />
        </div>
        <div className="pt-6 lg:pt-0 order-1 lg:order-3 rounded-full size-12.5 bg-[#F5F5F5] flex items-center justify-center ">
          <Image
            src="/sprout-animation.gif"
            alt="sprout animation"
            width={40}
            height={40}
            className="object-contain"
            unoptimized
          />
        </div>
      </div>

      <div className="relative w-full h-93.75 lg:h-125">
        <Image
          src="/about-image3.png"
          alt="about us image"
          fill
          className="object-cover"
        />
      </div>

      <div className="grid lg:grid-cols-4 grid-cols-2 lg:gap-37.5 gap-10 lg:justify-center py-19.25 px-10.5 lg:px-30 xl:px-58.25">
        {icons.map(({ id, Icon, description }) => (
          <div key={id} className="flex flex-col items-center gap-[15.5px]">
            <div className="rounded-full size-25 bg-[#F5F5F5] flex items-center justify-center">
              <Icon className="size-7.5" color="#3B3B3B" />
            </div>
            <Caption
              className="text-[12px] font-normal leading-4.5 text-[#3B3B3B] text-center max-w-32.75"
              title={description}
            />
          </div>
        ))}
      </div>
      <div className="grid lg:grid-cols-2 grid-cols-1 w-full gap-0">
        <div className="flex gap-1.5 flex-col items-center justify-center text-center bg-black  px-5.5 py-10 h-93.75 lg:h-125">
          <AuthSpan className=" text-[32px] max-w-83 text-[#FFFFFF] font-medium  leading-9.5 text-center">
            From scent to beauty essentials, every detail reflects the same
            belief:
            <span className="font-PPEditorialNew italic  font-normal">
              presence should feel natural.
            </span>{" "}
          </AuthSpan>

          <Paragraph
            className="text-[#F5F5F5] font-normal lg:text-base text-sm leading-5.5 lg:leading-6 max-w-150"
            content="SerenaBraide is designed to sit quietly on the skin and stay in memory."
          />
        </div>

        <div className="relative w-full h-93.75 lg:h-125">
          <Image
            src="/about-image4.png"
            alt="about us image"
            fill
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
};

export default Philosophy;
