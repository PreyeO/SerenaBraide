import GiftCardSection from "@/features/gift-card/components/GiftCard";
import RecommendationSection from "@/features/products/components/RecommendationSection";

import { recommendedProducts } from "@/features/products/data/product.data";

import React from "react";

const GiftCardPage = () => {
  return (
    <>
      <GiftCardSection />

      <RecommendationSection
        products={Object.values(recommendedProducts).flat()}
      />
    </>
  );
};

export default GiftCardPage;
