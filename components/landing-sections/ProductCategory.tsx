"use client";
import React from "react";
import Masonry from "react-masonry-css";
import SubHeading from "../ui/typography/subHeading";
import { productCategories } from "@/constant/data";
import ProductImage from "../ui/images/product-image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";

const breakpointColumnsObj = {
  default: 3,
  1024: 3,
  768: 2,
  500: 1,
};

const ProductCategory = () => {
  return (
    <section className="lg:px-16 lg:py-12.5 py-6 bg-[#FAF5EF]">
      <SubHeading
        title="Our Product Categories"
        className="text-[#3B3B3B] font-extralight italic lg:text-[40px] text-lg text-center"
      />

      {/* Desktop/Tablet: Masonry Layout */}
      <div className="hidden lg:block">
        <Masonry
          breakpointCols={breakpointColumnsObj}
          className="flex xl:gap-5 gap-2 mt-12.5"
          columnClassName="space-y-5"
        >
          {productCategories.map((product, index) => (
            <div key={index}>
              <ProductImage
                className="w-full lg:w-72.5 xl:w-106 "
                src={product.src}
                alt={product.name}
                width={424}
                height={product.height}
              />
            </div>
          ))}
        </Masonry>
      </div>

      {/* Mobile: Carousel */}
      <div className="lg:hidden mt-6">
        <Carousel className="w-full">
          <CarouselContent className="ml-4">
            {productCategories.map((product, index) => (
              <CarouselItem key={index} className=" -basis-3/4">
                <ProductImage
                  className="w-62.5 h-81.75"
                  src={product.src}
                  alt={product.name}
                  width={250}
                  height={327}
                />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  );
};

export default ProductCategory;
