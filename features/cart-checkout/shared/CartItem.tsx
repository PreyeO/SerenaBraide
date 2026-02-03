import ProductImage from "@/components/ui/images/product-image";
import Paragraph from "@/components/ui/typography/paragraph";
import SubHeading from "@/components/ui/typography/subHeading";
import { Minus, Plus, Trash2 } from "lucide-react";
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
  className,
  imageClassName,
}: CartItemProps) => {
  return (
    <div
      className={` ${className} w-full  border border-[#F5F5F5]  rounded-[10px] lg:py-2.5 py-4 px-4 lg:px-7.5 `}
    >
      {/* Remove Button */}
      {showRemoveButton && (
        <div className="lg:flex justify-end hidden">
          <span
            onClick={onRemove}
            className="bg-white rounded-full w-7.5 h-7.5 flex justify-center items-center cursor-pointer"
          >
            <Trash2 className="size-[22.5px]" color="red" />
          </span>
        </div>
      )}

      {/* Content */}
      <div className="flex lg:gap-4 gap-2.5">
        <ProductImage
          alt={name}
          src={image}
          width={width}
          height={height}
          imageClassName={imageClassName}
          className="rounded-md"
        />

        <div>
          <SubHeading
            className="lg:text-lg text-base text-[#3B3B3B] font-normal"
            title={name}
          />

          <Paragraph
            className="text-black font-medium lg:text-base text-sm lg:pt-1.5 pt-0.75"
            content={price}
          />

          <AuthSpan className="text-[#3B3B3B] font-normal lg:text-base text-sm lg:pt-2.5 gap-1.5">
            {metaLabel}
          </AuthSpan>

          {/* Quantity Controls (optional) */}
          {showQuantity &&
            (showQuantityBox ? (
              <div className="flex text-[#3B3B3B] font-medium text-base lg:mt-4 mt-2.5">
                <span
                  onClick={onDecrease}
                  className="lg:w-7.5 w-6.75 lg:h-7.5 h-6.75 bg-white border border-[#F0F0F0] flex justify-center items-center cursor-pointer"
                >
                  <Minus />
                </span>
                <span className="lg:w-7.5 w-6.75 lg:h-7.5 h-6.75 bg-white border border-[#F0F0F0] flex justify-center items-center">
                  {quantity}
                </span>

                <span
                  onClick={onIncrease}
                  className="lg:w-7.5 w-6.75 lg:h-7.5 h-6.75 bg-white border border-[#F0F0F0] flex justify-center items-center cursor-pointer"
                >
                  <Plus />
                </span>
              </div>
            ) : (
              <p className="text-[#6F6E6C] font-normal lg:text-base text-sm lg:mt-4 mt-2.5">
                Qty {quantity}
              </p>
            ))}
        </div>
        {/* Remove Button */}
        {showRemoveButton && (
          <div className="flex justify-end lg:hidden">
            <span
              onClick={onRemove}
              className="bg-white rounded-full w-7.5 h-7.5 flex justify-center items-center cursor-pointer"
            >
              <Trash2 className="size-4" color="red" />
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartItem;
