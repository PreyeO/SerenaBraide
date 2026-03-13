"use client";

import React from "react";

import SubHeading from "@/components/ui/typography/subHeading";
import RecommendationCarousel from "./shared/RecommendationCarousel";
import { Product } from "@/types/product";
import { ProductListItem } from "../product.type";

interface RecommendationSectionProps {
  products?: Product[] | ProductListItem[]; // pass products array directly (optional)
  title?: string | null;
}

const RecommendationSection: React.FC<RecommendationSectionProps> = ({
  products,
  title = "Our Recommendations",
}) => {
  return (
    <section className="lg:px-16 pt-6 px-6 lg:pt-25 pb-25">
      {title && (
        <div className="flex flex-col">
          <SubHeading
            title={title}
            className="lg:text-[32px] text-lg font-normal"
          />
        </div>
      )}
      <RecommendationCarousel products={products} className="text-[#3B3B3B]" />
    </section>
  );
};

export default RecommendationSection;
