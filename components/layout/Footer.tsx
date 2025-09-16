import React from "react";
import SubHeading from "../ui/typography/subHeading";
import TitleSpan from "../ui/typography/title-span";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { ArrowUpRight } from "lucide-react";
import { footerLinks } from "@/constant/data";
import Link from "next/link";
import ProductImage from "../ui/images/product-image";
import Logo from "../ui/logo"; // 👈 import your Logo component
import Paragraph from "../ui/typography/paragraph";
import Caption from "../ui/typography/caption";

const Footer = () => {
  return (
    <footer className="">
      {/* Top newsletter section */}
      <div className="footer_background pb-[69px]">
        <div className="max-w-[723px] flex flex-col justify-center items-center mx-auto pt-[70px]">
          <SubHeading
            title="Be the first to know!"
            className=" text-white font-PPEditorialNew font-normal text-[32px] leading-[38px] text-center "
          />

          <TitleSpan
            title="Receive our exclusive offers, new product launches, beauty advice. By signing up, you consent to our "
            className="text-[#F5F5F5] font-normal text-sm leading-[22px] pt-[6px] "
            span="privacy policy."
          />
          <div className="flex items-center w-[488px] mt-[34px] border border-white rounded-full">
            <Input
              className="flex-1 py-[22px] rounded-full border-0 text-sm text-[#F5F5F5] font-normal bg-transparent px-4"
              placeholder="enter your email address"
            />
            <Button className="bg-white rounded-full size-[40px] shadow-[0px_16px_40px_-12px_#12121226] flex items-center justify-center">
              <ArrowUpRight className="size-[22.22px] text-[#3B3B3B]/50" />
            </Button>
          </div>
        </div>
      </div>
      <div className="bg-black px-16 py-[29px]">
        <div className=" text-white  grid grid-cols-2 md:grid-cols-6 items-start gap-y-[70px]">
          <div className="col-span-2 md:col-span-1 flex flex-col  max-w-[189px]">
            <Logo width={134.48} height={50} />
            <Paragraph
              content="Clean, conscious fragrances that truly leave an impression."
              className="text-[#6F6E6C] font-normal text-[10px] leading-[14px] mt-4"
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
                    ? "flex items-center gap-4"
                    : "space-y-4"
                }`}
              >
                {section.items.map((item, i) => (
                  <li
                    key={i}
                    className={`flex items-center ${
                      "href" in item
                        ? "text-base text-[#6F6E6C] font-normal"
                        : ""
                    }`}
                  >
                    {"href" in item ? (
                      <Link
                        href={item.href}
                        className="text-[#F5F5F5] text-sm hover:underline"
                      >
                        {item.name}
                      </Link>
                    ) : (
                      <ProductImage
                        alt={item.name}
                        src={item.src}
                        width={item.width}
                        height={28}
                        className="object-contain"
                      />
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="border border-[#3B3B3B] w-full   mt-[50px]" />

        <p className="text-[10px] text-[#6F6E6C] font-normal pt-6">
          © {new Date().getFullYear()} Serena Braide, All Rights Reserved
        </p>
      </div>
    </footer>
  );
};

export default Footer;
