import { Suspense } from "react";
import GiftCardSection from "@/features/gift-card/components/GiftCard";
import RecommendationSection from "@/features/products/components/RecommendationSection";

import { recommendedProducts } from "@/features/products/data/product.data";
import LoadingState from "@/components/ui/loaders/loading-state";

const GiftCardPage = () => {
  return (
    <>
      <Suspense fallback={<LoadingState />}>
        <GiftCardSection />
      </Suspense>

      <RecommendationSection
        products={Object.values(recommendedProducts).flat()}
      />
    </>
  );
};

export default GiftCardPage;
