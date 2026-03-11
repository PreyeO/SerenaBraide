"use client";

import { useState, useMemo } from "react";
import SubHeading from "@/components/ui/typography/subHeading";
import ReviewTable from "./components/tables/ReviewTable";
import { useGetReviews } from "@/features/profile/hooks/admin/useGetReviews";
import { Review } from "@/features/profile/type/admin/general.type";
import DashboardLoader from "@/components/ui/loaders/dasboard-loader";
import GeneralModal from "@/components/ui/modals/general-modal";
import ReviewDetails from "./components/ReviewDetails";

const ReviewScreen = () => {
  const { data: reviewsData, isLoading } = useGetReviews();
  const [selectedReview, setSelectedReview] = useState<Review | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Filter out approved reviews - only show pending reviews (is_approved === null or false)
  // Then deduplicate: when a customer submits the same review for multiple items in one order,
  // only show it once in the table (keep the first occurrence)
  const reviews = useMemo(() => {
    if (!reviewsData || !reviewsData.results) return [];
    const pendingReviews = reviewsData.results.filter(
      (review) => review.is_approved === null,
    );

    // Deduplicate by customer + review text + rating
    const seen = new Set<string>();
    return pendingReviews.filter((review) => {
      const key = `${review.customer_profile.id}_${review.rating}_${review.review ?? ""}`;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
  }, [reviewsData]);

  const handleViewReview = (review: Review) => {
    setSelectedReview(review);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedReview(null);
  };

  const handleReviewUpdated = async () => {
    // Close modal immediately, refetch handled by mutation
    handleCloseModal();
  };

  if (isLoading) return <DashboardLoader />;

  return (
    <section className="py-7.5">
      <SubHeading
        title="User Reviews"
        className="text-sm text-[#3B3B3B] font-semibold pb-6"
      />

      <ReviewTable reviews={reviews} onViewReview={handleViewReview} />

      {selectedReview && (
        <GeneralModal open={isModalOpen} onClose={handleCloseModal}>
          <ReviewDetails
            review={selectedReview}
            onSuccess={handleReviewUpdated}
          />
        </GeneralModal>
      )}
    </section>
  );
};

export default ReviewScreen;
