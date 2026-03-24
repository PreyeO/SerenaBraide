"use client";

import React from "react";
import SubHeading from "../ui/typography/subHeading";
import ProductImage from "../ui/images/product-image";
import TitleSpan from "../ui/typography/title-span";
import { Button } from "../ui/button";
import Link from "next/link";

const GiftCard = () => {
  const cards = [
    { id: 1, src: "/giftcard-1.png" },
    { id: 2, src: "/giftcard-2.png" },
    { id: 3, src: "/giftcard-3.png" },
    { id: 4, src: "/giftcard-4.png" },
  ];

  return (
    <section className="lg:px-16 lg:py-12.5 px-6 py-6 pb-8.5">
      {/* Heading + CTA */}
      <div className="flex flex-col max-w-131.5 pt-5 lg:gap-8.5 gap-4 mx-auto">
        <SubHeading
          title="Scent is personal. Let them define their own signature"
          className="font-extralight italic lg:text-[40px] text-lg leading-6 lg:leading-12 text-center"
        />

        {/* Optional: link to a general gift card page */}
        <Link href="/gift-cards" className="mx-auto">
          <Button className="py-4 px-6 rounded-full cursor-pointer">
            Gift the Choice
          </Button>
        </Link>
      </div>

      {/* Cards Layout */}
      <div className="relative flex flex-wrap justify-center items-center lg:mt-24 mt-12 px-2 lg:px-0">
        {cards.map((card, index) => {
          // Define rotations and offsets for a premium "scattered" look
          const styles = [
            {
              rotate: "-rotate-6",
              zIndex: "z-10",
              translate: "lg:-mr-12 -mb-8 lg:mb-0",
            },
            { rotate: "rotate-3", zIndex: "z-20", translate: "lg:-mt-8" },
            {
              rotate: "-rotate-2",
              zIndex: "z-30",
              translate: "lg:-ml-8 lg:mt-4",
            },
            {
              rotate: "rotate-6",
              zIndex: "z-40",
              translate: "lg:-ml-12 lg:-mt-4",
            },
          ][index] || { rotate: "rotate-0", zIndex: "z-10", translate: "" };

          return (
            <div
              key={card.id}
              className={`relative group cursor-pointer transition-all duration-500 ease-out 
                hover:z-50 hover:-translate-y-4 hover:scale-105 active:scale-95
                ${styles.rotate} ${styles.zIndex} ${styles.translate}
                w-37 md:w-60 lg:w-75 xl:w-82.75
              `}
            >
              <div className="relative overflow-hidden rounded-xl shadow-xl transition-shadow duration-500 group-hover:shadow-2xl group-hover:shadow-black/20">
                <ProductImage
                  src={card.src}
                  alt={`giftcard-${card.id}`}
                  width={331}
                  height={150}
                  className="object-contain w-full h-auto"
                />
                {/* Modern subtle overlay */}
                <div className="absolute inset-0 bg-linear-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer Text */}
      <TitleSpan
        title="Timeless gifts have no expiration."
        className="pt-8.5 text-[#6F6E6C] text-sm font-normal leading-5.5 max-w-163.75 mx-auto text-center"
        span=""
      />
    </section>
  );
};

export default GiftCard;
