"use client";

import React, { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { Product } from "@/types/product";
import { useGetFeaturedProducts } from "../../hooks/useGetFeaturedProducts";
import { ProductListItem } from "../../product.type";
import { mapProductListItemToProduct } from "../../utils/product-mapper";
import { getProductById } from "../../product.service";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import ProductCard from "@/components/ui/cards/product-card";

interface RecommendationCarouselProps {
  products?: Product[] | ProductListItem[]; // pass products array directly (optional)
  isLoading?: boolean;
  className?: string;
}

const RecommendationCarousel: React.FC<RecommendationCarouselProps> = ({
  products: initialProducts,
  isLoading: initialIsLoading,
  className,
}) => {
  const { data: featuredProducts, isLoading: isFetchingFeatured } =
    useGetFeaturedProducts();

  const isLoading =
    initialIsLoading || (!initialProducts && isFetchingFeatured);

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

  const queryClient = useQueryClient();

  // Prefetch product details so add-to-cart from ProductCard is instant
  useEffect(() => {
    if (!products.length) return;
    products.slice(0, 8).forEach((p) => {
      if (p.productId && !p.variantId) {
        queryClient.prefetchQuery({
          queryKey: ["product", "id", p.productId],
          queryFn: () => getProductById(p.productId!),
          staleTime: 1000 * 60 * 2,
        });
      }
    });
  }, [products, queryClient]);

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 justify-items-center pt-8.5">
        {[...Array(4)].map((_, idx) => (
          <div
            key={idx}
            className="w-full h-75 bg-gray-100 animate-pulse rounded-md"
          />
        ))}
      </div>
    );
  }

  if (products.length === 0) return null;

  return (
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
                <ProductCard product={product} className={className} />
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
  );
};

export default RecommendationCarousel;
