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
}

const DetailInfoSection: React.FC<DetailInfoSectionProps> = ({ product }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Get additional product images (not primary)
  const additionalImages = useMemo(() => {
    const images = product.images
      .filter((img) => !img.is_primary && img.variant === null)
      .slice(0, 2);

    // If we don't have enough images, use variant images
    if (images.length < 2 && product.variants.length > 0) {
      for (const variant of product.variants) {
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
                key={img.id}
                alt={img.alt_text || `${product.name} image ${index + 1}`}
                src={img.image_url}
                width={338}
                height={289}
                className="max-w-[338px]"
              />
            ))
          ) : (
            <>
              <ProductImage
                alt="Product image"
                src="/product-2.png"
                width={338}
                height={289}
                className="max-w-[338px]"
              />
              <ProductImage
                alt="Product image"
                src="/product-3.png"
                width={338}
                height={289}
                className="max-w-[338px]"
              />
            </>
          )}
        </div>
        <div className="">
          <BorderLine className="mt-[37px]" />
          <div className="pt-[50px] flex flex-col gap-[16px] text-[#6F6E6C] leading-[22px] font-normal text-sm ">
            <SubHeading title="About This Product" className="text-lg font-medium text-[#3B3B3B]" />
            <Paragraph
              className=""
              content={product.description}
            />
            {/* Hardcoded additional info for now */}
            <Paragraph
              className=""
              content="It's love at first sight between mandarin orange and sun-drenched grapefruit. 
            Intense rose and delicate jasmine boldly respond to the bewitching notes of Syringa 
            and ylang-ylang. The final touch: base notes of amber and patchouli embrace the fruity, 
            floral notes, leaving a decidedly elegant scent in its wearer's wake."
            />
          </div>

          <button
            className="flex gap-[10px] pt-[25px] items-center text-[#3B3B3B] text-lg font-medium"
            onClick={() => setIsModalOpen(true)}
          >
            See Ingredients
            <ChevronRight />
            <FormModal
              title="Ingredient List"
              open={isModalOpen}
              onClose={() => setIsModalOpen(false)}
            >
              <p className="text-sm max-w-[649px] leading-[22px]">
                {" "}
                ALCOHOL DENAT., FRAGRANCE (PARFUM), WATER/EAU (AQUA), HEXYL
                CINNAMAL, DISODIUM EDTA, LIMONENE, ALPHA-ISOMETHYL IONONE,
                BENZYL SALICYLATE, GERANIOL, LINALOOL, HYDROXYCITRONELLAL,
                EUGENOL, BENZYL BENZOATE, CITRONELLOL, CITRAL, FARNESOL, EVERNIA
                PRUNASTRI EXTRACT, BENZYL ALCOHOL, EVERNIA FURFURACEA EXTRACT.
                IL#3A <br />
                Please note that the ingredient list in the composition by
                SERENA-BRAIDE may change or vary over time. Please refer to the
                product packaging you receive before using for the most up to
                date ingredient list.
              </p>
            </FormModal>
          </button>
        </div>
      </div>
    </section>
  );
};

export default DetailInfoSection;
