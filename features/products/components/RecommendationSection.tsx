"use client";

import React from "react";

import SubHeading from "@/components/ui/typography/subHeading";
import ProductCard from "@/components/ui/cards/product-card";

import { Product } from "@/types/product";
import { useGetFeaturedProducts } from "../hooks/useGetFeaturedProducts";
import { ProductListItem } from "../product.type";
import { mapProductListItemToProduct } from "../utils/product-mapper";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

interface RecommendationSectionProps {
  products?: Product[] | ProductListItem[]; // pass products array directly (optional)
}

const RecommendationSection: React.FC<RecommendationSectionProps> = ({
  products: initialProducts,
}) => {
  const { data: featuredProducts, isLoading } = useGetFeaturedProducts();

  // Helper to check if item is ProductListItem (has base_price instead of price)
  const isProductListItem = (
    item: Product | ProductListItem,
  ): item is ProductListItem => {
    return (item as ProductListItem).base_price !== undefined;
  };

  const rawProducts = initialProducts || featuredProducts || [];

  const products: Product[] = rawProducts.map((item) => {
    if (isProductListItem(item)) {
      return mapProductListItemToProduct(item);
    }
    return item as Product;
  });

  if (isLoading && !initialProducts) {
    return (
      <section className="px-16 pt-25 pb-25">
        <div className="flex flex-col">
          <SubHeading
            title="Our Recommendations"
            className="text-[32px] font-normal"
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 justify-items-center pt-8.5">
          {[...Array(4)].map((_, idx) => (
            <div
              key={idx}
              className="w-full h-[300px] bg-gray-100 animate-pulse rounded-md"
            />
          ))}
        </div>
      </section>
    );
  }

  if (products.length === 0) return null;
  return (
    <section className="lg:px-16 pt-6 px-6 lg:pt-25 pb-25">
      <div className="flex flex-col">
        <SubHeading
          title="Our Recommendations"
          className="lg:text-[32px] text-lg font-normal"
        />
      </div>

      <div className="lg:pt-8.5 pt-6 relative">
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent className="ml-4">
            {products.map((product, idx) => (
              <CarouselItem
                key={idx}
                className="basis-[85%] md:basis-1/3 lg:basis-1/4"
              >
                <div className="p-1 h-full">
                  <ProductCard product={product} />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="hidden md:block">
            <CarouselPrevious />
            <CarouselNext />
          </div>
        </Carousel>
      </div>
    </section>
  );
};

export default RecommendationSection;
