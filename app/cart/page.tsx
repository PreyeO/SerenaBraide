import CartSection from "@/features/cart-checkout/components/cart/CartSection";
import RecommendationSection from "@/features/products/components/RecommendationSection";

import React from "react";

import LoadingState from "@/components/ui/loaders/loading-state";
import { Suspense } from "react";

const CartPage = () => {
  return (
    <>
      <Suspense fallback={<LoadingState />}>
        <CartSection />
      </Suspense>
      <RecommendationSection />
    </>
  );
};

export default CartPage;
