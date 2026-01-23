"use client";

import SubmitButton from "@/components/ui/btns/submit-cta";
import ProductImage from "@/components/ui/images/product-image";
import Paragraph from "@/components/ui/typography/paragraph";
import SubHeading from "@/components/ui/typography/subHeading";
import { ShoppingBasket, Star } from "lucide-react";
import React, { useState } from "react";
import { singleProduct } from "../data/product.data";
import BackNavigation from "@/components/ui/btns/back-navigation";
import { useAddToCart } from "@/features/cart-checkout/hooks/useAddToCart";
import { notify } from "@/lib/notify";

const DetailHeroSection = () => {
  // ✅ Store REAL backend variant ID
  const [selectedVariantId, setSelectedVariantId] = useState<number | null>(
    null,
  );

  const { mutate: addToCart, isPending } = useAddToCart();

  // ✅ Pass backend variantId, not array index
  const handleVariantClick = (variantId: number, status: string) => {
    if (status === "available") {
      setSelectedVariantId(variantId);
    }
  };

  return (
    <section className="pt-38 px-16">
      {/* Back Navigation */}
      <BackNavigation href="/categories/fragrances" text="Back to Fragrance" />

      <div className="flex justify-center gap-15 mt-8.5">
        {/* Product Image */}
        <div className="w-full">
          <ProductImage
            alt="Product image"
            src="/product-1.png"
            width={700}
            height={500}
            className="max-w-175"
          />
        </div>

        {/* Product Info */}
        <div className="w-full">
          <div className="max-w-95.5">
            <SubHeading
              className="font-PPEditorialNew text-[40px] text-[#3B3B3B] font-normal leading-tight"
              title="Eau du Soir"
            />

            <Paragraph
              className="text-[#6F6E6C] font-normal text-lg mt-2"
              content="A refined, elegant, eternally feminine fragrance."
            />

            {/* Rating */}
            <div className="flex gap-1.75 items-center pt-3.75">
              <div className="flex text-[#3B3B3B] gap-0.75">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} fill="#3B3B3B" className="size-3.75" />
                ))}
              </div>
              <span className="font-medium text-sm underline">200 Views</span>
            </div>
          </div>

          {/* Variants */}
          <div className="grid grid-cols-2 gap-4 mt-10 max-w-95.5">
            {singleProduct.map((item) => {
              const isSelected = selectedVariantId === item.variantId;
              const isOutOfStock = item.status === "out of stock";

              return (
                <span
                  key={item.variantId}
                  onClick={() =>
                    handleVariantClick(item.variantId, item.status)
                  }
                  className={`font-normal text-sm text-[#3B3B3B] w-40.75 h-20.75 border rounded-[5px] flex flex-col justify-center px-4 transition-all duration-200 ${
                    isOutOfStock
                      ? "border-[#C40606] opacity-70 cursor-not-allowed"
                      : isSelected
                        ? "border-[#3B3B3B]"
                        : "border-[#D1D5DB] hover:border-[#3B3B3B] cursor-pointer"
                  }`}
                >
                  <Paragraph content={item.size} className="" />
                  <Paragraph content={item.price} className="font-medium" />

                  {isOutOfStock && (
                    <Paragraph
                      content="Out of Stock"
                      className="text-[#C40606] mt-1 font-medium"
                    />
                  )}
                </span>
              );
            })}
          </div>

          {/* Add to Cart */}
          <SubmitButton
            label="Add to Cart"
            loadingLabel="Adding to cart..."
            className="mt-10"
            icon={ShoppingBasket}
            isPending={isPending}
            onClick={() => {
              if (!selectedVariantId) {
                notify.error("Please select a variant");
                return;
              }

              addToCart({
                variant_id: selectedVariantId, // ✅ REAL backend ID
                quantity: 1,
              });
            }}
          />

          {/* Loyalty */}
          <div className="bg-[#F5F5F5] w-full mt-10 flex justify-between items-center">
            <ProductImage
              alt="shopping bag icon"
              src="/shop-bag.svg"
              width={85}
              height={90.43}
              className="max-w-21.25"
            />

            <span className="text-sm leading-5.5 font-normal pr-3.75">
              <Paragraph content="16 points = $16.00" className="" />
              <Paragraph
                content="Earn loyalty points with this product"
                className="font-medium"
              />
            </span>
          </div>

          <Paragraph
            content="Standard Delivery within 3-5 workings days"
            className="font-normal pt-6"
          />
        </div>
      </div>
    </section>
  );
};

export default DetailHeroSection;
