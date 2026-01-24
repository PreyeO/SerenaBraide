import RecommendationSection from "@/features/products/components/RecommendationSection";
import ReviewSection from "@/features/products/components/ReviewSection";
import { recommendedProducts } from "@/features/products/data/product.data";

const ProductDetailPage = () => {
  const productId = 6;
  return (
    <>
      <ReviewSection productId={productId} />
      <RecommendationSection
        products={Object.values(recommendedProducts).flat()}
      />
    </>
  );
};

export default ProductDetailPage;
