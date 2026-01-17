import DetailHeroSection from "@/features/products/components/DetailHeroSection";
import DetailInfoSection from "@/features/products/components/DetailInfoSection";
import RecommendationSection from "@/features/products/components/RecommendationSection";
import ReviewSection from "@/features/products/components/ReviewSection";
import { recommendedProducts } from "@/features/products/data/product.data";
import React from "react";

const ProductDetailPage = ({
  params: _params,
}: {
  params: { category: string; slug: string };
}) => {
  // TODO: Extract productId from slug or fetch product data
  // For now, pass null - you'll need to integrate with your product fetching logic
  const productId = 6; // Replace with actual product ID from your data source

  return (
    <>
      <DetailHeroSection />
      <DetailInfoSection />
      <ReviewSection productId={productId} />
      <RecommendationSection
        products={Object.values(recommendedProducts).flat()}
      />
    </>
  );
};

export default ProductDetailPage;
