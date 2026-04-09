"use client";

import React from "react";
import SubHeading from "../ui/typography/subHeading";
import TitleSpan from "../ui/typography/title-span";
import { Button } from "../ui/button";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

const GiftCard = () => {
  const cards = [
    {
      id: 1,
      src: "/giftcard-1.png",
      desktop: { x: -260, y: -20, rotate: -18 },
      mobile: { x: -35, y: -10, rotate: -10, scale: 0.85 },
    },
    {
      id: 2,
      src: "/giftcard-3.png",
      desktop: { x: -85, y: -60, rotate: -6, scale: 1.05 },
      mobile: { x: 0, y: -25, rotate: 0, scale: 1.05 },
    },
    {
      id: 3,
      src: "/giftcard-2.png",
      desktop: { x: 85, y: -60, rotate: 6, scale: 1.05 },
      mobile: { x: 35, y: -10, rotate: 10, scale: 0.85 },
    },
    {
      id: 4,
      src: "/giftcard-4.png",
      desktop: { x: 260, y: -20, rotate: 18 },
      mobile: { x: 45, y: 10, rotate: 15, scale: 0.8 },
    },
  ];

  return (
    <section className="lg:px-16 lg:py-16 px-6 py-10 overflow-hidden bg-white/5">
      {/* Heading + CTA */}
      <div className="flex flex-col max-w-131.5 pt-2 lg:gap-6 gap-4 mx-auto relative z-10 text-center">
        <SubHeading
          title="Scent is personal. Let them define their own signature"
          className="font-extralight italic lg:text-[42px] text-2xl leading-tight lg:leading-[1.2] text-primary/90"
        />

        <Link href="/gift-cards" className="mx-auto">
          <Button className="py-5 px-10 rounded-full cursor-pointer hover:scale-110 active:scale-95 transition-all duration-300 shadow-lg hover:shadow-primary/20 text-lg font-light tracking-wide">
            Gift the Choice
          </Button>
        </Link>
      </div>

      {/* Cards Layout */}
      <div className="relative flex justify-center items-center lg:mt-48 mt-16 lg:min-h-62.5 min-h-12.5  perspective-distant">
        {/* Desktop View: Auto-fan on Scroll */}
        <div className="hidden lg:flex relative justify-center items-center w-full">
          {cards.map((card, idx) => (
            <motion.div
              key={card.id}
              initial={{ x: 0, y: 0, rotate: 0, zIndex: 10 + idx }}
              whileInView={{
                x: card.desktop.x,
                y: card.desktop.y,
                rotate: card.desktop.rotate,
                scale: card.desktop.scale || 1,
                zIndex: idx === 1 || idx === 2 ? 40 : 20,
              }}
              viewport={{ once: false, amount: 0.4 }}
              transition={{
                type: "spring",
                stiffness: 70,
                damping: 15,
                delay: idx * 0.05,
              }}
              className="absolute w-112.5 cursor-pointer"
            >
              <div className="relative rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.12)] hover:shadow-[0_30px_60px_rgba(0,0,0,0.18)] transition-all duration-500 hover:-translate-y-4 hover:scale-105">
                <Image
                  src={card.src}
                  alt={`giftcard-${card.id}`}
                  width={450}
                  height={200}
                  className="w-full h-auto rounded-2xl"
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Mobile View: Tighter Spacing & Auto-fan */}
        <div className="lg:hidden relative w-full flex justify-center h-32">
          {cards.slice(0, 3).map((card, idx) => (
            <motion.div
              key={`mobile-${card.id}`}
              initial={{ x: 0, y: 0, rotate: 0 }}
              whileInView={{
                x: card.mobile.x,
                y: card.mobile.y,
                rotate: card.mobile.rotate,
                scale: card.mobile.scale,
              }}
              viewport={{ once: false, amount: 0.6 }}
              transition={{
                type: "spring",
                stiffness: 80,
                damping: 18,
                delay: idx * 0.1,
              }}
              className={`absolute w-56 transition-all duration-500
                ${idx === 0 ? "rotate-[-8deg] -translate-x-6 z-10" : ""}
                ${idx === 1 ? "rotate-0 z-30 scale-105" : ""}
                ${idx === 2 ? "rotate-[8deg] translate-x-6 z-20" : ""}
              `}
            >
              <Image
                src={card.src}
                alt={`giftcard-${card.id}`}
                width={300}
                height={135}
                className="w-full h-auto rounded-xl shadow-xl border border-white/5"
              />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Footer Text */}
      <TitleSpan
        title="Timeless gifts have no expiration."
        className="pt-4 text-[#6F6E6C] text-sm font-light tracking-widest uppercase max-w-163.75 mx-auto text-center opacity-70"
        span=""
      />
    </section>
  );
};

export default GiftCard;
