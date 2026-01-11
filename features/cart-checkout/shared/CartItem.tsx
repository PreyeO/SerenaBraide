import UnderlineLink from "@/components/ui/btns/underline-cta";
import ProductImage from "@/components/ui/images/product-image";
import Paragraph from "@/components/ui/typography/paragraph";
import SubHeading from "@/components/ui/typography/subHeading";
import { Minus, Plus, X } from "lucide-react";
import React from "react";
import { CartItemProps } from "@/features/cart-checkout/type/cart.type";
import AuthSpan from "@/components/ui/typography/auth-span";

const CartItem = ({
  image,
  name,
  price,
  metaLabel,
  quantity = 1,
  showQuantity = true,
  onIncrease,
  onDecrease,
  onRemove,
  showRemoveButton = true,
  showQuantityBox = true,
  width,
  height,
  editLink = "/",
  showRemoveEdit = true,
  className,
}: CartItemProps) => {
  return (
    <div
      className={` ${className} w-full  border border-[#F5F5F5]  rounded-[10px] py-2.5 px-7.5 `}
    >
      {/* Remove Button */}
      {showRemoveButton && (
        <div className="flex justify-end">
          <span
            onClick={onRemove}
            className="bg-white rounded-full w-7.5 h-7.5 flex justify-center items-center cursor-pointer"
          >
            <X className="size-[22.5px]" />
          </span>
        </div>
      )}

      {/* Content */}
      <div className="flex gap-4">
        <ProductImage
          alt={name}
          src={image}
          width={width}
          height={height}
          className="max-w-37.5"
        />

        <div>
          <SubHeading
            className="text-lg text-[#3B3B3B] font-normal"
            title={name}
          />

          <Paragraph
            className="text-black font-medium text-base pt-1.5"
            content={price}
          />

          <AuthSpan className="text-[#3B3B3B] font-normal text-base pt-2.5">
            {metaLabel}
          </AuthSpan>

          {/* Quantity Controls (optional) */}
          {showQuantity &&
            (showQuantityBox ? (
              <div className="flex text-[#3B3B3B] font-medium text-base mt-4">
                <span
                  onClick={onIncrease}
                  className="w-7.5 h-7.5 bg-white border border-[#F0F0F0] flex justify-center items-center cursor-pointer"
                >
                  <Plus />
                </span>

                <span className="w-7.5 h-7.5 bg-white border border-[#F0F0F0] flex justify-center items-center">
                  {quantity}
                </span>

                <span
                  onClick={onDecrease}
                  className="w-7.5 h-7.5 bg-white border border-[#F0F0F0] flex justify-center items-center cursor-pointer"
                >
                  <Minus />
                </span>
              </div>
            ) : (
              <p className="text-[#3B3B3B] font-medium text-base mt-4">
                Qty {quantity}
              </p>
            ))}
        </div>
      </div>
      {/* Edit Link */}
      {showRemoveEdit && (
        <div className="flex justify-end">
          <UnderlineLink
            href={editLink}
            className="text-base text-[#3B3B3B] font-medium"
            text="Edit"
          />
        </div>
      )}
    </div>
  );
};

export default CartItem;
