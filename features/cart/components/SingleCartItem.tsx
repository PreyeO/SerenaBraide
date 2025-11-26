import UnderlineLink from "@/components/ui/btns/underline-cta";
import ProductImage from "@/components/ui/images/product-image";
import Paragraph from "@/components/ui/typography/paragraph";
import SubHeading from "@/components/ui/typography/subHeading";
import { Minus, Plus, X } from "lucide-react";
import React from "react";

const SingleCartItem = () => {
  return (
    <div className="w-[700px] bg-[#F6F7F8] border rounded-[10px] py-[10px] px-[30px] mt-[40px] ">
      <div className="flex justify-end">
        <span className="bg-white rounded-full w-[30px] h-[30px] flex justify-center items-center cursor-pointer">
          <X className="size-[22.5px]" />
        </span>
      </div>
      <div className="flex gap-4">
        <ProductImage
          alt="Product image"
          src="/cart-image-1.png"
          width={150}
          height={150}
          className="max-w-[150px]"
        />
        <div>
          <SubHeading
            className="text-lg text-[#3B3B3B] font-normal "
            title="Eau du Soir"
          />
          <Paragraph
            className="text-black font-medium text-base pt-[6px]"
            content="$160.00"
          />
          <Paragraph
            className="text-[#3B3B3B] font-normal text-base pt-[10px]"
            content="Size: 30ml"
          />
          <div className="flex text-[#3B3B3B] font-medium text-base mt-4 ">
            <span className="w-[30px] h-[30px] bg-white border border-[#F0F0F0] flex justify-center items-center">
              <Plus />
            </span>
            <span className="w-[30px] h-[30px]  bg-white  border border-[#F0F0F0] flex justify-center items-center ">
              1
            </span>
            <span className="w-[30px] h-[30px] bg-white  border border-[#F0F0F0] flex justify-center items-center ">
              <Minus />
            </span>
          </div>
        </div>
      </div>
      <div className="flex justify-end">
        <UnderlineLink
          href="/"
          className="text-base text-[#3B3B3B] font-medium"
          text="Edit"
        />
      </div>
    </div>
  );
};

export default SingleCartItem;
