"use client";

import SubmitButton from "@/components/ui/btns/submit-cta";
import ProductImage from "@/components/ui/images/product-image";
import Paragraph from "@/components/ui/typography/paragraph";
import SubHeading from "@/components/ui/typography/subHeading";
import { Heart, ShoppingBasket, Star } from "lucide-react";
import React, { useState, useMemo } from "react";
import BackNavigation from "@/components/ui/btns/back-navigation";
import { useAddToCart } from "@/features/cart-checkout/hooks/useAddToCart";
import { notify } from "@/lib/notify";
import { ProductDetail, Variant } from "../product.type";
import { useWishlist } from "@/features/profile/hooks/customer/useWishlist";
import { useAddToWishlist } from "@/features/profile/hooks/customer/useAddToWishlist";
import { useRemoveFromWishlist } from "@/features/profile/hooks/customer/useRemoveFromWishlist";
import { useAuthStore } from "@/features/auth/auth.store";
import { useRouter } from "next/navigation";

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

  const { mutate: addToCart, isPending } = useAddToCart();
  const { data: wishlistData } = useWishlist();
  const addToWishlistMutation = useAddToWishlist();
  const removeFromWishlistMutation = useRemoveFromWishlist();

  // Get the selected variant
  const selectedVariant = useMemo(() => {
    return product.variants.find((v) => v.id === selectedVariantId) || null;
  }, [product.variants, selectedVariantId]);

  // Check if selected variant is in wishlist
  const isInWishlist = useMemo(() => {
    if (!selectedVariantId || !wishlistData?.results) return false;
    return wishlistData.results.some(
      (item) => item.product_variant.id === selectedVariantId,
    );
  }, [selectedVariantId, wishlistData]);

  // Get wishlist item ID
  const wishlistItemId = useMemo(() => {
    if (!selectedVariantId || !wishlistData?.results) return null;
    const item = wishlistData.results.find(
      (item) => item.product_variant.id === selectedVariantId,
    );
    return item?.id || null;
  }, [selectedVariantId, wishlistData]);

  // Get primary image - should update when variant changes
  const primaryImage = useMemo(() => {
    // If a variant is selected, prioritize its images
    if (selectedVariantId && selectedVariant && selectedVariant.images) {
      const variantPrimaryImage = selectedVariant.images.find(
        (img) => img.is_primary,
      );
      if (variantPrimaryImage) return variantPrimaryImage.image_url;

      // Fallback to first variant image
      if (selectedVariant.images.length > 0) {
        return selectedVariant.images[0].image_url;
      }
    }

    // First try to get primary image from product images (variant === null)
    const productPrimaryImage = product.images.find(
      (img) => img.is_primary && img.variant === null,
    );
    if (productPrimaryImage) return productPrimaryImage.image_url;

    // Then try any product image (variant === null)
    const anyProductImage = product.images.find((img) => img.variant === null);
    if (anyProductImage) return anyProductImage.image_url;

    // Then try first variant images if no variant selected
    if (
      product.variants &&
      product.variants.length > 0 &&
      product.variants[0].images?.length > 0
    ) {
      const variantPrimaryImage = product.variants[0].images.find(
        (img) => img.is_primary,
      );
      return (
        variantPrimaryImage?.image_url ||
        product.variants[0].images[0].image_url
      );
    }

    // Fallback
    return "/product-1.png";
  }, [product, selectedVariantId, selectedVariant]);

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

  const formatPrice = (price: string | number): string => {
    const numPrice = typeof price === "string" ? parseFloat(price) : price;
    return `₦${numPrice.toLocaleString()}`;
  };

  const isWishlistLoading =
    addToWishlistMutation.isPending || removeFromWishlistMutation.isPending;

  // Check if variants have colors
  const hasColorVariants = useMemo(() => {
    return product.variants?.some((v) => v.color !== null) || false;
  }, [product.variants]);

  // Get unique colors from variants
  const colorVariants = useMemo(() => {
    if (!hasColorVariants || !product.variants) return [];
    return product.variants.filter((v) => v.color !== null);
  }, [product.variants, hasColorVariants]);

  // Get color value - supports hex codes directly, falls back to gray
  const getColorValue = (colorValue: string): string => {
    // If it's already a hex code, use it directly
    if (colorValue.startsWith("#")) {
      return colorValue;
    }
    // Default gray for any non-hex values
    return "#9CA3AF";
  };

  return (
    <section className="pt-38 px-16">
      {/* Back Navigation */}
      <BackNavigation
        href={`/categories/${category}`}
        text={`Back to ${product.category_name}`}
      />

      <div className="flex justify-center gap-15 mt-8.5">
        {/* Product Image */}
        <div className="w-full relative">
          <ProductImage
            key={`${product.id}-${selectedVariantId}-${primaryImage}`}
            alt={product.name}
            src={primaryImage}
            width={700}
            height={500}
            imageClassName="max-w-175 h-full object-cover"
          />

          {/* Wishlist Heart - Top right of image */}
          <button
            onClick={handleWishlistToggle}
            disabled={isWishlistLoading}
            className={`
              absolute top-4 right-4 rounded-full w-10 h-10 flex items-center justify-center 
              transition-all duration-200 shrink-0
              ${isInWishlist ? "bg-black" : "bg-white/80 backdrop-blur-sm hover:bg-white"}
              ${isWishlistLoading ? "opacity-50 cursor-wait" : "cursor-pointer"}
              ${isAnimating ? "animate-bounce" : ""}
              hover:scale-110 active:scale-95
              shadow-md
            `}
            aria-label={
              isInWishlist ? "Remove from wishlist" : "Add to wishlist"
            }
          >
            <Heart
              className={`w-5 h-5 transition-all duration-200 ${isAnimating ? "scale-125" : ""}`}
              fill={isInWishlist ? "#FFFFFF" : "transparent"}
              color={isInWishlist ? "#FFFFFF" : "#3B3B3B"}
              strokeWidth={isInWishlist ? 0 : 2}
            />
          </button>
        </div>

        {/* Product Info */}
        <div className="w-full">
          <div className="max-w-112.5">
            {/* Available in X shades badge - only for color variants */}
            {hasColorVariants && colorVariants.length > 0 && (
              <span className="inline-block text-xs text-[#6F6E6C] border border-[#D1D5DB] rounded-full px-3 py-1 mb-3">
                Available in {colorVariants.length}{" "}
                {colorVariants.length === 1 ? "shade" : "shades"}
              </span>
            )}

            <SubHeading
              className="font-PPEditorialNew text-[40px] text-[#3B3B3B] font-normal leading-tight"
              title={product.name}
            />

            <Paragraph
              className="text-[#6F6E6C] font-normal text-base mt-2 line-clamp-2"
              content={product.description}
            />

            {/* Rating */}
            <div className="flex gap-2 items-center pt-4">
              <div className="flex text-[#3B3B3B] gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} fill="#3B3B3B" className="w-4 h-4" />
                ))}
              </div>
              <span className="font-normal text-sm text-[#6F6E6C]">
                200 Reviews
              </span>
            </div>
          </div>

          {/* Variants Section */}
          {product.variants && product.variants.length > 0 ? (
            hasColorVariants ? (
              /* Color Variants UI */
              <div className="mt-6 max-w-112.5">
                {/* Size & Price */}
                {selectedVariant && (
                  <>
                    <p className="text-sm text-[#6F6E6C] mb-1">
                      Size: {selectedVariant.size}
                    </p>
                    <p className="text-2xl font-medium text-[#3B3B3B] mb-4">
                      {formatPrice(selectedVariant.price)}
                    </p>
                  </>
                )}

                {/* Color Swatches */}
                <div className="flex gap-3 items-center">
                  {colorVariants.map((variant) => {
                    const isSelected = selectedVariantId === variant.id;
                    const isOutOfStock = !variant.is_in_stock;
                    const colorHex = getColorValue(variant.color || "");

                    return (
                      <button
                        key={variant.id}
                        onClick={() => handleVariantClick(variant)}
                        disabled={isOutOfStock}
                        className={`
                          w-8 h-8 rounded-full transition-all duration-200
                          ${isSelected ? "ring-2 ring-offset-2 ring-[#3B3B3B]" : ""}
                          ${isOutOfStock ? "opacity-40 cursor-not-allowed" : "hover:scale-110 cursor-pointer"}
                        `}
                        style={{ backgroundColor: colorHex }}
                        title={variant.color || ""}
                        aria-label={`Select ${variant.color}`}
                      />
                    );
                  })}
                </div>

                {/* Selected Color Name */}
                {selectedVariant?.color && (
                  <p className="text-sm text-[#6F6E6C] mt-3">
                    Available:{" "}
                    <span className="text-[#3B3B3B]">
                      {selectedVariant.color}
                    </span>
                  </p>
                )}

                {/* Out of Stock indicator */}
                {selectedVariant && !selectedVariant.is_in_stock && (
                  <p className="text-sm text-[#C40606] mt-2 font-medium">
                    Out of Stock
                  </p>
                )}
              </div>
            ) : (
              /* Size-only Variants UI (boxes) */
              <div className="grid grid-cols-2 gap-4 mt-8 max-w-95.5">
                {product.variants.map((variant) => {
                  const isSelected = selectedVariantId === variant.id;
                  const isOutOfStock = !variant.is_in_stock;

                  return (
                    <div
                      key={variant.id}
                      onClick={() => handleVariantClick(variant)}
                      className={`font-normal text-sm text-[#3B3B3B] w-40.75 min-h-20.75 border rounded-[5px] flex flex-col justify-center px-4 py-3 transition-all duration-200 ${
                        isOutOfStock
                          ? "border-[#C40606] opacity-70 cursor-not-allowed"
                          : isSelected
                            ? "border-[#3B3B3B] bg-gray-50"
                            : "border-[#D1D5DB] hover:border-[#3B3B3B] cursor-pointer"
                      }`}
                    >
                      <Paragraph content={variant.size} className="" />
                      <Paragraph
                        content={formatPrice(variant.price)}
                        className="font-medium"
                      />

                      {isOutOfStock && (
                        <Paragraph
                          content="Out of Stock"
                          className="text-[#C40606] mt-1 font-medium text-xs"
                        />
                      )}
                    </div>
                  );
                })}
              </div>
            )
          ) : (
            <div className="mt-8 max-w-95.5">
              <Paragraph
                content={`Price: ${formatPrice(product.base_price)}`}
                className="font-medium text-lg"
              />
            </div>
          )}

          {/* Add to Cart */}
          <SubmitButton
            label="Add to Cart"
            loadingLabel="Adding to cart..."
            className="mt-10"
            icon={ShoppingBasket}
            isPending={isPending}
            disabled={
              !selectedVariantId ||
              (selectedVariant ? !selectedVariant.is_in_stock : false)
            }
            onClick={() => {
              if (!selectedVariantId) {
                notify.error("Please select a variant");
                return;
              }

              addToCart({
                variant_id: selectedVariantId,
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
              imageClassName="max-w-21.25 object-cover"
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
