"use client";

import React, { useRef, useState } from "react";
import dynamic from "next/dynamic";
import DetailHeroSection from "./DetailHeroSection";
import DetailInfoSection from "./DetailInfoSection";

const RecommendationSection = dynamic(
  () => import("./RecommendationSection"),
  { loading: () => <div className="h-40 w-full bg-gray-50 animate-pulse rounded-lg" /> }
);
const ReviewSection = dynamic(
  () => import("./ReviewSection"),
  { loading: () => <div className="h-60 w-full bg-gray-50 animate-pulse rounded-lg mt-8" /> }
);
import { useGetProductBySlug } from "../hooks/useGetProductDetail";
import { trackViewContent } from "@/lib/analytics/pixel-events";

interface ProductDetailContentProps {
  category: string;
  slug: string;
}

const ProductDetailContent: React.FC<ProductDetailContentProps> = ({
  category,
  slug,
}) => {
  const { data: product, error } = useGetProductBySlug(slug);
  const [selectedVariantId, setSelectedVariantId] = useState<number | null>(
    null,
  );
  const trackedProductId = useRef<number | null>(null);

  // Set default variant when product loads
  React.useEffect(() => {
    if (
      product &&
      product.variants &&
      product.variants.length > 0 &&
      !selectedVariantId
    ) {
      setSelectedVariantId(product.variants[0].id);
    }
  }, [product, selectedVariantId]);

  // Meta ViewContent — the top of the ads funnel, and what retargeting audiences
  // are built from.
  React.useEffect(() => {
    if (!product) return;

    // Hold off until the default variant lands, so the event names the variant
    // the customer is actually looking at rather than the bare product.
    const hasVariants = (product.variants?.length ?? 0) > 0;
    if (hasVariants && !selectedVariantId) return;

    // Once per product: changing shade or size is still the same page view.
    if (trackedProductId.current === product.id) return;
    trackedProductId.current = product.id;

    trackViewContent(
      product,
      product.variants?.find((v) => v.id === selectedVariantId) ?? null,
    );
  }, [product, selectedVariantId]);

  if (error || !product) {
    console.error("Product detail error:", error);

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

      <RecommendationSection />
    </>
  );
};

export default ProductDetailContent;
