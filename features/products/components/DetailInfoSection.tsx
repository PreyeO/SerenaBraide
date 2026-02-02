"use client";
import BorderLine from "@/components/ui/border-line";
import ProductImage from "@/components/ui/images/product-image";
import FormModal from "@/components/ui/modals/form-modals";
import Paragraph from "@/components/ui/typography/paragraph";
import SubHeading from "@/components/ui/typography/subHeading";
import { ChevronRight } from "lucide-react";
import React, { useState, useMemo } from "react";
import { ProductDetail } from "../product.type";

interface DetailInfoSectionProps {
  product: ProductDetail;
  selectedVariantId?: number | null;
}

const DetailInfoSection: React.FC<DetailInfoSectionProps> = ({
  product,
  selectedVariantId,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Get selected variant
  const selectedVariant = useMemo(() => {
    if (selectedVariantId && product.variants) {
      return product.variants.find((v) => v.id === selectedVariantId) || null;
    }
    return null;
  }, [selectedVariantId, product.variants]);

  // Get inspiration - from product level, or selected variant, or first variant
  const inspiration = useMemo(() => {
    if (product.inspiration) return product.inspiration;
    if (selectedVariant?.inspiration) return selectedVariant.inspiration;
    if (
      product.variants &&
      product.variants.length > 0 &&
      product.variants[0].inspiration
    ) {
      return product.variants[0].inspiration;
    }
    return null;
  }, [product, selectedVariant]);

  // Get ingredients - from product level, or selected variant, or first variant
  const ingredients = useMemo(() => {
    if (product.ingredients) return product.ingredients;
    if (selectedVariant?.ingredients) return selectedVariant.ingredients;
    if (
      product.variants &&
      product.variants.length > 0 &&
      product.variants[0].ingredients
    ) {
      return product.variants[0].ingredients;
    }
    return null;
  }, [product, selectedVariant]);

  // Get primary image - same logic as DetailHeroSection
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

  // Get non-primary variant images from selected variant (images with is_primary: false)
  const nonPrimaryVariantImages = useMemo(() => {
    if (!selectedVariant || !selectedVariant.images) {
      return [];
    }
    // Filter out primary images, only get non-primary variant images
    return selectedVariant.images.filter((img) => !img.is_primary);
  }, [selectedVariant]);

  // Build display images:
  // - Box 1: Primary image (same as DetailHero)
  // - Box 2: First non-primary variant image (if available)
  // - If admin uploaded 2 non-primary variant images, show both non-primary images
  const displayImages = useMemo(() => {
    const images: Array<{ image_url: string; alt_text: string }> = [];

    // Always show primary image as first image (same as DetailHero)
    images.push({
      image_url: primaryImage,
      alt_text: `${product.name} - Primary`,
    });

    // Add non-primary variant images
    if (nonPrimaryVariantImages.length > 0) {
      // If there are 2+ non-primary variant images, show both (replacing primary in second box)
      // Otherwise, show first non-primary variant image
      if (nonPrimaryVariantImages.length >= 2) {
        // Show both non-primary variant images
        images[0] = {
          image_url: nonPrimaryVariantImages[0].image_url,
          alt_text: nonPrimaryVariantImages[0].alt_text || `${product.name} - Variant 1`,
        };
        images.push({
          image_url: nonPrimaryVariantImages[1].image_url,
          alt_text: nonPrimaryVariantImages[1].alt_text || `${product.name} - Variant 2`,
        });
      } else {
        // Show primary + first non-primary variant image
        images.push({
          image_url: nonPrimaryVariantImages[0].image_url,
          alt_text: nonPrimaryVariantImages[0].alt_text || `${product.name} - Variant`,
        });
      }
    }

    return images;
  }, [primaryImage, nonPrimaryVariantImages, product.name]);

  return (
    <section className="pt-6 px-16 text-[#3B3B3B] pb-12.5">
      <div className="flex justify-center gap-15 mt-8.5">
        {/* Product Images */}
        <div className="w-full flex justify-between gap-4">
          {displayImages.map((img, index) => (
            <ProductImage
              key={`${product.id}-display-${selectedVariantId || 'default'}-${index}-${img.image_url}`}
              alt={img.alt_text || `${product.name} image ${index + 1}`}
              src={img.image_url}
              width={338}
              height={289}
              imageClassName="max-w-[338px] h-[289px]  object-cover"
            />
          ))}
        </div>
        <div className="">
          <BorderLine className="mt-[37px]" />
          <div className="pt-[50px] flex flex-col gap-[16px] text-[#6F6E6C] leading-[22px] font-normal text-sm ">
            <SubHeading
              title="About This Product"
              className="text-lg font-medium text-[#3B3B3B]"
            />

            {inspiration && <Paragraph className="" content={inspiration} />}
          </div>

          {ingredients && (
            <button
              className="flex gap-2.5 pt-6.25 items-center text-[#3B3B3B] text-lg font-medium"
              onClick={() => setIsModalOpen(true)}
            >
              See Ingredients
              <ChevronRight />
            </button>
          )}

          <FormModal
            title="Ingredient List"
            open={isModalOpen}
            onClose={() => setIsModalOpen(false)}
          >
            {ingredients ? (
              <p className="text-sm max-w-[649px] leading-[22px]">
                {ingredients}
                <br />
                <br />
                Please note that the ingredient list in the composition by
                SERENA-BRAIDE may change or vary over time. Please refer to the
                product packaging you receive before using for the most up to
                date ingredient list.
              </p>
            ) : (
              <p className="text-sm max-w-[649px] leading-[22px] text-[#6F6E6C]">
                No ingredient information available for this product.
              </p>
            )}
          </FormModal>
        </div>
      </div>
    </section>
  );
};

export default DetailInfoSection;
