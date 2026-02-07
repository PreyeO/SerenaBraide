import EmptyCart from "@/features/cart-checkout/components/empty-screens/EmptyCart";
import RecommendationSection from "@/features/products/components/RecommendationSection";



import React from "react";

const CartPage = () => {
  return (
    <>
      <EmptyCart />

      <RecommendationSection />
    </>
  );
};

export default CartPage;
