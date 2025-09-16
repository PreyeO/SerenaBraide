import React from "react";
import SubHeading from "../ui/typography/subHeading";
import ProductImage from "../ui/images/product-image";
import { Instagram } from "lucide-react";
import UnderlineLink from "../ui/btns/underline-cta";
import Paragraph from "../ui/typography/paragraph";

const ConnectWithUs = () => {
  return (
    <section className="px-16 py-[50px] pb-[350px] bg-white">
      <div className="flex gap-[50px] pt-[51px]">
        <div className="flex items-start">
          <div className="flex flex-col justify-between h-full">
            <ProductImage
              className="object-contain max-w-[247px]"
              alt="product image"
              src="/insta-product-3.png"
              width={247}
              height={180}
            />

            <Paragraph
              content="Get the latest news about perfume tips and new products launch."
              className="text-[#6F6E6C] font-normal text-[12px] w-[220px] leading-[18px] mt-6"
            />
          </div>
        </div>

        <div className="relative flex flex-col mt-20">
          <SubHeading
            title="Connect With Us"
            className="absolute -top-24 left-1/2 -translate-x-1/2 text-[#141210] font-medium text-[54px] leading-[54px] text-center w-[332px] z-20"
          />

          <ProductImage
            className="object-contain max-w-[719px] relative z-10"
            alt="product image"
            src="/insta-product-1.png"
            width={719}
            height={450}
          />
          <div className="absolute -bottom-30 left-1/2 -translate-x-1/2 z-20">
            <SubHeading
              title="On Instagram"
              className=" text-[#141210] font-PPEditorialNew italic font-normal text-[76px] leading-[49px] text-center w-[326px] "
            />

            <UnderlineLink
              href=""
              text="instagram"
              className={`px-1 text-sm text-[#3B3B3B] font-normal border border-[#6F6E6C] py-3 w-[199px] mx-auto relative top-[50px] rounded-full flex items-center justify-center`}
            >
              <span className="absolute right-2 rounded-full bg-[#3B3B3B] size-[40px] flex justify-center items-center">
                <Instagram color="white" className="size-6" />
              </span>
            </UnderlineLink>
          </div>
        </div>

        <div className="flex items-end relative">
          <ProductImage
            className="object-contain max-w-[246px] relative top-61" // 👈 pushes it further down
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
