import React from "react";
import ProductImage from "../ui/images/product-image";
import AuthSpan from "../ui/typography/auth-span";

const Hero = () => {
  return (
    <section className="pb-12.5 lg:px-8.5 px-6  pt-38 font-GeneralSans text-[55px] lg:text-[124px] font-normal text-[#3B3B3B]">
      <h1 className="pb-5 md:text-start text-center md:pb-0">
        <span className="font-PPEditorialNew italic">Be </span>True
      </h1>

      <div className="flex justify-center lg:-my-10">
        <ProductImage
          alt="about us image"
          src="/about-image1.png"
          height={402.48}
          width={805.37}
          className="lg:max-w-[805.37px] hidden lg:block"
        />
        <ProductImage
          alt="about us image"
          src="/about-image1.png"
          height={150}
          width={300}
          className="max-w-75  lg:hidden  "
        />
      </div>

      {/* Bottom Text */}
      <h1 className="md:text-end text-center md:pt-0 pt-5">
        <span className="font-PPEditorialNew italic">Be </span>Kind
      </h1>

      {/* Description */}
      <div className="leading-5.5 max-w-63.25 text-[#6F6E6C] text-sm mt-4">
        <AuthSpan>
          Scent. Beauty. Presence.
          <span className="font-PPEditorialNew italic"> SERENA BRAIDE </span>
          is a personal world shaped by memory, identity, and quiet confidence.
        </AuthSpan>
      </div>
    </section>
  );
};

export default Hero;
