"use client";

import Image from "next/image";
import { useGetCategoriesTree } from "../hooks/useGetCategoriesTree";
import { useMemo } from "react";
import ProductImage from "@/components/ui/images/product-image";

interface HeroSectionProps {
  categorySlug: string;
}

const HeroSection = ({ categorySlug }: HeroSectionProps) => {
  const { data: categories = [] } = useGetCategoriesTree();

  // Find category info from API data - search both root categories and children
  const categoryInfo = useMemo(() => {
    // First, try to find in root categories
    const rootCategory = categories.find((cat) => cat.slug === categorySlug);
    if (rootCategory) return rootCategory;

    // If not found, search in children
    for (const category of categories) {
      if (category.children && category.children.length > 0) {
        const childCategory = category.children.find(
          (child) => child.slug === categorySlug,
        );
        if (childCategory) return childCategory;
      }
    }

    return null;
  }, [categories, categorySlug]);

  // Format title from slug if API data not available yet
  const title =
    categoryInfo?.name ||
    categorySlug.charAt(0).toUpperCase() +
      categorySlug.slice(1).replace(/-/g, " ");

  const description =
    categoryInfo?.description || "Explore our collection of premium products.";

  // Use category image if available, otherwise use default
  const heroImage = categoryInfo?.image_url || "/fragrance-hero.png";
  const imageAlt = categoryInfo?.image_alt_text || title;

  return (
    <section className="pt-[152px] px-16">
      <div className="flex justify-between items-center">
        <div className="max-w-[743px] leading-[22px] font-GeneralSans font-normal flex flex-col gap-[16px]">
          <h2 className="text-[40px] font-PPEditorialNew text-[#3B3B3B]">
            {title}
          </h2>
          <p className="text-sm text-[#6F6E6C]">{description}</p>
        </div>
        <div className="relative max-w-[379.89px] w-full h-[381px] rounded-lg overflow-hidden bg-gray-50 shadow-sm">
          {categoryInfo?.image_url ? (
            <ProductImage
              src={heroImage}
              alt={imageAlt}
              width={379.98}
              height={381}
              className="w-full h-full object-cover"
            />
          ) : (
            <Image
              src={heroImage}
              alt={imageAlt}
              width={379.98}
              height={381}
              className="w-full h-full object-cover"
            />
          )}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
