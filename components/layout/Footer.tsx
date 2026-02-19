import React from "react";
import SubHeading from "../ui/typography/subHeading";
import TitleSpan from "../ui/typography/title-span";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { ArrowUpRight, MessageSquareMore } from "lucide-react";
import { footerLinks } from "@/constant/data";
import Link from "next/link";
import ProductImage from "../ui/images/product-image";
import Logo from "../ui/logo";
import Paragraph from "../ui/typography/paragraph";
import Caption from "../ui/typography/caption";

const Footer = () => {
  return (
    <footer className="lg:mt-30 ">
      {/* Top newsletter section */}
      <div className="footer_background pb-17.25 lg:px-12 px-6">
        <div className="lg:max-w-180.75 flex flex-col justify-center items-center mx-auto pt-17.5">
          <SubHeading
            title="Be the first to know!"
            className=" text-white font-PPEditorialNew font-normal text-[26px] lg:text-[32px] leading-9.5 text-center "
          />

          <TitleSpan
            title="Receive our exclusive offers, new product launches. By signing up, you consent to our "
            className="text-[#F5F5F5] font-normal lg:text-sm text-xs leading-4.5 lg:leading-5.5 pt-1.5 text-center "
            span="privacy policy."
          />
          <div className="flex items-center px-6 lg:px-12 max-w-122 mt-8.5 border border-white rounded-full">
            <Input
              className="flex-1 py-5.5 rounded-full border-0 text-sm text-[#F5F5F5] font-normal bg-transparent lg:px-4"
              placeholder="enter your email address"
            />
            <Button className="bg-white rounded-full size-10 shadow-[0px_16px_40px_-12px_#12121226] flex items-center justify-center">
              <ArrowUpRight className="size-[22.22px] text-[#3B3B3B]/50" />
            </Button>
          </div>
        </div>
      </div>
      <div className="bg-black lg:px-16 px-6 py-7.25">
        <div className="text-white flex flex-col lg:flex-row lg:justify-evenly gap-10 lg:gap-0">
          <div className="col-span-2 md:col-span-1 flex flex-col  max-w-47.25">
            <Logo width={134.48} height={50} />
            <Paragraph
              content="Scents & Beauty for the individual, designed to be remembered."
              className="text-[#6F6E6C] font-normal text-[10px] leading-3.5 mt-4"
            />
          </div>

          {/* 👇 Footer links */}
          {footerLinks.map((section, index) => (
            <div key={index} className="flex flex-col">
              <Caption
                title={section.heading}
                className=" text-[#F5F5F5] font-normal text-sm "
              />
              <ul
                className={`mt-4 ${
                  section.heading === "WE ACCEPT"
                    ? "flex items-center flex-wrap  gap-4 max-w-37.75 "
                    : "space-y-4"
                }`}
              >
                {section.items.map((item, i) => (
                  <li
                    key={i}
                    className={`flex items-center ${
                      "href" in item ? "text-base font-normal" : ""
                    }`}
                  >
                    {"href" in item ? (
                      <Link
                        href={item.href}
                        className=" text-sm hover:underline text-[#6F6E6C] "
                      >
                        {item.name}
                      </Link>
                    ) : (
                      <ProductImage
                        alt={item.name}
                        src={item.src}
                        width={item.width}
                        height={40}
                        className="object-contain rounded-md"
                      />
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="border border-[#3B3B3B] w-full   mt-12.5" />

        <p className="text-[10px] text-[#6F6E6C] font-normal pt-6">
          © {new Date().getFullYear()} Serena Braide, All Rights Reserved
        </p>
      </div>
      {/* Floating message icon */}
      <span className="fixed bottom-6 right-4 z-50">
        <Link
          href="/contact-us"
          aria-label="Contact us"
          className="flex items-center justify-center lg:w-14 lg:h-14 w-12.5 h-12.5 rounded-full bg-[#3A3A3A] shadow-[0px_12px_32px_-8px_rgba(0,0,0,0.6)] hover:scale-105 transition-transform duration-200"
        >
          <MessageSquareMore className="text-white size-7.75" />
        </Link>
      </span>
    </footer>
  );
};

export default Footer;
