"use client";

import React, { useState, useEffect } from "react";
import { Button } from "../ui/button";
import Image from "next/image";
import { pros } from "@/constant/data";
import Heading from "../ui/typography/heading";
import Paragraph from "../ui/typography/paragraph";
import Link from "next/link";

const HERO_IMAGES = [
  "/hero-model-1.png",
  "/hero-model-2.png",
  "/hero-model-3.png",
  "/hero-model-4.png",
  "/hero-model-5.png",
  "/hero-model-6.png",
];

const HERO_MOBILE_IMAGES = [
  "/hero-model-mobile-1.png",
  "/hero-model-mobile-2.png",
  "/hero-model-mobile-3.png",
  "/hero-model-mobile-4.png",
  "/hero-model-mobile-5.png",
  "/hero-model-mobile-6.png",
];

const Hero = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === HERO_IMAGES.length - 1 ? 0 : prevIndex + 1,
      );
    }, 20000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative font-GeneralSans pt-50 min-h-screen overflow-hidden">
      {/* Background Carousel */}
      {HERO_IMAGES.map((src, index) => (
        <div
          key={src}
          className={`absolute inset-0 transition-all duration-2000 ease-in-out${
            index === currentImageIndex
              ? "opacity-100 scale-100 blur-0 z-10"
              : "opacity-0 scale-105 blur-sm z-0"
          }`}
        >
          {/* Desktop Image */}
          <Image
            src={src}
            alt={`Hero background ${index + 1}`}
            fill
            className="hidden lg:block object-cover object-left"
            priority={index === 0}
            quality={90}
          />
          {/* Mobile Image */}
          <Image
            src={HERO_MOBILE_IMAGES[index]}
            alt={`Hero background mobile ${index + 1}`}
            fill
            className="lg:hidden object-cover object-left"
            priority={index === 0}
            quality={90}
          />
        </div>
      ))}

      {/* Content Overlay */}
      <div className="relative z-10 lg:px-16 px-6 pb-10">
        {/* Top line + small text */}
        <div className="flex items-center lg:w-62.5 w-47 gap-[10px">
          <span className="border-[0.8px] border-[#F5F5F5] lg:w-15 w-7.5"></span>
          <h3 className="lg:text-sm text-[10px] font-light lg:leading-6.25 leading-3.5 text-[#F5F5F5] lg:w-45 w-37 pl-2 tracking-[10%]">
            FRAGRANCE. BEAUTY. MEMORY.
          </h3>
        </div>

        {/* Heading + description */}
        <div className="lg:mt-50 mt-27 text-white max-w-131 flex flex-col lg:gap-6 gap-4">
          <Heading
            title="Make an entrance. Leave a memory."
            className="lg:text-[60px] text-[32px] lg:leading-15 leading-9.5 font-normal"
          />

          <Paragraph
            className="lg:text-[22px] text-sm lg:leading-7 leading-5.5 font-light"
            content="Fragrance and beauty essentials for the individual. Define your presence."
          />
        </div>
        <Link href="/all-products">
          <Button className="bg-white hover:bg-white text-[#3B3B3B] rounded-full py-6 px-4 font-normal text-sm mt-6 lg:mt-12.5">
            SHOP NOW
          </Button>
        </Link>

        {/* Carousel Dots */}
        <div className="flex justify-end gap-2 mt-6 lg:mt-0">
          {HERO_IMAGES.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                currentImageIndex === index
                  ? "bg-white scale-125"
                  : "bg-white/40 hover:bg-white/60"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        <div className="mt-7.5 mx-auto lg:flex justify-center hidden">
          <Image
            src="/scroll-animation.gif"
            alt="sprout animation"
            width={59}
            height={59}
            className="object-contain"
            unoptimized
          />
        </div>
      </div>
      <div className="hidden relative z-10 h-25 text-[#989898] font-normal text-sm items-center bg-[#141210]/50 backdrop-blur-[40%] lg:flex justify-evenly  mt-9 ">
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
