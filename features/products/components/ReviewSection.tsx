"use client";

import BorderLine from "@/components/ui/border-line";
import ProductImage from "@/components/ui/images/product-image";
import Caption from "@/components/ui/typography/caption";
import Paragraph from "@/components/ui/typography/paragraph";
import SubHeading from "@/components/ui/typography/subHeading";
import { Star, Verified } from "lucide-react";
import { useGetReviews } from "../hooks/useGetReviews";
import { useMemo } from "react";
import { formatDistanceToNow } from "date-fns";
import { ProductReview, VariantImage } from "../product.type";

interface ReviewSectionProps {
  productId: number | null;
}

const ReviewSection = ({ productId }: ReviewSectionProps) => {
  const { data: reviewsData, isLoading } = useGetReviews(productId);

  // Calculate average rating and total count
  const { averageRating, totalReviews, recommendationRate } = useMemo(() => {
    if (!reviewsData?.results || reviewsData.results.length === 0) {
      return { averageRating: 0, totalReviews: 0, recommendationRate: 0 };
    }

    const reviews = reviewsData.results;
    const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
    const average = totalRating / reviews.length;
    const recommendedCount = reviews.filter((r) => r.rating >= 4).length;
    const recommendationRate = Math.round(
      (recommendedCount / reviews.length) * 100
    );

    return {
      averageRating: Math.round(average * 10) / 10, // Round to 1 decimal
      totalReviews: reviewsData.count,
      recommendationRate,
    };
  }, [reviewsData]);

  // Format date to "X weeks ago" format
  const formatReviewDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return formatDistanceToNow(date, { addSuffix: true });
    } catch {
      return "Recently";
    }
  };

  // Get initials from customer profile (fallback to "U" for unknown)
  const getInitials = (_customerProfile: number) => {
    // Since we don't have customer name in the response, use a fallback
    return "U";
  };

  // Get primary image from variant
  const getPrimaryImage = (review: ProductReview): VariantImage | null => {
    if (!review?.order_item?.variant?.images) return null;
    const primaryImage = review.order_item.variant.images.find(
      (img) => img.is_primary
    );
    return primaryImage || review.order_item.variant.images[0] || null;
  };

  // Render stars based on rating
  const renderStars = (rating: number, size: "sm" | "md" = "md") => {
    const starSize = size === "sm" ? "size-4" : "size-6";
    return (
      <div className="flex items-center gap-1.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`${starSize} ${
              star <= rating
                ? "text-[#D97705] fill-[#D97705]"
                : "text-[#D1D5DB]"
            }`}
          />
        ))}
      </div>
    );
  };

  // Don't render if no productId or no reviews
  if (!productId) {
    return null;
  }

  if (isLoading) {
    return (
      <section className="px-16 text-[#3B3B3B]">
        <BorderLine className="" />
        <div className="pt-12.5 flex justify-center items-center">
          <Paragraph content="Loading reviews..." className="text-lg" />
        </div>
      </section>
    );
  }

  if (!reviewsData?.results || reviewsData.results.length === 0) {
    return null; // Don't show review section if no reviews
  }

  return (
    <section className="px-16 text-[#3B3B3B]">
      <BorderLine className="" />
      <div className="pt-12.5 flex flex-col gap-1.5 max-w-125.75 justify-center mx-auto items-center font-normal text-base">
        <SubHeading
          title="What customers are saying"
          className="text-[40px] font-medium"
        />
        {recommendationRate > 0 && (
          <Paragraph
            className="leading-6"
            content={`${recommendationRate}% of respondents would recommend this to a friend`}
          />
        )}
      </div>

      <div className="flex pt-12.5 items-center mb-6.5">
        <Paragraph
          className="font-medium text-lg"
          content={`Reviewed by ${totalReviews} ${
            totalReviews === 1 ? "customer" : "customers"
          }`}
        />
        <div className="border border-[#3B3B3B] flex justify-center h-4 ml-2.5" />
        <div className="flex items-center gap-1.5">
          <h3 className="text-lg font-medium pl-2.5">{averageRating}</h3>
          {renderStars(Math.round(averageRating))}
          <Caption
            title={`${totalReviews} ${
              totalReviews === 1 ? "rating" : "ratings"
            }`}
            className="font-normal text-sm"
          />
        </div>
      </div>
      <BorderLine className="" />

      {/* Reviews List */}
      <div className="space-y-8">
        {reviewsData.results.map((review) => {
          const primaryImage = getPrimaryImage(review);
          const initials = getInitials(review.customer_profile);

          return (
            <div key={review.id}>
              <div className="flex justify-between pt-8 items-center">
                <div className="flex gap-2.5">
                  <span className="rounded-full bg-[#F5F5F5] text-black font-normal text-base py-4 px-4">
                    {initials}
                  </span>
                  <div className="flex flex-col gap-0.75">
                    <Paragraph
                      className="font-medium text-base"
                      content="Customer"
                    />
                    <div className="flex gap-1.5">
                      <Paragraph
                        className="font-normal text-base"
                        content="Verified Buyer "
                      />
                      <Verified className="size-6 text-white" fill="#1DAE42" />
                    </div>
                  </div>
                </div>
                <Caption
                  title={formatReviewDate(review.created_at)}
                  className="text-sm text-[#6F6E6C] font-normal"
                />
              </div>
              <div className="pt-4">
                <div className="flex items-center gap-1.5">
                  {renderStars(review.rating, "sm")}
                </div>
              </div>
              {review.review && (
                <Paragraph
                  content={review.review}
                  className="font-normal text-base leading-6 pt-2.5"
                />
              )}
              {primaryImage && (
                <ProductImage
                  className="mt-4 mb-6.5"
                  src={primaryImage.image_url}
                  alt={primaryImage.alt_text || "Product image"}
                  width={200}
                  height={150}
                />
              )}
              <BorderLine className="" />
            </div>
          );
        })}
      </div>

      {/* Pagination - Display range */}
      {reviewsData.count > 0 && (
        <div className="flex justify-between pt-8 items-center">
          <Caption
            title={`Displaying Reviews 1-${Math.min(
              reviewsData.results.length,
              reviewsData.count
            )}`}
            className="text-sm text-[#6F6E6C] font-normal"
          />
          <div className="flex gap-4">
            {reviewsData.previous && (
              <button className="text-sm text-[#3B3B3B] hover:underline">
                Previous
              </button>
            )}
            {reviewsData.next && (
              <button className="text-sm text-[#3B3B3B] hover:underline">
                Next
              </button>
            )}
          </div>
        </div>
      )}
    </section>
  );
};

export default ReviewSection;
