"use client";

import React, { useState, useMemo } from "react";
import DetailHeroSection from "./DetailHeroSection";
import DetailInfoSection from "./DetailInfoSection";
import RecommendationSection from "./RecommendationSection";
import ReviewSection from "./ReviewSection";
import { recommendedProducts } from "../data/product.data";
import { useGetProductBySlug } from "../hooks/useGetProductDetail";
import DashboardLoader from "@/components/ui/loaders/dasboard-loader";

interface ProductDetailContentProps {
  category: string;
  slug: string;
}

const ProductDetailContent: React.FC<ProductDetailContentProps> = ({
  category,
  slug,
}) => {
  const { data: product, isLoading, error } = useGetProductBySlug(slug);
  const [selectedVariantId, setSelectedVariantId] = useState<number | null>(null);

  // Set default variant when product loads
  React.useEffect(() => {
    if (product && product.variants && product.variants.length > 0 && !selectedVariantId) {
      setSelectedVariantId(product.variants[0].id);
    }
  }, [product, selectedVariantId]);

  if (isLoading) {
    return <DashboardLoader />;
  }

  if (error || !product) {
    console.error("Product detail error:", error);
    console.log("Slug:", slug, "Category:", category);
    return (
      <div className="pt-38 px-16 text-center">
        <h2 className="text-2xl font-medium text-[#3B3B3B]">
          Product not found
        </h2>
        <p className="text-[#6F6E6C] mt-2">
          The product you&apos;re looking for doesn&apos;t exist or has been
          removed.
        </p>
        <p className="text-[#6F6E6C] mt-2 text-sm">
          Looking for: {slug} in {category}
        </p>
      </div>
    );
  }

  return (
    <>
      <DetailHeroSection 
        product={product} 
        category={category}
        selectedVariantId={selectedVariantId}
        onVariantChange={setSelectedVariantId}
      />
      <DetailInfoSection 
        product={product}
        selectedVariantId={selectedVariantId}
      />
      <ReviewSection productId={product.id} />
      <RecommendationSection
        products={Object.values(recommendedProducts).flat()}
      />
    </>
  );
};

export default ProductDetailContent;
