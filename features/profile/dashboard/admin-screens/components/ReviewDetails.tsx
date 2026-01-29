"use client";

import React from "react";
import { Star } from "lucide-react";
import ProductImage from "@/components/ui/images/product-image";
import Paragraph from "@/components/ui/typography/paragraph";
import SubHeading from "@/components/ui/typography/subHeading";
import { Review } from "@/features/profile/type/admin/general.type";
import { useUpdateReviewApproval } from "@/features/profile/hooks/admin/useUpdateReviewApproval";
import SubmitButton from "@/components/ui/btns/submit-cta";
import { formatDate } from "../../utils/array.utils";

interface ReviewDetailsProps {
  review: Review;
  onSuccess?: () => void;
}

const ReviewDetails: React.FC<ReviewDetailsProps> = ({ review, onSuccess }) => {
  const [actionType, setActionType] = React.useState<
    "approve" | "decline" | null
  >(null);

  const updateReviewMutation = useUpdateReviewApproval({
    onSuccess: () => {
      setActionType(null);
      // Call onSuccess which will refetch and close modal
      onSuccess?.();
    },
  });

  const handleApprove = () => {
    setActionType("approve");
    updateReviewMutation.mutate({ id: review.id, isApproved: true });
  };

  const handleDecline = () => {
    setActionType("decline");
    updateReviewMutation.mutate({ id: review.id, isApproved: false });
  };

  const isApproving =
    actionType === "approve" && updateReviewMutation.isPending;
  const isDeclining =
    actionType === "decline" && updateReviewMutation.isPending;

  const productImage =
    review.order_item.variant.images.find((img) => img.is_primary)?.image_url ||
    review.order_item.variant.images[0]?.image_url ||
    "";

  const productName = review.order_item.variant.product_name;
  const price = review.order_item.variant.price;
  const quantity = review.order_item.quantity;
  const size = review.order_item.variant.size;
  const orderDate = review.order_item.created_at;

  return (
    <div className="space-y-4 lg:space-y-6">
      {/* Header */}
      <SubHeading
        title="Order Review"
        className="text-base lg:text-lg font-medium text-[#3B3B3B]"
      />

      {/* Product Card */}
      <div className="border border-[#D1D5DB] py-3 lg:py-3.75 px-3 lg:px-3.75 rounded-md">
        <div className="flex gap-2.5">
          <ProductImage
            src={productImage}
            alt={productName}
            width={102}
            height={102}
            imageClassName="w-16 h-16 lg:w-25.5 lg:h-25.5 rounded-[5px] shrink-0 object-cover"
          />

          <div className="flex flex-col gap-0.5 lg:gap-1">
            <Paragraph
              content={productName}
              className="text-sm font-medium text-[#3B3B3B] line-clamp-2"
            />

            <div className="flex gap-2 lg:gap-4">
              <Paragraph
                content={`₦${parseFloat(price).toLocaleString("en-NG", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}`}
                className="text-sm text-[#3B3B3B]"
              />
              <Paragraph
                content={`x${quantity}`}
                className="text-sm text-[#3B3B3B]"
              />
            </div>

            <Paragraph content={size} className="text-sm text-[#6F6E6C]" />

            <Paragraph
              content={`Order date: ${formatDate(orderDate)}`}
              className="text-sm text-[#9A9A98]"
            />
          </div>
        </div>
      </div>

      {/* Review Section */}
      {review.review && (
        <div className="space-y-3 lg:space-y-4">
          <div className="flex items-center gap-2">
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className="size-5 lg:size-6"
                  fill={star <= review.rating ? "#D97705" : "none"}
                  stroke={star <= review.rating ? "#D97705" : "#D1D5DB"}
                />
              ))}
            </div>
            {review.review && (
              <Paragraph
                content={`— ${review.review.split(".")[0] || review.review}`}
                className="text-sm lg:text-base text-[#3B3B3B] font-medium"
              />
            )}
          </div>

          <Paragraph
            content={review.review}
            className="text-sm lg:text-base text-[#6F6E6C] leading-6"
          />
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3 lg:gap-4 pt-2 lg:pt-4">
        <SubmitButton
          label="Approve review"
          isPending={isApproving}
          loadingLabel="Approving..."
          disabled={updateReviewMutation.isPending}
          className="flex-1 bg-[#3B3B3B] text-white hover:bg-[#2f2f2f] rounded-full cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={handleApprove}
        />
        <SubmitButton
          label="Decline review"
          isPending={isDeclining}
          loadingLabel="Declining..."
          disabled={updateReviewMutation.isPending}
          className="flex-1 bg-white text-[#3B3B3B] border border-[#6F6E6C] hover:bg-[#F5F5F5] rounded-full cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={handleDecline}
        />
      </div>
    </div>
  );
};

export default ReviewDetails;
