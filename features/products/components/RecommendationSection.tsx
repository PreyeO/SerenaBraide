import React from "react";

import SubHeading from "@/components/ui/typography/subHeading";
import ProductCard from "@/components/ui/cards/product-card";

import { Product } from "@/types/product";

interface RecommendationSectionProps {
  products: Product[]; // pass products array directly
}

const RecommendationSection: React.FC<RecommendationSectionProps> = ({
  products,
}) => {
  return (
    <section className="px-16 pt-25 pb-25">
      <div className="flex flex-col">
        <SubHeading
          title="Our Recommendations"
          className="text-[32px] font-normal"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 justify-items-center pt-8.5">
        {products.map((product, idx) => (
          <ProductCard key={idx} product={product} />
        ))}
      </div>
    </section>
  );
};

export default RecommendationSection;
