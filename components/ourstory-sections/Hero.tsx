import React from "react";
import ProductImage from "../ui/images/product-image";
import AuthSpan from "../ui/typography/auth-span";

const Hero = () => {
  return (
    <section className="pb-12.5 lg:px-8.5 px-6  pt-38 font-GeneralSans font-normal text-[#3B3B3B]">
      <div className=" text-[45px] lg:text-[124px] font-PPEditorialNew italic flex flex-col   leading-[0.9] md:leading-tight ">
        <h1 className="text-center md:text-start max-w-50 md:max-w-full mx-auto md:mx-0 ">
          <span>Wear</span> Identity
        </h1>

        <div className="flex justify-center">
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
            className="max-w-75 lg:hidden  "
          />
        </div>

        {/* Bottom Text */}
        <h1 className="md:text-end text-center mt-2 md:mt-0 ">
          <span className="">Be </span>Remembered
        </h1>
      </div>

      {/* Description */}
      <div className="leading-5.5 max-w-63.25 text-[#6F6E6C] text-sm mt-4">
        <AuthSpan>
          <span className="font-PPEditorialNew italic"> SERENA BRAIDE </span> is
          not just a brand, it is the signature of those who intend to be
          remembered.
        </AuthSpan>
      </div>
    </section>
  );
};

export default Hero;
