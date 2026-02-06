"use client";

import { useMemo } from "react";
import { Star, Verified } from "lucide-react";

// UI Components
import BorderLine from "@/components/ui/border-line";
import ProductImage from "@/components/ui/images/product-image";
import Caption from "@/components/ui/typography/caption";
import Paragraph from "@/components/ui/typography/paragraph";
import SubHeading from "@/components/ui/typography/subHeading";

// Shared Components
import { StarRating } from "./shared";

// Hooks & Utils
import { useGetReviews, useReviewPagination } from "../hooks";
import {
  formatReviewDate,
  getCustomerInitials,
  getReviewPrimaryImage,
  calculateReviewStats,
} from "../review.utils";

interface ReviewSectionProps {
  productId: number | null;
}

const ReviewSection = ({ productId }: ReviewSectionProps) => {
  const { data: reviewsData, isLoading, error } = useGetReviews(productId);

  const { averageRating, totalReviews, recommendationRate } = useMemo(
    () => calculateReviewStats(reviewsData?.results, reviewsData?.count),
    [reviewsData]
  );

  const {
    paginatedReviews,
    currentPage,
    totalPages,
    isMobile,
    goToNextPage,
    goToPrevPage,
    displayRange,
  } = useReviewPagination({ reviews: reviewsData?.results });

  // Don't render if no productId
  if (!productId) return null;

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

  // Check if error indicates no reviews
  const isNoReviewsError =
    error &&
    (error.response?.status === 404 ||
      error.response?.data?.detail?.includes("No Rating matches") ||
      error.response?.data?.detail === "No Rating matches the given query.");

  if (
    isNoReviewsError ||
    !reviewsData?.results ||
    reviewsData.results.length === 0
  ) {
    return (
      <section className="text-[#3B3B3B]">
        <BorderLine className="" />
        <div className="pt-12.5 flex flex-col gap-1.5 max-w-125.75 justify-center mx-auto items-center font-normal text-base">
          <SubHeading
            title="What customers are saying"
            className="lg:text-[40px] text-[22px] font-medium"
          />
          <Paragraph
            className="leading-6 text-[#6F6E6C]"
            content="No reviews yet. Be the first to review this product!"
          />
        </div>
      </section>
    );
  }

  return (
    <section className="text-[#3B3B3B]">
      <BorderLine className="" />

      {/* Header */}
      <div className="lg:pt-12.5 pt-6 flex flex-col gap-1.5 max-w-125.75 justify-center mx-auto items-center font-normal text-base">
        <SubHeading
          title="What customers are saying"
          className="lg:text-[40px] text-[22px] font-medium text-center"
        />
        {recommendationRate > 0 && (
          <Paragraph
            className="leading-5.5 text-sm text-[#3B3B3B] text-center"
            content={`${recommendationRate}% of respondents would recommend this to a friend`}
          />
        )}
      </div>

      {/* Stats Bar */}
      <div className="flex lg:pt-12.5 pt-6 items-center lg:mb-6.5 mb-4">
        <Paragraph
          className="font-medium lg;text-lg text-xs"
          content={`${totalReviews} Reviews ${totalReviews === 1 ? "customer" : "customers"
            }`}
        />
        <div className="border border-[#3B3B3B] flex justify-center h-4 ml-2.5" />
        <div className="flex items-center gap-1.5">
          <h3 className="lg:text-lg text-xs font-medium pl-2.5">
            {averageRating}
          </h3>
          {/* Mobile: Show only 1 star */}
          <div className="md:hidden flex items-center gap-1">
            <Star className="size-4 text-[#D97705] fill-[#D97705]" />
          </div>
          {/* Desktop: Show all 5 stars */}
          <div className="hidden md:block">
            <StarRating rating={Math.round(averageRating)} />
          </div>
          <Caption
            title={`${totalReviews} ${totalReviews === 1 ? "rating" : "ratings"
              }`}
            className="font-normal lg:text-sm text-xs"
          />
        </div>
      </div>
      <BorderLine className="" />

      {/* Reviews List */}
      <div className="space-y-8">
        {paginatedReviews.map((review) => {
          const primaryImage = getReviewPrimaryImage(review);

          return (
            <div key={review.id}>
              <div className="flex justify-between pt-8 items-center">
                <div className="flex gap-2.5">
                  <span className="rounded-full bg-[#F5F5F5] text-black font-normal text-base py-4 px-4">
                    {getCustomerInitials(review.customer_profile)}
                  </span>

                  <div className="flex flex-col gap-0.75">
                    <Paragraph
                      className="font-medium lg:text-base text-sm"
                      content={review.customer_profile?.name || "Anonymous"}
                    />

                    <div className="flex gap-1.5 items-center">
                      <Paragraph
                        className="font-normal lg:text-base text-xs"
                        content="Verified Buyer "
                      />
                      <Verified className="size-6 text-white" fill="#1DAE42" />
                    </div>
                  </div>
                </div>
                <Caption
                  title={formatReviewDate(review.created_at)}
                  className="lg:text-sm text-xs text-[#6F6E6C] font-normal"
                />
              </div>
              <div className="pt-4">
                <StarRating rating={review.rating} size="sm" />
              </div>
              {review.review && (
                <Paragraph
                  content={review.review}
                  className="font-normal text-sm lg:text-base lg:leading-6 leading-5.5 pt-2.5"
                />
              )}
              {primaryImage && (
                <ProductImage
                  className="mt-4 mb-6.5"
                  src={primaryImage.image_url}
                  alt={primaryImage.alt_text || "Product image"}
                  width={200}
                  height={150}
                  imageClassName="max-w-[200px] h-[150px] object-cover"
                />
              )}
              <BorderLine className="" />
            </div>
          );
        })}
      </div>

      {/* Pagination */}
      {reviewsData.count > 0 && (
        <div className="flex justify-between pt-8 items-center flex-wrap gap-4">
          <Caption
            title={`Displaying Review${isMobile ? "" : "s"} ${displayRange} of ${reviewsData.results.length
              }`}
            className="text-sm text-[#6F6E6C] font-normal"
          />
          <Caption
            title="Leave a review and earn 5 loyalty points!*"
            className="text-sm text-[#6F6E6C] font-normal hidden md:block"
          />
          <div className="flex gap-4">
            {currentPage > 1 && (
              <button
                onClick={goToPrevPage}
                className="text-sm text-[#3B3B3B] hover:underline"
              >
                Previous
              </button>
            )}
            {currentPage < totalPages && (
              <button
                onClick={goToNextPage}
                className="text-sm text-[#3B3B3B] hover:underline"
              >
                Next
              </button>
            )}
          </div>
        </div>
      )}
      <Caption
        title="Leave a review and earn 5 loyalty points!*"
        className="lg:text-sm text-xs text-[#6F6E6C] font-normal md:block mt-2.5 text-center"
      />
    </section>
  );
};

export default ReviewSection;
