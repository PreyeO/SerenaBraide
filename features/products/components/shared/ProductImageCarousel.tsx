"use client";

import React from "react";
import ProductImage from "@/components/ui/images/product-image";
import {
  Carousel,
  CarouselContent,
  CarouselDots,
  CarouselItem,
} from "@/components/ui/carousel";

interface ProductImageCarouselProps {
  images: Array<{ image_url: string; alt_text: string }>;
  className?: string;
}

const ProductImageCarousel: React.FC<ProductImageCarouselProps> = ({
  images,
  className = "",
}) => {
  if (!images.length) return null;

  return (
    <div className={`w-full overflow-hidden  ${className}`}>
      <Carousel className="w-full ">
        <CarouselContent className="mx-3 ">
          {images.map((img, index) => (
            <CarouselItem key={index} className="basis-[90%]   ">
              <div className="max-w-68.75 flex items-center relative aspect-square w-full">
                <ProductImage
                  alt={img.alt_text}
                  src={img.image_url}
                  width={275}
                  height={200}
                  imageClassName="w-full h-full object-cover rounded-[5px]"
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselDots className="" />
      </Carousel>
    </div>
  );
};

export default ProductImageCarousel;
