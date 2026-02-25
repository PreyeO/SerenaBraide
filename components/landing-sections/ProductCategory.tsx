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
} from "@/components/ui/carousel";
import Image from "next/image";
import { ShoppingCart } from "lucide-react";

const breakpointColumnsObj = {
  default: 3,
  1024: 3,
  768: 2,
  500: 1,
};

const ProductCategory = () => {
  return (
    <section className="lg:px-16 lg:py-12.5 py-6 bg-[#FAF5EF] ">
      <SubHeading
        title="Our Products"
        className="text-[#3B3B3B] font-extralight italic lg:text-[40px] text-lg text-center"
      />

      {/* Desktop/Tablet: Masonry Layout */}
      <div className="hidden lg:block">
        <Masonry
          breakpointCols={breakpointColumnsObj}
          className="flex  gap-2 lg:gap-5 mt-12.5"
          columnClassName="space-y-5"
        >
          {productCategories.map((product, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-[15px] cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
            >
              <Image
                className="w-full lg:w-72.5 xl:w-106 transition-transform duration-500 ease-out group-hover:scale-110"
                src={product.src}
                alt={product.name}
                width={424}
                height={product.height}
              />

              {/* Dark overlay on hover */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300" />

              {/* Shop Now badge — slides up on hover */}
              <div className="absolute bottom-0 left-0 right-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out">
                <div className="bg-[#3B3B3B] text-white flex items-center justify-center gap-2 py-3 px-4">
                  <ShoppingCart className="w-4 h-4" strokeWidth={2} />
                  <span className="text-sm font-medium tracking-wide">
                    Shop Now
                  </span>
                </div>
              </div>
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
                <div className="relative overflow-hidden rounded-[15px]">
                  <ProductImage
                    className="w-62.5 h-81.75"
                    src={product.src}
                    alt={product.name}
                    width={250}
                    height={327}
                    imageClassName="w-62.5 h-81.75"
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  );
};

export default ProductCategory;

