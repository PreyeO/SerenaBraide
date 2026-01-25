import { Suspense } from "react";
import GiftCardCheckout from "@/features/gift-card/components/checkout/GiftCardCheckout";

const GiftCardCheckoutPage = () => {
  return (
    <>
      <Suspense fallback={<div className="flex items-center justify-center min-h-screen">Loading...</div>}>
        <GiftCardCheckout />
      </Suspense>
    </>
  );
};

export default GiftCardCheckoutPage;
