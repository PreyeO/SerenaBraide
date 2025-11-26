import EmptyCart from "@/features/cart/components/EmptyCart";
import RecommendationSection from "@/features/products/components/RecommendationSection";

import { recommendedProducts } from "@/features/products/data/product.data";

import React from "react";

const CartPage = () => {
  return (
    <>
      <EmptyCart />

      <RecommendationSection
        products={Object.values(recommendedProducts).flat()}
      />
    </>
  );
};

export default CartPage;
