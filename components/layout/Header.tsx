"use client";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { headerAdvert, currencies } from "@/constant/data";
import Link from "next/link";
import SubHeading from "../ui/typography/subHeading";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";
import { ChevronDownIcon } from "lucide-react";

const Header = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedCurrency, setSelectedCurrency] = useState(currencies[0]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) =>
        prev === headerAdvert.length - 1 ? 0 : prev + 1
      );
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const currentAd = headerAdvert[currentIndex];

  const renderText = () => {
    if (currentAd.link && currentAd.text.includes(currentAd.link.label)) {
      const [before, after] = currentAd.text.split(currentAd.link.label);
      return (
        <>
          {before}
          <Link
            href={currentAd.link.href}
            className="underline underline-offset-2 hover:text-gray-300"
          >
            {currentAd.link.label}
          </Link>
          {after}
        </>
      );
    }

    return currentAd.text;
  };

  return (
    <div className="bg-[#3B3B3B] h-[50px] w-full fixed top-0 left-0 z-50 flex items-center justify-center md:justify-between px-4 text-white text-sm">
      <div className="absolute md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2">
        <AnimatePresence mode="wait">
          <motion.span
            key={currentIndex}
            initial={{ y: "100%", opacity: 0, rotateX: 90 }}
            animate={{ y: "0%", opacity: 1, rotateX: 0 }}
            exit={{ y: "-100%", opacity: 0, rotateX: -90 }}
            transition={{ duration: 0.6 }}
          >
            {renderText()}
          </motion.span>
        </AnimatePresence>
      </div>

      {/* Right section */}
      <div className="ml-auto items-center gap-[23px] hidden md:flex">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center gap-1 outline-none">
              {selectedCurrency?.src && (
                <Image
                  src={selectedCurrency.src}
                  alt={selectedCurrency.name}
                  className="rounded-full"
                  width={18}
                  height={18}
                />
              )}
              <span className="flex items-center gap-1">
                {selectedCurrency.name}
                <ChevronDownIcon className="w-4 h-4 ml-1 text-white" />
              </span>
            </button>
          </DropdownMenuTrigger>

          <DropdownMenuContent className="bg-white text-black cursor-pointer">
            {currencies.map((currency) => (
              <DropdownMenuItem
                key={currency.name}
                onClick={() => setSelectedCurrency(currency)}
              >
                <div className="flex items-center gap-2">
                  {currency.src && (
                    <Image
                      src={currency.src}
                      alt={currency.name}
                      width={18}
                      height={18}
                      className="rounded-full"
                    />
                  )}
                  <span>{currency.name}</span>
                </div>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        <SubHeading
          className="font-GeneralSans leading-[22px] font-normal text-sm"
          title="Contact Us"
        />
      </div>
    </div>
  );
};

export default Header;
