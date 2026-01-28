import React from "react";
import SubHeading from "../ui/typography/subHeading";
import ProductImage from "../ui/images/product-image";
import { Instagram } from "lucide-react";
import UnderlineLink from "../ui/btns/underline-cta";
import Paragraph from "../ui/typography/paragraph";

const ConnectWithUs = () => {
  return (
    <section className="px-6 lg:px-16 py-6 lg:py-20  ">
      <div className="flex flex-col lg:flex-row lg:gap-6 xl:gap-12.5 items-center justify-center lg:items-start">
        {/* Left Image */}
        <div className="flex-col items-center lg:items-start hidden lg:flex">
          <ProductImage
            className=" object-contain max-w-45 lg:max-w-55 xl:max-w-61.75"
            alt="product image"
            src="/insta-product-3.png"
            width={247}
            height={180}
          />

          <Paragraph
            content="Get the latest news about perfume tips and new products launch."
            className="text-[#6F6E6C] text-xs md:text-sm leading-4.5 mt-6 text-center lg:text-left max-w-55"
          />
        </div>

        {/* Center Content */}
        <div className="relative flex flex-col items-center  mt-6 lg:mt-20">
          <SubHeading
            title="Connect With Us"
            className="
            lg:absolute lg:-top-24   lg:left-1/2 lg:-translate-x-1/2
              text-[#141210] font-medium
              text-[40px] lg:text-[54px]
              leading-10 lg:leading-13.5
              text-center w-43  lg:w-83
              z-20
            "
          />

          <ProductImage
            className=" object-contain w-full xl:max-h-179.75  max-h-51.75 max-w-81.75 xl:max-w-179.75  relative z-10"
            alt="product image"
            src="/insta-product-1.png"
            width={719}
            height={450}
          />

          {/* Bottom CTA */}
          <div className="lg:absolute lg:-bottom-30 lg:left-1/2 lg:-translate-x-1/2 z-20  lg:mt-0">
            <SubHeading
              title="On Instagram"
              className="
                text-[#141210] font-PPEditorialNew italic font-normal
                text-[40px] lg:text-[76px]
                leading-10 lg:leading-12.25
                text-center w-43 lg:w-81.5
              "
            />

            <UnderlineLink
              href=""
              text="instagram"
              className="
                mt-8 lg:mt-12.5
                px-4 text-sm text-[#3B3B3B] font-normal
                border border-[#6F6E6C]
                py-3 w-44 md:w-49.75 mx-auto
                rounded-full flex items-center justify-center
                relative mb-6 lg:mb-0
              "
            >
              <span className="absolute right-2 rounded-full bg-[#3B3B3B] size-10 flex justify-center items-center">
                <Instagram color="white" className="size-6" />
              </span>
            </UnderlineLink>
          </div>
        </div>

        {/* Right Image */}
        <div className="hidden lg:flex items-end relative">
          <ProductImage
            className="object-contain relative top-45 max-w-45 lg:max-w-55 xl:max-w-61.75"
            alt="product image"
            src="/insta-product-2.png"
            width={247}
            height={300}
          />
        </div>
      </div>
    </section>
  );
};

export default ConnectWithUs;
