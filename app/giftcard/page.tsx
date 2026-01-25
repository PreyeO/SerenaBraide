import { Suspense } from "react";
import GiftCardSection from "@/features/gift-card/components/GiftCard";
import RecommendationSection from "@/features/products/components/RecommendationSection";

import { recommendedProducts } from "@/features/products/data/product.data";

const GiftCardPage = () => {
  return (
    <>
      <Suspense fallback={<div className="flex items-center justify-center min-h-screen">Loading...</div>}>
        <GiftCardSection />
      </Suspense>

      <RecommendationSection
        products={Object.values(recommendedProducts).flat()}
      />
    </>
  );
};

export default GiftCardPage;
