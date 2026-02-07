import { Suspense } from "react";
import GiftCardSection from "@/features/gift-card/components/GiftCard";
import RecommendationSection from "@/features/products/components/RecommendationSection";

import LoadingState from "@/components/ui/loaders/loading-state";

const GiftCardPage = () => {
  return (
    <>
      <Suspense fallback={<LoadingState />}>
        <GiftCardSection />
      </Suspense>

      <RecommendationSection />
    </>
  );
};

export default GiftCardPage;
