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

  // Get additional product images (not primary)
  const additionalImages = useMemo(() => {
    const images: any[] = [];

    // First, get product-level images (not primary, variant === null)
    const productImages = product.images.filter(
      (img) => !img.is_primary && img.variant === null,
    );
    images.push(...productImages.slice(0, 2));

    // If we don't have enough images, use variant images (non-primary)
    if (images.length < 2 && product.variants && product.variants.length > 0) {
      for (const variant of product.variants) {
        if (images.length >= 2) break;
        if (variant.images && variant.images.length > 0) {
          for (const img of variant.images) {
            if (!img.is_primary && images.length < 2) {
              images.push({
                ...img,
                variant: variant.id,
              });
            }
          }
        }
      }
    }

    return images;
  }, [product]);

  return (
    <section className="pt-6 px-16 text-[#3B3B3B] pb-[50px]">
      <div className="flex justify-center gap-[60px] mt-[34px]">
        {/* Product Images */}
        <div className="w-full flex justify-between gap-4">
          {additionalImages.length > 0 ? (
            additionalImages.map((img, index) => (
              <ProductImage
                key={`${product.id}-additional-${img.id || index}-${img.image_url}`}
                alt={img.alt_text || `${product.name} image ${index + 1}`}
                src={img.image_url}
                width={338}
                height={289}
                className="max-w-[338px] h-[289px] object-cover"
              />
            ))
          ) : (
            <>
              <ProductImage
                key="fallback-1"
                alt="Product image"
                src="/product-2.png"
                width={338}
                height={289}
                className="max-w-[338px] h-[289px]"
              />
              <ProductImage
                key="fallback-2"
                alt="Product image"
                src="/product-3.png"
                width={338}
                height={289}
                className="max-w-[338px] h-[289px]"
              />
            </>
          )}
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
              className="flex gap-[10px] pt-[25px] items-center text-[#3B3B3B] text-lg font-medium"
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
