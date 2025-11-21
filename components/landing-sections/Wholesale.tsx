import React from "react";
import ProductImage from "../ui/images/product-image";
import Paragraph from "../ui/typography/paragraph";
import LinkCta from "../ui/btns/link-cta";

const Wholesale = () => {
  return (
    <section className="py-[50px] bg-white">
      <div className="flex flex-col w-full">
        {/* First Row */}
        <div className="flex items-center w-full">
          {/* Left Image */}
          <div className="flex-1">
            <ProductImage
              className="object-cover w-full h-full"
              alt="wholesale"
              src="/wholesale-2.png"
              width={500}
              height={714}
            />
          </div>
          {/* Right Text */}
          <div className="flex-1 flex flex-col gap-[6px] text-center">
            <div className="w-[600px] mx-auto">
              <Paragraph
                content="Every Purchase Earns You Points"
                className="text-[#3B3B3B] font-medium text-[32px] leading-[38px]"
              />
              <Paragraph
                content="Shop your favorite scents and collect points automatically—rewarding you with savings on future orders."
                className="text-[#6F6E6C] font-normal text-[22px] leading-[28px] "
              />
            </div>
          </div>
        </div>

        {/* Second Row */}
        <div className="flex items-center w-full">
          {/* Left Text */}
          <div className="flex-1 flex flex-col gap-[6px] text-center ">
            <Paragraph
              content="Interested in Reselling?"
              className="text-[#3B3B3B] font-medium text-[32px] leading-[38px]"
            />
            <Paragraph
              content="Join our wholesale program and offer timeless perfumes your customers will love."
              className="text-[#6F6E6C] font-normal text-[22px] leading-[28px]"
            />
            <LinkCta
              label="Contact Us"
              className=" w-[160px] mt-6 bg-[#3B3B3B]  text-white  "
            />
          </div>
          {/* Right Image */}
          <div className="flex-1">
            <ProductImage
              className="object-cover w-full h-full"
              alt="wholesale"
              src="/wholesale-1.png"
              width={500}
              height={714}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Wholesale;
