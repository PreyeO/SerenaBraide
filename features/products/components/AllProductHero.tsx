import ProductImage from "@/components/ui/images/product-image";
import Paragraph from "@/components/ui/typography/paragraph";
import SubHeading from "@/components/ui/typography/subHeading";
import React from "react";

const AllProductHero = () => {
  return (
    <section className="pt-38 lg:pb-10 pb-8.5">
      <div className="flex md:justify-between items-center justify-center ">
        <div className="xl:max-w-135.75 md:max-w-100 w-full leading-5.5 font-GeneralSans flex flex-col gap-4">
          <SubHeading
            className="lg:text-[40px] text-[26px] font-normal font-PPEditorialNew text-[#3B3B3B]"
            title="The Collection"
          />

          <Paragraph
            className="text-sm text-[#6F6E6C] font-normal"
            content="Perfumes and lip gloss designed to leave an impression. Find the scent and shine that becomes unmistakably yours"
          />
        </div>

        <div className="md:block hidden relative max-w-95 w-full  rounded-lg overflow-hidden bg-gray-50 shadow-sm">
          <ProductImage
            src="/all-products.png"
            alt="all products"
            width={380}
            height={381}
            imageClassName="object-cover w-full h-full"
          />
        </div>
      </div>
    </section>
  );
};

export default AllProductHero;
