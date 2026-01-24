"use client";

import Image from "next/image";
import { useGetCategoriesTree } from "../hooks/useGetCategoriesTree";
import { useMemo } from "react";

interface HeroSectionProps {
  categorySlug: string;
}

const HeroSection = ({ categorySlug }: HeroSectionProps) => {
  const { data: categories = [] } = useGetCategoriesTree();

  // Find category info from API data
  const categoryInfo = useMemo(() => {
    return categories.find((cat) => cat.slug === categorySlug);
  }, [categories, categorySlug]);

  // Format title from slug if API data not available yet
  const title = categoryInfo?.name || 
    categorySlug.charAt(0).toUpperCase() + categorySlug.slice(1).replace(/-/g, " ");
  
  const description = categoryInfo?.description || 
    "Explore our collection of premium products.";

  // Default hero image (since API doesn't provide images yet)
  const heroImage = "/fragrance-hero.png";

  return (
    <section className="pt-[152px] px-16">
      <div className="flex justify-between items-center">
        <div className="max-w-[743px] leading-[22px] font-GeneralSans font-normal flex flex-col gap-[16px]">
          <h2 className="text-[40px] font-PPEditorialNew text-[#3B3B3B]">
            {title}
          </h2>
          <p className="text-sm text-[#6F6E6C]">{description}</p>
        </div>
        <Image
          src={heroImage}
          alt={title}
          width={379.98}
          height={381}
          className="max-w-[379.89px]"
        />
      </div>
    </section>
  );
};

export default HeroSection;
