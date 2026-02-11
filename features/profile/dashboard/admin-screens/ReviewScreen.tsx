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
  const { data: reviewsData, isLoading, refetch } = useGetReviews();
  const [selectedReview, setSelectedReview] = useState<Review | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Filter out approved reviews - only show pending reviews (is_approved === null or false)
  // Must be called before any early returns to follow Rules of Hooks
  const reviews = useMemo(() => {
    if (!reviewsData || !reviewsData.results) return [];
    return reviewsData.results.filter(
      (review) => review.is_approved === null,
    );
  }, [reviewsData?.results]);

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
