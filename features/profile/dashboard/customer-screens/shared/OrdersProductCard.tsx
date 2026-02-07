"use client";
import { Badge } from "@/components/ui/badge";
import LinkCta from "@/components/ui/btns/link-cta";
import SubmitButton from "@/components/ui/btns/submit-cta";
import ProductImage from "@/components/ui/images/product-image";
import Paragraph from "@/components/ui/typography/paragraph";
import SubHeading from "@/components/ui/typography/subHeading";
import { OrderInfo } from "@/features/profile/type/customers/profile.type";
import { BadgeCheckIcon, ChevronRight } from "lucide-react";

import React, { useState } from "react";
import OrderFulfilmentModal from "../fulfilments/OrderFulfilmentModal";
import ReviewModal from "../reviews/ReviewModal";
import { useRouter } from "next/navigation";
import { getProductById } from "@/features/products/product.service";
import { notify } from "@/lib/notify";

interface OrdersProductCardProps {
  order: OrderInfo;
  orderDetail?: string;
  onReviewClick?: (order: OrderInfo) => void;
}

const OrdersProductCard: React.FC<OrdersProductCardProps> = ({
  order,
  orderDetail = "View Details",
  onReviewClick,
}) => {
  const Icon = order.icon || BadgeCheckIcon;
  const [open, setOpen] = useState(false);
  const [reviewOpen, setReviewOpen] = useState(false);
  const [isBuyingAgain, setIsBuyingAgain] = useState(false);
  const router = useRouter();

  const handleReviewClick = () => {
    if (onReviewClick) {
      onReviewClick(order);
    } else {
      setReviewOpen(true);
    }
  };

  const handleBuyAgain = async () => {
    // For gift card orders, redirect to gift card page
    if (order.isGiftCard) {
      router.push("/giftcard");
      return;
    }

    if (!order.productId) {
      notify.error("Product information not available");
      return;
    }

    setIsBuyingAgain(true);
    try {
      const product = await getProductById(order.productId);
      router.push(`/categories/${product.category_slug}/${product.slug}`);
    } catch (error) {
      notify.error("Failed to load product details");
      console.log(error);
      setIsBuyingAgain(false);
    }
  };

  return (
    <div className="w-full bg-white lg:bg-[#F6F7F8] border border-[#F5F5F5] px-4 lg:px-8.5 py-4 lg:py-6 rounded-[10px] transition-all duration-300 hover:shadow-sm">
      {/* Header: Status + Order Number */}
      <div className="flex flex-col lg:flex-row lg:justify-between items-start lg:items-center gap-2 lg:gap-0 text-[#3B3B3B] pb-3 lg:py-4.75 text-xs font-normal">
        {/* Mobile: Status on left, Order # on right */}
        <div className="flex justify-between items-center w-full lg:w-auto">
          <Badge
            variant="secondary"
            className="px-2 py-1.5 lg:py-2 text-xs lg:text-sm"
            style={{
              backgroundColor: order.color ? `${order.color}10` : undefined,
              color: order.color,
            }}
          >
            <Icon className="size-3 lg:size-4" color={order.iconBg} />
            <span className="whitespace-nowrap">{order.title}</span>
          </Badge>

          {/* Mobile: Order number with copy button */}
          <div className="flex lg:hidden items-center gap-1.5 text-[#6F6E6C]">
            <span className="text-xs">{order.orderNumber}</span>
          </div>
        </div>

        {/* Desktop: Order number and view details */}
        <div className="hidden lg:flex flex-wrap gap-2 lg:gap-2.5 items-center">
          <SubHeading
            title={order.orderNumber}
            className="text-xs lg:text-sm truncate max-w-37.5 lg:max-w-none"
          />
          <div className="border h-4 hidden lg:block" />
          <>
            <button
              onClick={() => setOpen(true)}
              className="flex items-center font-medium text-xs lg:text-sm hover:opacity-80 transition-opacity"
            >
              {orderDetail} <ChevronRight className="size-3.5 lg:size-4.5" />
            </button>
            <OrderFulfilmentModal
              open={open}
              onClose={() => setOpen(false)}
              statusType={order.statusType}
              orderNumber={order.orderNumberId || null}
            />
          </>
        </div>
      </div>

      <ReviewModal
        open={reviewOpen}
        onClose={() => setReviewOpen(false)}
        order={order}
      />

      {/* Separator */}
      <div className="border border-[#F0F0F0] lg:border-[#D1D5DB] w-full" />

      {/* Content: Product Info */}
      <div className="pt-4 lg:pt-6 w-full text-[#6F6E6C]">
        <div className="flex flex-col lg:flex-row lg:justify-between gap-4">
          {/* Product details with image */}
          <div className="flex gap-3 lg:gap-3 items-start flex-1">
            {order.src ? (
              <ProductImage
                src={order.src}
                alt={order.alt}
                width={102}
                height={102}
                className="w-16 h-16 lg:w-25.5 lg:h-25.5 object-cover rounded-[5px] flex shrink-0"
              />
            ) : (
              <div className="w-16 h-16 lg:w-25.5 lg:h-25.5 rounded-[5px]  shrink-0 bg-linear-to-br from-[#3B3B3B] to-[#1a1a1a] flex items-center justify-center">
                <span className="text-white text-xs lg:text-sm font-medium">
                  Gift Card
                </span>
              </div>
            )}
            <div className="flex flex-col gap-0.5 lg:gap-1.5 min-w-0 flex-1">
              <SubHeading
                title={order.productName}
                className="text-sm lg:text-base font-medium text-[#3B3B3B] line-clamp-2"
              />
              <div className="flex flex-wrap gap-2 lg:gap-4 text-xs lg:text-sm text-[#6F6E6C]">
                <Paragraph
                  content={order.price}
                  className="text-xs lg:text-sm font-medium text-[#3B3B3B]"
                />
                <Paragraph
                  content={order.quantity}
                  className="text-xs lg:text-sm"
                />
              </div>
              <Paragraph content={order.size} className="text-xs lg:text-sm" />
              <Paragraph
                content={`${order.date}`}
                className="text-xs lg:text-sm"
              />
            </div>
          </div>

          {/* Desktop only: Total and actions on right */}
          <div className="hidden lg:flex flex-col gap-1.5 text-center">
            <div>
              <Paragraph
                content={order.total}
                className="text-xs lg:text-sm font-medium text-[#3B3B3B] pb-0.75"
              />
              {order.extraInfo && (
                <Paragraph
                  content={order.extraInfo}
                  className="text-xs text-[#6F6E6C]"
                />
              )}
            </div>
            <div className="flex flex-col gap-2 w-full lg:w-50">
              <SubmitButton
                label={order.OrderAction1}
                className="text-xs lg:text-sm py-2 lg:py-3"
                isPending={isBuyingAgain}
                onClick={
                  order.OrderAction1 === "Buy Again"
                    ? handleBuyAgain
                    : undefined
                }
              />
              {order.orderAction2 === "Leave a review" ? (
                <LinkCta
                  className="w-full text-xs lg:text-sm text-[#3B3B3B] border border-[#6F6E6C] hover:bg-gray-50 bg-white py-2 lg:py-3 transition-colors"
                  label={order.orderAction2}
                  onClick={handleReviewClick}
                />
              ) : order.orderAction2 === "View Order" ? (
                <LinkCta
                  className="w-full text-xs lg:text-sm text-[#3B3B3B] border border-[#6F6E6C] hover:bg-gray-50 bg-white py-2 lg:py-3 transition-colors"
                  label={order.orderAction2}
                  onClick={() => setOpen(true)}
                />
              ) : null}
            </div>
          </div>
        </div>

        {/* Mobile only: Action buttons at bottom in a row */}
        <div className="flex lg:hidden gap-3 mt-4">
          <SubmitButton
            label={order.OrderAction1}
            className="flex-1 text-xs "
            isPending={isBuyingAgain}
            onClick={
              order.OrderAction1 === "Buy Again" ? handleBuyAgain : undefined
            }
          />
          {order.orderAction2 === "Leave a review" ? (
            <LinkCta
              className="flex-1 text-xs text-[#3B3B3B] border border-[#6F6E6C] hover:bg-gray-50 bg-white py-2.5 transition-colors"
              label={order.orderAction2}
              onClick={handleReviewClick}
            />
          ) : order.orderAction2 === "View Order" ? (
            <LinkCta
              className="flex-1 text-xs text-[#3B3B3B] border border-[#6F6E6C] hover:bg-gray-50 bg-white py-2.5 transition-colors"
              label={order.orderAction2}
              onClick={() => setOpen(true)}
            />
          ) : null}
        </div>
      </div>

      {/* Mobile fulfilment modal - separate from desktop */}
      <OrderFulfilmentModal
        open={open}
        onClose={() => setOpen(false)}
        statusType={order.statusType}
        orderNumber={order.orderNumberId || null}
      />
    </div>
  );
};

export default OrdersProductCard;
