"use client";

import React from "react";
import Paragraph from "@/components/ui/typography/paragraph";
import { Variant } from "../../product.type";
import { formatPrice } from "../../product.utils";

interface SizeVariantCardProps {
  variant: Variant;
  isSelected: boolean;
  onClick: (variant: Variant) => void;
}

const SizeVariantCard: React.FC<SizeVariantCardProps> = ({
  variant,
  isSelected,
  onClick,
}) => {
  const isOutOfStock = !variant.is_in_stock;

  return (
    <div
      onClick={() => !isOutOfStock && onClick(variant)}
      className={`font-normal text-sm text-[#3B3B3B] max-w-40.75 lg:py-4 py-2.5 gap-0.75 border rounded-[5px] flex flex-col justify-center lg:px-4 px-2.5 transition-all duration-200 ${
        isOutOfStock
          ? "border-[#C40606] opacity-70 cursor-not-allowed"
          : isSelected
            ? "border-[#3B3B3B] bg-gray-50"
            : "border-[#D1D5DB] hover:border-[#3B3B3B] cursor-pointer"
      }`}
    >
      <Paragraph
        content={variant.size}
        className="text-sm text-[#3B3B3B] font-normal"
      />
      <Paragraph
        content={formatPrice(variant.price)}
        className="font-medium text-lg text-[#3B3B3B]"
      />

      {isOutOfStock && (
        <Paragraph
          content="Out of Stock"
          className="text-[#C40606] mt-1 font-medium text-lg"
        />
      )}
    </div>
  );
};

export default SizeVariantCard;
