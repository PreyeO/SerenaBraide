import { Suspense } from "react";
import GiftCardCheckout from "@/features/gift-card/components/GiftCardCheckout";
import LoadingState from "@/components/ui/loaders/loading-state";

const GiftCardCheckoutPage = () => {
  return (
    <>
      <Suspense fallback={<LoadingState />}>
        <GiftCardCheckout />
      </Suspense>
    </>
  );
};

export default GiftCardCheckoutPage;
