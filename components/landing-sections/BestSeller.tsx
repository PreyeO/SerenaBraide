import React from "react";
import RecommendationCarousel from "@/features/products/components/shared/RecommendationCarousel";
import UnderlineLink from "../ui/btns/underline-cta";
import { ChevronRight } from "lucide-react";
import SubHeading from "../ui/typography/subHeading";

const BestSeller = () => {
  return (
    <section className="lg:px-16 px-6 lg:py-12.5 py-6 bg-black">
      <div className="flex flex-col">
        <SubHeading
          title="Our Best Sellers"
          className="font-extralight italic lg:text-[40px] text-lg text-center pt-5 text-white font-PPEditorialNew"
        />
      </div>
      <div className="gap-2.5 items-center justify-end hidden lg:flex">
        <UnderlineLink
          href="/all-products"
          text="Shop More Best Sellers"
          className="text-[12px] text-white"
        />
        <ChevronRight size={24} className="text-white" />
      </div>
      {/* <ProductSection
      title="Best Sellers"
      linkText="Shop More Best Sellers"
      linkHref="/best-sellers"
      bgColor="bg-black"
      categories={categories}
      productDisplay={productDisplay}
    /> */}
      <RecommendationCarousel className="text-white" />
      <div className="gap-2.5 items-center justify-center flex lg:hidden">
        <UnderlineLink
          href="/all-products"
          text="Shop More Best Sellers"
          className="text-[12px] text-white"
        />
        <ChevronRight size={24} className="text-white" />
      </div>
    </section>
  );
};

export default BestSeller;
