"use client";

import { useGetCategoriesTree } from "../hooks/useGetCategoriesTree";
import { useMemo } from "react";
import ProductImage from "@/components/ui/images/product-image";
import Paragraph from "@/components/ui/typography/paragraph";
import SubHeading from "@/components/ui/typography/subHeading";

interface HeroSectionProps {
  categorySlug: string;
}

const HeroSection = ({ categorySlug }: HeroSectionProps) => {
  const { data: categories = [] } = useGetCategoriesTree();

  const categoryInfo = useMemo(() => {
    const rootCategory = categories.find((cat) => cat.slug === categorySlug);
    if (rootCategory) return rootCategory;

    for (const category of categories) {
      const child = category.children?.find(
        (child) => child.slug === categorySlug,
      );
      if (child) return child;
    }

    return null;
  }, [categories, categorySlug]);

  const title =
    categoryInfo?.name ||
    categorySlug.charAt(0).toUpperCase() +
      categorySlug.slice(1).replace(/-/g, " ");

  const description = categoryInfo?.description;
  const imageUrl = categoryInfo?.image_url;
  const imageAlt = categoryInfo?.image_alt_text || title;

  return (
    <section className="pt-38 lg:pb-10 pb-8.5">
      <div className="flex md:justify-between items-center justify-center ">
        <div className="xl:max-w-135.75 md:max-w-100 w-full leading-5.5 font-GeneralSans flex flex-col gap-4">
          <SubHeading
            className="lg:text-[40px] text-[26px] font-normal font-PPEditorialNew text-[#3B3B3B]"
            title={title}
          />

          {description && (
            <Paragraph
              className="text-sm text-[#6F6E6C] font-normal"
              content={description}
            />
          )}
        </div>

        {imageUrl && (
          <div className="md:block hidden relative max-w-95 w-full  rounded-lg overflow-hidden bg-gray-50 shadow-sm">
            <ProductImage
              src={imageUrl}
              alt={imageAlt}
              width={380}
              height={381}
              className="w-full h-full object-cover"
            />
          </div>
        )}
      </div>
    </section>
  );
};

export default HeroSection;
