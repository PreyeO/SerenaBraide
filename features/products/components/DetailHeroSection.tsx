"use client";

import React, { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { ShoppingBasket } from "lucide-react";

// UI Components
import SubmitButton from "@/components/ui/btns/submit-cta";
import ProductImage from "@/components/ui/images/product-image";
import Paragraph from "@/components/ui/typography/paragraph";
import SubHeading from "@/components/ui/typography/subHeading";
import BackNavigation from "@/components/ui/btns/back-navigation";

// Shared Components
import {
  ProductRating,
  VariantSelector,
  ProductImageCarousel,
  ShadesBadge,
} from "./shared";

// Hooks & Services
import { useAddToCart } from "@/features/cart-checkout/hooks/useAddToCart";
import { notify } from "@/lib/notify";

// Types & Utils
import { ProductDetail, Variant } from "../product.type";
import {
  getPrimaryImage,
  getColorVariants,
  getSelectedVariant,
  getCarouselImages,
} from "../product.utils";

interface DetailHeroSectionProps {
  product: ProductDetail;
  category: string;
  selectedVariantId: number | null;
  onVariantChange: (variantId: number | null) => void;
}

const DetailHeroSection: React.FC<DetailHeroSectionProps> = ({
  product,
  category,
  selectedVariantId,
  onVariantChange,
}) => {
  const [isAnimating, setIsAnimating] = useState(false);

  // External hooks
  const { mutate: addToCart, isPending } = useAddToCart();

  // Derived state
  const selectedVariant = useMemo(
    () => getSelectedVariant(product.variants, selectedVariantId),
    [product.variants, selectedVariantId],
  );

  const primaryImage = useMemo(
    () => getPrimaryImage(product, selectedVariant),
    [product, selectedVariant],
  );

  const colorVariants = useMemo(
    () => getColorVariants(product.variants),
    [product.variants],
  );

  const carouselImages = useMemo(
    () => getCarouselImages(product, selectedVariant),
    [product, selectedVariant],
  );

  // Handlers
  const handleVariantClick = (variant: Variant) => {
    if (variant.is_in_stock) {
      onVariantChange(variant.id);
    }
  };

  const handleAddToCart = () => {
    if (!selectedVariantId) {
      notify.error("Please select a variant");
      return;
    }

    addToCart({
      variant_id: selectedVariantId,
      quantity: 1,
    });
  };

  return (
    <section className="lg:pt-38 pt-33">
      {/* Back Navigation */}
      <BackNavigation href={`/all-products`} text={`Back to all products`} />

      <div className="flex justify-center xl:gap-15 lg:gap-10 gap-8.5 lg:mt-8.5 mt-6 flex-wrap lg:flex-nowrap">
        {/* Product Image - Desktop */}
        <div className="w-full xl:block md:block relative lg:hidden hidden">
          <ProductImage
            key={`${product.id}-${selectedVariantId}-${primaryImage}`}
            alt={product.name}
            src={primaryImage}
            width={700}
            height={500}
            imageClassName="w-full h-full object-cover"
          />
        </div>
        <div className="w-full lg:block xl:hidden relative hidden">
          <ProductImage
            key={`${product.id}-${selectedVariantId}-${primaryImage}`}
            alt={product.name}
            src={primaryImage}
            width={500}
            height={500}
            imageClassName="w-full h-full object-cover"
          />
        </div>

        {/* Product Image - Mobile Carousel */}
        <div className="w-full md:hidden block relative ">
          <ProductImageCarousel images={carouselImages} />
        </div>

        {/* Product Info */}
        <div className="w-full px-2 ">
          <div className="max-w-112.5">
            {/* Available in X shades badge */}
            <ShadesBadge count={colorVariants.length} />

            <SubHeading
              className="font-PPEditorialNew lg:text-[40px] text-[26px] text-[#3B3B3B] font-normal leading-tight"
              title={product.name}
            />

            <Paragraph
              className="text-[#6F6E6C] font-normal lg:text-base text-sm lg:mt-2 leading-5.5"
              content={product.description}
            />

            <ProductRating
              totalReviews={product.total_ratings}
              className="lg:pt-4 pt-3.75"
            />
          </div>

          {/* Variants Section */}
          <VariantSelector
            variants={product.variants}
            selectedVariant={selectedVariant}
            selectedVariantId={selectedVariantId}
            onVariantClick={handleVariantClick}
            basePrice={product.base_price}
          />

          {/* Add to Cart */}
          <SubmitButton
            label="Add to Cart"
            loadingLabel="Adding to cart..."
            className="lg-mt-10 mt-8.5 w-full"
            icon={ShoppingBasket}
            isPending={isPending}
            disabled={
              !selectedVariantId ||
              (selectedVariant ? !selectedVariant.is_in_stock : false)
            }
            onClick={handleAddToCart}
          />
        </div>
      </div>
    </section>
  );
};

export default DetailHeroSection;
