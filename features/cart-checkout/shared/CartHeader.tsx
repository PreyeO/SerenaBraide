import Paragraph from "@/components/ui/typography/paragraph";
import React from "react";

interface CartHeaderProps {
  totalItems: number;
}

const CartHeader: React.FC<CartHeaderProps> = ({ totalItems }) => {
  return (
    <div className="flex flex-col gap-2.25 lg:pt-12.5 pt-4">
      <h3 className="text-[#3B3B3B] lg:text-[22px] text-base font-semibold">
        My Cart{" "}
        <span className="font-normal text-sm text-[#6F6E6C]">
          ({totalItems} {totalItems === 1 ? "item" : "items"})
        </span>
      </h3>

      <Paragraph
        className="text-[#6F6E6C] font-normal lg:text-base text-sm"
        content="Review selected items before checkout."
      />
    </div>
  );
};

export default CartHeader;
