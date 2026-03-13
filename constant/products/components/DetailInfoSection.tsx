"use client";

import React, { useState, useMemo } from "react";
import { ChevronRight } from "lucide-react";

// UI Components
import BorderLine from "@/components/ui/border-line";
import ProductImage from "@/components/ui/images/product-image";
import FormModal from "@/components/ui/modals/form-modals";
import Paragraph from "@/components/ui/typography/paragraph";
import SubHeading from "@/components/ui/typography/subHeading";
import AuthSpan from "@/components/ui/typography/auth-span";

// Types & Utils
import { ProductDetail } from "../product.type";
import {
  getPrimaryImage,
  getSelectedVariant,
  getNonPrimaryVariantImages,
  getDisplayImagesForGrid,
  getProductField,
} from "../product.utils";

interface DetailInfoSectionProps {
  product: ProductDetail;
  selectedVariantId?: number | null;
}

const DetailInfoSection: React.FC<DetailInfoSectionProps> = ({
  product,
  selectedVariantId,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Derived state using utils
  const selectedVariant = useMemo(
    () => getSelectedVariant(product.variants, selectedVariantId ?? null),
    [selectedVariantId, product.variants],
  );

  const inspiration = useMemo(
    () => getProductField<string>(product, selectedVariant, "inspiration"),
    [product, selectedVariant],
  );

  const ingredients = useMemo(
    () => getProductField<string>(product, selectedVariant, "ingredients"),
    [product, selectedVariant],
  );

  const primaryImage = useMemo(
    () => getPrimaryImage(product, selectedVariant),
    [product, selectedVariant],
  );

  const nonPrimaryVariantImages = useMemo(
    () => getNonPrimaryVariantImages(selectedVariant),
    [selectedVariant],
  );

  const displayImages = useMemo(
    () =>
      getDisplayImagesForGrid(product, primaryImage, nonPrimaryVariantImages),
    [primaryImage, nonPrimaryVariantImages, product],
  );

  return (
    <section className="lg:pt-6 text-[#3B3B3B] lg:pb-12.5 pb-6">
      <div className="flex justify-center lg:gap-15 gap-8.5 lg:mt-8.5 mt-6">
        {/* Product Images - Desktop only */}
        <div className="lg:max-w-125 xl:max-w-175 w-full  hidden gap-6 lg:flex">
          {displayImages.map((img, index) => (
            <ProductImage
              key={`${product.id}-display-${selectedVariantId || "default"}-${index}-${img.image_url}`}
              alt={img.alt_text || `${product.name} image ${index + 1}`}
              src={img.image_url}
              width={338}
              height={289}
              imageClassName="w-full h-full object-cover"
            />
          ))}
        </div>

        {/* Content */}
        <div className="w-full">
          <BorderLine className="lg:mt-9.25 mt-6" />

          <div className="lg:pt-12.5 pt-6 flex flex-col lg:gap-4 gap-2.5 text-[#6F6E6C] leading-5.5 font-normal text-sm">
            <SubHeading
              title="Inspiration"
              className="lg:text-lg text-sm font-medium text-[#3B3B3B]"
            />

            {inspiration && (
              <Paragraph
                className="text-sm max-w-162.25 leading-5.5 text-[#6F6E6C]"
                content={inspiration}
              />
            )}
          </div>

          {ingredients && (
            <button
              className="flex gap-2.5 lg:pt-6.25 pt-2.5 items-center text-[#3B3B3B] text-lg font-medium"
              onClick={() => setIsModalOpen(true)}
            >
              <SubHeading
                title="See Ingredients"
                className="lg:text-lg text-sm font-medium text-[#3B3B3B]"
              />
              <ChevronRight className="size-6" />
            </button>
          )}

          {/* Ingredients Modal */}
          <FormModal
            title="Ingredient List"
            open={isModalOpen}
            onClose={() => setIsModalOpen(false)}
          >
            {ingredients ? (
              <AuthSpan className="text-sm max-w-162.25 leading-5.5 text-[#6F6E6C]">
                {ingredients}
                <br />
                <br />
                Please note that the ingredient list in the composition by
                SERENA-BRAIDE may change or vary over time. Please refer to the
                product packaging you receive before using for the most up to
                date ingredient list.
              </AuthSpan>
            ) : (
              <AuthSpan className="text-sm max-w-162.25 leading-5.5 text-[#6F6E6C]">
                No ingredient information available for this product.
              </AuthSpan>
            )}
          </FormModal>
        </div>
      </div>
    </section>
  );
};

export default DetailInfoSection;
