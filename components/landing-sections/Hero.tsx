import React from "react";
import { Button } from "../ui/button";
import Image from "next/image";
import { pros } from "@/constant/data";
import Heading from "../ui/typography/heading";
import Paragraph from "../ui/typography/paragraph";

const Hero = () => {
  return (
    <section className="hero_background font-GeneralSans  pt-56.5 ">
      <div className="px-16">
        {/* Top line + small text */}
        <div className="flex items-center w-62.5 gap-[10px">
          <span className="border-[0.8px] border-[#F5F5F5] w-15"></span>
          <h3 className="text-sm font-light leading-6.25 text-[#F5F5F5] w-45 pl-2 tracking-[10%]">
            AN EXPLORATION OF DREAMS AND BLENDS
          </h3>
        </div>

        {/* Heading + description */}
        <div className="mt-50 text-white w-131 flex flex-col gap-6">
          <Heading
            title="   Start your summer adventure!"
            className="text-[60px] leading-15 font-normal"
          />

          <Paragraph
            className="text-[22px] leading-7 font-light"
            content="Your favorite scent for less, Fragrances like no other"
          />
        </div>

        <Button className="bg-white text-[#3B3B3B] rounded-full py-6 px-4 font-normal text-sm mt-12.5">
          Explore all products
        </Button>
        <div className="flex justify-end">
          <Image src="/dots.svg" alt="dots" width={78} height={30} />
        </div>

        <div className="mt-7.5 mx-auto flex justify-center">
          <Image src="/gif.svg" alt="gif" width={35} height={59} />
        </div>
      </div>
      <div className="h-25 text-[#989898] font-normal text-sm items-center bg-[#141210]/50 backdrop-blur-[40%] flex justify-evenly  mt-9 ">
        {pros.map((item, index) => (
          <div
            key={index}
            className="flex flex-col gap-1.25 max-w-37.5 items-center"
          >
            <Image src={item.src} alt={item.name} width={35} height={35} />
            <h3>{item.name}</h3>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Hero;
