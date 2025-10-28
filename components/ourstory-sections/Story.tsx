import React from "react";
import ProductImage from "../ui/images/product-image";
import AuthSpan from "../ui/typography/auth-span";
import { Sparkle } from "lucide-react";
import Paragraph from "../ui/typography/paragraph";

const Story = () => {
  return (
    <section className="bg-[#F5F5F5] font-normal">
      <div className="grid grid-cols-2">
        <div className="flex flex-col items-center justify-center gap-[150px]">
          <div className="max-[235px] flex flex-col gap-[24px] items-center">
            <Sparkle className="size-[30px]" fill="#3B3B3B" stroke="none" />
            <AuthSpan className=" text-[32px] max-w-[315px]  leading-[38px] text-center">
              Honest products that truly work
              <span className="font-PPEditorialNew italic text-[#3B3B3B]">
                no exceptions!{" "}
              </span>
            </AuthSpan>
          </div>
          <div className="flex flex-col gap-[50px] items-center text-center">
            <ProductImage
              alt="about us image"
              src="/about-image5.png"
              height={250}
              width={300}
              className="max-w-[300px] h-full"
            />
            <Paragraph
              className="text-base font-normal leading-6 max-w-[500px] text-[#6F6E6C]"
              content="For 30 years we have been selling the widest range of women's perfumes 
            and men's aftershaves at affordable prices. We stock the fragrances of nearly 130 
            brands including Hugo Boss, Paco Rabanne, Gucci, Ariana Grande, Mugler and Marc 
            Jacobs both online and across our network of over 215 nationwide stores. W
            e also stock the luxury perfume brands Dior, Tom Ford, Viktor & Rolf, Hermès 
            and Maison Margiela."
            />
          </div>
        </div>
        <ProductImage
          alt="about us image"
          src="/about-image2.png"
          height={402.48}
          width={805.37}
          className="max-w-[720px] h-full"
        />
      </div>
    </section>
  );
};

export default Story;
