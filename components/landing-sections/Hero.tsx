import React from "react";
import { Button } from "../ui/button";
import Image from "next/image";
import { pros } from "@/constant/data";
import Heading from "../ui/typography/heading";
import Paragraph from "../ui/typography/paragraph";

const Hero = () => {
  return (
    <section className="hero_background  font-GeneralSans  pt-56.5 ">
      <div className="lg:px-16 px-6 pb-10">
        {/* Top line + small text */}
        <div className="flex items-center lg:w-62.5 w-47 gap-[10px">
          <span className="border-[0.8px] border-[#F5F5F5] lg:w-15 w-7.5"></span>
          <h3 className="lg:text-sm text-[10px] font-light lg:leading-6.25 leading-3.5 text-[#F5F5F5] lg:w-45 w-37 pl-2 tracking-[10%]">
            SCENT. BEAUTY. PRESENCE.
          </h3>
        </div>

        {/* Heading + description */}
        <div className="lg:mt-50 mt-27 text-white max-w-131 flex flex-col lg:gap-6 gap-4">
          <Heading
            title="Leave more than an impression."
            className="lg:text-[60px] text-[32px] lg:leading-15 leading-9.5 font-normal"
          />

          <Paragraph
            className="lg:text-[22px] text-sm lg:leading-7 leading-5.5 font-light"
            content="Fragrance and beauty essentials designed to stay on the skin, and in memory."
          />
        </div>

        <Button className="bg-white text-[#3B3B3B] rounded-full py-6 px-4 font-normal text-sm mt-6 lg:mt-12.5">
          Shop the Collection
        </Button>
        <div className="flex justify-end">
          <Image src="/dots.svg" alt="dots" width={78} height={30} />
        </div>

        <div className="mt-7.5 mx-auto lg:flex justify-center hidden">
          <Image src="/gif.svg" alt="gif" width={35} height={59} />
        </div>
      </div>
      <div className="hidden  h-25 text-[#989898] font-normal text-sm items-center bg-[#141210]/50 backdrop-blur-[40%] lg:flex justify-evenly  mt-9 ">
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
