"use client";

import React, { useState, useEffect } from "react";
import { Button } from "../ui/button";
import Image from "next/image";
import { HERO_SLIDES, pros } from "@/constant/data";
import Heading from "../ui/typography/heading";
import Link from "next/link";

const Hero = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  // Promo artwork carries its own headline and button, so the hero's text and
  // SHOP NOW step aside while it's showing.
  const isPromoActive = HERO_SLIDES[currentImageIndex]?.kind === "promo";

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === HERO_SLIDES.length - 1 ? 0 : prevIndex + 1,
      );
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const dots = HERO_SLIDES.map((_, index) => (
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
  ));

  return (
    <section className="relative font-GeneralSans pt-50 min-h-screen overflow-hidden">
      {isPromoActive && (
        <div className="lg:hidden absolute z-20 bottom-8 inset-x-0 flex justify-center gap-2">
          {dots}
        </div>
      )}
      {/* Background Carousel */}
      {HERO_SLIDES.map((slide, index) => {
        const isActive = index === currentImageIndex;
        return (
          <div
            key={`${slide.kind}-${slide.desktop}`}
            aria-hidden={!isActive}
            className={`absolute inset-0 transition-all duration-2000 ease-in-out ${
              isActive
                ? "opacity-100 scale-100 blur-0 z-10"
                : "opacity-0 scale-105 blur-sm z-0 pointer-events-none"
            }`}
          >
            {slide.kind === "promo" ? (
              // Whole artwork, uncropped, pinned just under the fixed nav and kept
              // within the first screen so it's seen in full on arrival; the
              // leftover space falls below it.
              <div
                className="absolute inset-0"
                style={{ background: slide.mobileBackground ?? slide.background }}
              >
                {/* Desktop fill, layered over the phone colour */}
                <div
                  className="absolute inset-0 hidden lg:block"
                  style={{ background: slide.background }}
                />
                <Link
                  href={slide.href}
                  tabIndex={isActive ? 0 : -1}
                  className="absolute inset-x-0 top-0 block h-svh pt-32 lg:pt-36 pb-8 lg:px-16"
                >
                  <span className="relative block w-full h-full max-w-300 mx-auto">
                    <Image
                      src={slide.desktop}
                      alt={slide.alt}
                      fill
                      sizes="(min-width: 1024px) 1200px, 100vw"
                      className="hidden lg:block object-contain object-top"
                      priority={index === 0}
                    />
                    <Image
                      src={slide.mobile}
                      alt={slide.alt}
                      fill
                      sizes="(max-width: 640px) 100vw, 640px"
                      className="lg:hidden object-contain object-top"
                      priority={index === 0}
                    />
                  </span>
                </Link>
              </div>
            ) : (
              <>
                {/* Desktop Image */}
                <Image
                  src={slide.desktop}
                  alt={`Hero background ${index + 1}`}
                  fill
                  className="hidden lg:block object-cover object-top"
                  priority={index === 0}
                  quality={90}
                />
                {/* Mobile Image */}
                <Image
                  src={slide.mobile}
                  alt={`Hero background mobile ${index + 1}`}
                  fill
                  className="lg:hidden object-cover object-right"
                  priority={index === 0}
                  quality={90}
                />
              </>
            )}
          </div>
        );
      })}

      {/* Content Overlay — click-through so a promo slide underneath stays clickable */}
      <div className="relative z-10 lg:px-16 px-6 pb-10 pointer-events-none">
        <div
          aria-hidden={isPromoActive}
          className={`transition-opacity duration-700 ${
            isPromoActive ? "opacity-0" : "opacity-100"
          }`}
        >
        {/* Top line + small text */}
        <div className="flex items-center lg:w-62.5 w-47 gap-[10px">
          <span className="border-[0.8px] border-[#F5F5F5] lg:w-15 w-7.5"></span>
          <h3 className="lg:text-sm text-[10px] font-light lg:leading-6.25 leading-3.5 text-[#F5F5F5] lg:w-45 w-37 pl-2 tracking-[10%]">
            FRAGRANCE. BEAUTY. MEMORY.
          </h3>
        </div>

        {/* Heading + description */}
        <div className="lg:mt-50 mt-40 text-white max-w-131 flex flex-col lg:gap-6 gap-4">
          <Heading
            title="Make an entrance. Leave a memory."
            className="lg:text-[60px] text-[32px] lg:leading-15 leading-9.5 font-normal"
          />
          {/* 
          <Paragraph
            className="lg:text-[22px] text-sm lg:leading-7 leading-5.5 font-light"
            content="Fragrance and beauty essentials for the individual. Define your presence."
          /> */}
        </div>
        <Link
          href="/all-products"
          tabIndex={isPromoActive ? -1 : 0}
          className={isPromoActive ? "pointer-events-none" : "pointer-events-auto"}
        >
          <Button
            tabIndex={-1}
            className="bg-white hover:bg-white text-[#3B3B3B] rounded-full py-6 px-16 font-normal text-sm mt-6 lg:mt-12.5"
          >
            SHOP NOW
          </Button>
        </Link>
        </div>

        {/* Carousel Dots — on phones the promo artwork's own button sits where
            the dots normally are, so during a promo they drop to the bottom
            of the screen instead (see below). */}
        <div
          className={`flex justify-end gap-2 mt-6 lg:mt-0 pointer-events-auto ${
            isPromoActive ? "max-lg:invisible" : ""
          }`}
        >
          {dots}
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
