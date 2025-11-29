import CartSection from "@/features/cart-checkout/components/cart/CartSection";
import RecommendationSection from "@/features/products/components/RecommendationSection";
import { recommendedProducts } from "@/features/products/data/product.data";

import React from "react";

const CartPage = () => {
  return (
    <>
      <CartSection />
      <RecommendationSection
        products={Object.values(recommendedProducts).flat()}
      />
    </>
  );
};

export default CartPage;
