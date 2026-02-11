import React from "react";
import Paragraph from "../ui/typography/paragraph";
import LinkCta from "../ui/btns/link-cta";
import Image from "next/image";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

const TEXT_WRAPPER = "max-w-[600px] mx-auto px-6";

const Wholesale = () => {
  return (
    <section className="">
      <div className="flex flex-col w-full ">
        {/* First Row */}
        <div className="flex flex-col lg:flex-row w-full lg:min-h-178.5 ">
          {/* Image 1 */}
          <div className="w-full lg:flex-1 order-1 lg:order-1">
            <Image
              className="w-full h-full object-cover"
              alt="wholesale"
              src="/wholesale-2.png"
              width={500}
              height={714}
            />
          </div>

          {/* Text 1 */}
          <div className="w-full lg:flex-1 flex items-center py-6 lg:py-0 order-2 lg:order-2">
            <div className={`${TEXT_WRAPPER} lg:text-center space-y-3`}>
              <Paragraph
                content="Every Purchase Earns You Points."
                className="text-[#3B3B3B] font-medium text-[22px] lg:text-[32px] lg:leading-9.5 leading-7"
              />
              <Paragraph
                content="The Signature Club."
                className="text-[#6F6E6C] font-normal text-sm lg:text-lg leading-5.5 lg:leading-7"
              />
            </div>
          </div>
        </div>

        {/* Second Row */}
        <div className="flex flex-col lg:flex-row w-full lg:min-h-178.5">
          {/* Image 2 (comes BEFORE text on mobile) */}
          <div className="w-full lg:flex-1 order-3 lg:order-2">
            <Image
              className="w-full h-full object-cover"
              alt="wholesale"
              src="/wholesale-1.png"
              width={500}
              height={714}
            />
          </div>

          {/* Text 2 */}
          <div className="w-full lg:flex-1 flex items-center py-6 lg:py-0 order-4 lg:order-1">
            <div className={`${TEXT_WRAPPER} lg:text-center space-y-3`}>
              <Paragraph
                content="Interested in Reselling?"
                className="text-[#3B3B3B] font-medium text-[22px] lg:text-[32px] lg:leading-9.5 leading-7"
              />
              <Paragraph
                content="Partner with Presence"
                className="text-[#6F6E6C] font-normal text-sm lg:text-lg leading-5.5 lg:leading-7"
              />
              <Link className=" lg:flex hidden" href="/contact-us">
                <LinkCta
                  label="Contact Us"
                  className="w-40 mt-6 bg-[#3B3B3B] text-white"
                />
              </Link>
              <Link
                href="/contact-us"
                className="flex gap-1.5 lg:hidden items-center text-sm font-normal text-[#3B3B3B]"
              >
                <span className="">Contact us</span>
                <ChevronRight size={18} className="" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Wholesale;
