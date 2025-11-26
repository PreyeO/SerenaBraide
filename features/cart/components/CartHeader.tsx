import Paragraph from "@/components/ui/typography/paragraph";
import React from "react";

const CartHeader = () => {
  return (
    <div className="flex flex-col gap-[9px] pt-[50px] ">
      <h3 className="text-[#3B3B3B] text-[22px] font-semibold">
        My Cart <span className="font-normal"> (3 items)</span>
      </h3>

      <Paragraph
        className="text-[#6F6E6C] font-normal text-base "
        content="Review selected items before checkout."
      />
    </div>
  );
};

export default CartHeader;
