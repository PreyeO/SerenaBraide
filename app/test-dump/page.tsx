"use client";
import SuccessModal from "@/components/ui/modals/sucess";
import React, { useState } from "react";

const ProductDetailPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handlePaymentSuccess = () => {
    setIsModalOpen(true);
  };

  return (
    <>
      <button
        onClick={handlePaymentSuccess}
        className="bg-green-600 text-white px-4 py-2 rounded"
      >
        Simulate Payment Success
      </button>

      <SuccessModal
        isOpen={isModalOpen}
        message="Your payment has been received successfully!"
      />
    </>
  );
};

export default ProductDetailPage;
