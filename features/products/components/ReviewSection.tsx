"use client";

import BorderLine from "@/components/ui/border-line";
import ProductImage from "@/components/ui/images/product-image";
import Caption from "@/components/ui/typography/caption";
import Paragraph from "@/components/ui/typography/paragraph";
import SubHeading from "@/components/ui/typography/subHeading";
import { Star, Verified } from "lucide-react";
import { useGetReviews } from "../hooks/useGetReviews";
import { useMemo, useState, useEffect } from "react";
import { formatDistanceToNow } from "date-fns";
import { ProductReview, VariantImage } from "../product.type";

interface ReviewSectionProps {
  productId: number | null;
}

const ReviewSection = ({ productId }: ReviewSectionProps) => {
  const { data: reviewsData, isLoading, error } = useGetReviews(productId);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile screen size
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768); // md breakpoint
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Reset page when switching between mobile/desktop
  useEffect(() => {
    setCurrentPage(1);
  }, [isMobile]);

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
      (recommendedCount / reviews.length) * 100,
    );

    return {
      averageRating: Math.round(average * 10) / 10, // Round to 1 decimal
      totalReviews: reviewsData.count,
      recommendationRate,
    };
  }, [reviewsData]);

  // Get paginated reviews
  const paginatedReviews = useMemo(() => {
    if (!reviewsData?.results) return [];

    const pageSize = isMobile ? 1 : 5;
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;

    return reviewsData.results.slice(startIndex, endIndex);
  }, [reviewsData, currentPage, isMobile]);

  // Calculate total pages
  const totalPages = useMemo(() => {
    if (!reviewsData?.results) return 0;
    const pageSize = isMobile ? 1 : 5;
    return Math.ceil(reviewsData.results.length / pageSize);
  }, [reviewsData, isMobile]);

  // Pagination handlers
  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const goToPrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

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
  const getInitials = (customer?: {
    first_name?: string;
    last_name?: string;
  }) => {
    if (!customer) return "U";

    const firstInitial = customer.first_name?.charAt(0) || "";
    const lastInitial = customer.last_name?.charAt(0) || "";

    return `${firstInitial}${lastInitial}`.toUpperCase() || "U";
  };

  // Get primary image from variant
  const getPrimaryImage = (review: ProductReview): VariantImage | null => {
    if (!review?.order_item?.variant?.images) return null;
    const primaryImage = review.order_item.variant.images.find(
      (img) => img.is_primary,
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

  // Don't render if no productId
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

  // Check if error indicates no reviews (404 or "No Rating matches" message)
  const isNoReviewsError =
    error &&
    (error.response?.status === 404 ||
      error.response?.data?.detail?.includes("No Rating matches") ||
      error.response?.data?.detail === "No Rating matches the given query.");

  // Show "No reviews" message if error (no reviews) or no reviews data
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

      <div className="flex lg:pt-12.5 pt-6 items-center lg:mb-6.5 mb-4">
        <Paragraph
          className="font-medium lg;text-lg text-xs"
          content={`${totalReviews} Reviews ${
            totalReviews === 1 ? "customer" : "customers"
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
            {renderStars(Math.round(averageRating))}
          </div>
          <Caption
            title={`${totalReviews} ${
              totalReviews === 1 ? "rating" : "ratings"
            }`}
            className="font-normal lg:text-sm text-xs"
          />
        </div>
      </div>
      <BorderLine className="" />

      {/* Reviews List */}
      <div className="space-y-8">
        {paginatedReviews.map((review) => {
          const primaryImage = getPrimaryImage(review);

          return (
            <div key={review.id}>
              <div className="flex justify-between pt-8 items-center">
                <div className="flex gap-2.5">
                  <span className="rounded-full bg-[#F5F5F5] text-black font-normal text-base py-4 px-4">
                    {getInitials(review.customer_profile)}
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
                <div className="flex items-center gap-1.5">
                  {renderStars(review.rating, "sm")}
                </div>
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
                  imageClassName="max-w-[200px] h-[150px]  object-cover"
                />
              )}
              <BorderLine className="" />
            </div>
          );
        })}
      </div>

      {/* Pagination - Display range */}
      {reviewsData.count > 0 && (
        <div className="flex justify-between pt-8 items-center flex-wrap gap-4">
          <Caption
            title={`Displaying Review${isMobile ? "" : "s"} ${
              isMobile
                ? currentPage
                : `${(currentPage - 1) * 5 + 1}-${Math.min(
                    currentPage * 5,
                    reviewsData.results.length,
                  )}`
            } of ${reviewsData.results.length}`}
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
