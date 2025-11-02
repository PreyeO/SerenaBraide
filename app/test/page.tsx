import ProductHero from "@/components/product-sections/product-detail/ProductHero";
import ProductInfo from "@/components/product-sections/product-detail/ProductInfo";
import ProductReview from "@/components/product-sections/product-detail/ProductReview";
import React from "react";

const ProductDetailPage = () => {
  return (
    <>
      <ProductHero />
      <ProductInfo />
      <ProductReview />
    </>
  );
};

export default ProductDetailPage;
