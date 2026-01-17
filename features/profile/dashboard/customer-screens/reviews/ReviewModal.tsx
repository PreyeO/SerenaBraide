"use client";

import React from "react";
import GeneralModal from "@/components/ui/modals/general-modal";
import ReviewDetails from "./ReviewDetails";
import { OrderInfo } from "@/features/profile/type/customers/profile.type";

interface ReviewModalProps {
  open: boolean;
  onClose: () => void;
  order: OrderInfo;
}

const ReviewModal: React.FC<ReviewModalProps> = ({ open, onClose, order }) => {
  const handleSuccess = () => {
    onClose();
  };

  return (
    <GeneralModal open={open} onClose={onClose}>
      <ReviewDetails order={order} onSuccess={handleSuccess} />
    </GeneralModal>
  );
};

export default ReviewModal;

