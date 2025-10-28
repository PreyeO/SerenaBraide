import React from "react";
import ProductImage from "../ui/images/product-image";
import AuthSpan from "../ui/typography/auth-span";

const Hero = () => {
  return (
    <section className="pb-[50px] px-[34px] pt-[152px] font-GeneralSans text-[124px] font-normal text-[#3B3B3B]">
      {/* Top Text */}
      <h1 className="">
        <span className="font-PPEditorialNew italic">Be </span>True
      </h1>

      {/* Centered Image */}
      <div className="flex justify-center my-[-40px]">
        <ProductImage
          alt="about us image"
          src="/about-image1.png"
          height={402.48}
          width={805.37}
          className="max-w-[805.37px]"
        />
      </div>

      {/* Bottom Text */}
      <h1 className="text-end">
        <span className="font-PPEditorialNew italic">Be </span>Kind
      </h1>

      {/* Description */}
      <div className="leading-[22px] max-w-[253px] text-[#6F6E6C] text-sm mt-[16px]">
        <AuthSpan>
          Exploring a life written in perfume from the key qualities that color
          the world of{" "}
          <span className="font-PPEditorialNew italic">SERENA BRAIDE </span>
          perfumes.
        </AuthSpan>
      </div>
    </section>
  );
};

export default Hero;
