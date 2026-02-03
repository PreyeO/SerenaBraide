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
  WishlistButton,
  ProductRating,
  LoyaltyBadge,
  VariantSelector,
  ProductImageCarousel,
  ShadesBadge,
} from "./shared";

// Hooks & Services
import { useAddToCart } from "@/features/cart-checkout/hooks/useAddToCart";
import { useWishlist } from "@/features/profile/hooks/customer/useWishlist";
import { useAddToWishlist } from "@/features/profile/hooks/customer/useAddToWishlist";
import { useRemoveFromWishlist } from "@/features/profile/hooks/customer/useRemoveFromWishlist";
import { useAuthStore } from "@/features/auth/auth.store";
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
  const router = useRouter();
  const user = useAuthStore((state) => state.user);
  const [isAnimating, setIsAnimating] = useState(false);

  // External hooks
  const { mutate: addToCart, isPending } = useAddToCart();
  const { data: wishlistData } = useWishlist();
  const addToWishlistMutation = useAddToWishlist();
  const removeFromWishlistMutation = useRemoveFromWishlist();

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

  const isInWishlist = useMemo(() => {
    if (!selectedVariantId || !wishlistData?.results) return false;
    return wishlistData.results.some(
      (item) => item.product_variant.id === selectedVariantId,
    );
  }, [selectedVariantId, wishlistData]);

  const wishlistItemId = useMemo(() => {
    if (!selectedVariantId || !wishlistData?.results) return null;
    const item = wishlistData.results.find(
      (item) => item.product_variant.id === selectedVariantId,
    );
    return item?.id || null;
  }, [selectedVariantId, wishlistData]);

  const isWishlistLoading =
    addToWishlistMutation.isPending || removeFromWishlistMutation.isPending;

  // Handlers
  const handleVariantClick = (variant: Variant) => {
    if (variant.is_in_stock) {
      onVariantChange(variant.id);
    }
  };

  const handleWishlistToggle = () => {
    if (!user) {
      const currentPath = window.location.pathname;
      router.push(`/auth/login?return_url=${encodeURIComponent(currentPath)}`);
      return;
    }

    if (!selectedVariantId) {
      notify.error("Please select a variant first");
      return;
    }

    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 300);

    if (isInWishlist && wishlistItemId) {
      removeFromWishlistMutation.mutate(wishlistItemId);
    } else {
      addToWishlistMutation.mutate({ product_variant: selectedVariantId });
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
      <BackNavigation
        href={`/categories/${category}`}
        text={`Back to ${product.category_name}`}
      />

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

          <WishlistButton
            isInWishlist={isInWishlist}
            isLoading={isWishlistLoading}
            isAnimating={isAnimating}
            onClick={handleWishlistToggle}
            className="absolute top-4 md:right-6 lg:right-4 right-4"
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

          <WishlistButton
            isInWishlist={isInWishlist}
            isLoading={isWishlistLoading}
            isAnimating={isAnimating}
            onClick={handleWishlistToggle}
            className="absolute top-4 md:right-6 lg:right-4 right-4"
          />
        </div>

        {/* Product Image - Mobile Carousel */}
        <div className="w-full md:hidden block relative ">
          <ProductImageCarousel images={carouselImages} />

          {/* <WishlistButton
            isInWishlist={isInWishlist}
            isLoading={isWishlistLoading}
            isAnimating={isAnimating}
            onClick={handleWishlistToggle}
            className="absolute top-2 right-6 z-10"
          /> */}
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

            <ProductRating totalReviews={200} className="lg:pt-4 pt-3.75" />
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

          {/* Loyalty Badge */}
          <LoyaltyBadge className="lg:mt-10 mt-6" />

          <Paragraph
            content="Standard Lagos Delivery within 3-5 workings days"
            className="font-normal lg:pt-6 pt-2.5 lg:text-sm text-xs"
          />
        </div>
      </div>
    </section>
  );
};

export default DetailHeroSection;
