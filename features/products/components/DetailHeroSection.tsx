"use client";

import SubmitButton from "@/components/ui/btns/submit-cta";
import ProductImage from "@/components/ui/images/product-image";
import Paragraph from "@/components/ui/typography/paragraph";
import SubHeading from "@/components/ui/typography/subHeading";
import { ShoppingBasket, Star } from "lucide-react";
import React, { useState } from "react";
import { singleProduct } from "../data/product.data";
import BackNavigation from "@/components/ui/btns/back-navigation";

const DetailHeroSection = () => {
  const [selectedVariant, setSelectedVariant] = useState<number | null>(null);

  const handleVariantClick = (index: number, status: string) => {
    if (status === "available") {
      setSelectedVariant(index);
    }
  };

  return (
    <section className="pt-[152px] px-16">
      {/* Back Navigation */}

      <BackNavigation href="/categories/fragrances" text="Back to Fragrance" />

      <div className="flex justify-center gap-[60px] mt-[34px]">
        {/* Product Image */}
        <div className="w-full">
          <ProductImage
            alt="Product image"
            src="/product-1.png"
            width={700}
            height={500}
            className="max-w-[700px]"
          />
        </div>

        {/* Product Info */}
        <div className="w-full">
          <div className=" max-w-[382px]">
            <SubHeading
              className="font-PPEditorialNew text-[40px] text-[#3B3B3B] font-normal leading-tight"
              title="Eau du Soir"
            />
            <Paragraph
              className="text-[#6F6E6C] font-normal text-lg mt-2"
              content="A refined, elegant, eternally feminine fragrance."
            />

            {/* Rating */}
            <div className="flex gap-[7px] items-center pt-[15px]">
              <div className="flex text-[#3B3B3B] gap-[3px]">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} fill="#3B3B3B" className="size-[15px]" />
                ))}
              </div>
              <span className="font-medium text-sm underline">200 Views</span>
            </div>
          </div>

          {/* Variants */}
          <div className="grid grid-cols-2 gap-4 mt-[40px] max-w-[382px]">
            {singleProduct.map((item, index) => {
              const isSelected = selectedVariant === index;
              const isOutOfStock = item.status === "out of stock";

              return (
                <span
                  key={index}
                  onClick={() => handleVariantClick(index, item.status)}
                  className={` font-normal text-sm text-[#3B3B3B] w-[163px] h-[83px] border rounded-[5px] flex flex-col justify-center px-4 transition-all duration-200 ${
                    isOutOfStock
                      ? "border-[#C40606] opacity-70 cursor-not-allowed"
                      : isSelected
                      ? "border-[#3B3B3B]"
                      : "border-[#D1D5DB] hover:border-[#3B3B3B] cursor-pointer"
                  }`}
                >
                  <Paragraph content={item.size} className=" " />
                  <Paragraph content={item.price} className=" font-medium " />
                  {isOutOfStock && (
                    <Paragraph
                      content="Out of Stock"
                      className="text-[#C40606]  mt-1 font-medium"
                    />
                  )}
                </span>
              );
            })}
          </div>

          <SubmitButton
            label="Add to Cart"
            loadingLabel="Adding to cart..."
            className="mt-[40px]"
            // isPending={isPending}
            icon={ShoppingBasket}
          />
          <div className="bg-[#F5F5F5] w-full mt-[40px] flex justify-between items-center">
            <ProductImage
              alt="shopping bag icon"
              src="/shop-bag.svg"
              width={85}
              height={90.43}
              className="max-w-[85px]"
            />
            <span className="text-sm leading-[22px] font-normal pr-[15px] ">
              <Paragraph content="16 points = $16.00" className="" />
              <Paragraph
                content="Earn loyalty points with this product"
                className=" font-medium "
              />
            </span>
          </div>
          <Paragraph
            content="Standard Delivery within 3-5 workings days"
            className=" font-normal pt-6  "
          />
        </div>
      </div>
    </section>
  );
};

export default DetailHeroSection;
