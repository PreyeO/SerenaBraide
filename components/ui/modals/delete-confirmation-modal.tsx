"use client";

import React from "react";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import ProductImage from "@/components/ui/images/product-image";
import SubmitButton from "@/components/ui/btns/submit-cta";

interface DeleteConfirmationModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  description?: string;
  productImage?: string;
  productName?: string;
  productPrice?: string;
  productSize?: string;
  productQuantity?: number;
  confirmText?: string;
  cancelText?: string;
  isLoading?: boolean;
}

const DeleteConfirmationModal: React.FC<DeleteConfirmationModalProps> = ({
  open,
  onClose,
  onConfirm,
  title = "Are you sure you want to delete this?",
  description,
  productImage,
  productName,
  productPrice,
  productSize,
  productQuantity,
  confirmText = "Remove",
  cancelText = "Cancel",
  isLoading = false,
}) => {
  const hasProductDetails = productImage && productName;

  return (
    <AlertDialog open={open} onOpenChange={onClose}>
      <AlertDialogContent className="w-full h-full lg:h-auto lg:max-h-[90vh] max-w-md rounded-none lg:rounded-lg px-6 lg:px-8 py-8 lg:py-8 m-0 lg:m-4 top-0 left-0 lg:top-[50%] lg:left-[50%] translate-x-0 lg:translate-x-[-50%] translate-y-0 lg:translate-y-[-50%] flex flex-col justify-center lg:justify-start overflow-y-auto">
        <AlertDialogHeader className="flex flex-col items-center text-center px-0">
          <AlertDialogTitle className="lg:text-lg text-base  font-medium text-[#3B3B3B] mb-4 lg:mb-6 px-2">
            {title}
          </AlertDialogTitle>

          {/* Description - shown when no product details */}
          {!hasProductDetails && description && (
            <AlertDialogDescription className="text-[#6F6E6C] text-xs sm:text-sm lg:text-base leading-5 sm:leading-6 max-w-sm sm:max-w-md px-2 mb-4">
              {description}
            </AlertDialogDescription>
          )}

          {/* Product Details Card - shown when product details are provided */}
          {hasProductDetails && (
            <div className="w-full bg-white border border-[#F5F5F5] rounded-[10px] p-4 mb-6">
              <div className="flex gap-4">
                <ProductImage
                  alt={productName}
                  src={productImage}
                  width={80}
                  height={80}
                  imageClassName="rounded-md w-full h-full object-cover"
                  className="rounded-md shrink-0"
                />
                <div className="flex flex-col gap-1.5 flex-1">
                  {productName && (
                    <p className="text-base font-normal text-[#3B3B3B]">
                      {productName}
                    </p>
                  )}
                  {productPrice && (
                    <p className="text-base font-medium text-black">
                      {productPrice}
                    </p>
                  )}
                  {productSize && (
                    <p className="text-base font-normal text-[#3B3B3B]">
                      Size: {productSize}
                    </p>
                  )}
                  {productQuantity !== undefined && (
                    <p className="text-base font-medium text-[#3B3B3B]">
                      Qty {productQuantity}
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}
        </AlertDialogHeader>

        <div className="flex flex-col gap-2.5 lg:gap-3 w-full px-0">
          <AlertDialogCancel
            onClick={onClose}
            disabled={isLoading}
            className="w-full bg-white border border-black text-black hover:bg-[#F9FAFB] rounded-full py-3.5 py-4 lg:py-6 text-xs text-sm lg:text-base font-medium order-1"
          >
            {cancelText}
          </AlertDialogCancel>

          <div className="order-2">
            <SubmitButton
              label={confirmText}
              loadingLabel="Processing..."
              isPending={isLoading}
              onClick={onConfirm}
              className="w-full rounded-full py-3.5 lg:py-6 text-xs sm:text-sm lg:text-base"
            />
          </div>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteConfirmationModal;
