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

  const handleReviewClick = () => {
    if (onReviewClick) {
      onReviewClick(order);
    } else {
      setReviewOpen(true);
    }
  };

  return (
    <div className="w-full bg-[#F6F7F8] border border-[#F5F5F5] min-h-50 sm:h-auto px-4 sm:px-8.5 py-4 sm:py-6 rounded-[10px] transition-all duration-300 hover:shadow-sm">
      <div className="flex flex-col sm:flex-row sm:justify-between items-start sm:items-center gap-3 sm:gap-0 text-[#3B3B3B] py-3 sm:py-4.75 text-xs font-normal">
        <Badge
          variant="secondary"
          className="px-2 py-2 text-xs sm:text-sm"
          style={{
            backgroundColor: order.color ? `${order.color}10` : undefined,
            color: order.color,
          }}
        >
          <Icon className="size-3 sm:size-4" color={order.iconBg} />
          <span className="whitespace-nowrap">{order.title}</span>
        </Badge>
        <div className="flex flex-wrap gap-2 sm:gap-2.5 items-center">
          <SubHeading
            title={order.orderNumber}
            className="text-xs sm:text-sm truncate max-w-37.5 sm:max-w-none"
          />
          <div className="border h-4 hidden sm:block" />
          <>
            <button
              onClick={() => setOpen(true)}
              className="flex items-center font-medium text-xs sm:text-sm hover:opacity-80 transition-opacity"
            >
              {orderDetail} <ChevronRight className="size-3.5 sm:size-4.5" />
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

      <div className="flex flex-col">
        <div className="border border-[#D1D5DB] w-full" />
        <div className="pt-4 sm:pt-6 w-full text-[#6F6E6C] flex flex-col sm:flex-row sm:justify-between gap-4 sm:gap-0">
          <div className="flex gap-2.5 sm:gap-3 items-start sm:items-center flex-1">
            <ProductImage
              src={order.src}
              alt={order.alt}
              width={102}
              height={102}
              className="w-20 h-20 sm:w-25.5 sm:h-25.5 object-cover rounded-[5px] flex shrink-0"
            />
            <div className="flex flex-col gap-1 sm:gap-1.5 min-w-0 flex-1">
              <div>
                <SubHeading
                  title={order.productName}
                  className="text-sm sm:text-base font-medium text-[#3B3B3B] line-clamp-2"
                />
              </div>
              <div className="flex flex-col gap-0.5 sm:gap-0.75">
                <div className="flex flex-wrap gap-2 sm:gap-4 text-xs sm:text-sm text-[#6F6E6C]">
                  <Paragraph
                    content={order.price}
                    className="text-xs sm:text-sm font-medium text-[#3B3B3B]"
                  />
                  <Paragraph
                    content={order.quantity}
                    className="text-xs sm:text-sm"
                  />
                </div>

                <Paragraph
                  content={`Size: ${order.size}`}
                  className="text-xs sm:text-sm"
                />
                <Paragraph
                  content={`Order date: ${order.date}`}
                  className="text-xs sm:text-sm"
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-1.5 text-center ">
            <div className="">
              <Paragraph
                content={order.total}
                className="text-xs sm:text-sm font-medium text-[#3B3B3B] pb-0.75"
              />
              {order.extraInfo && (
              <Paragraph
                content={order.extraInfo}
                className="text-xs text-[#6F6E6C]"
              />
              )}
            </div>
            <div className="flex flex-col sm:flex-col gap-2 w-full sm:w-50">
              <SubmitButton
                label={order.OrderAction1}
                className="text-xs sm:text-sm py-2 sm:py-3"
              />

              {order.orderAction2 === "Leave a review" ? (
                <LinkCta
                  className="w-full text-xs sm:text-sm text-[#3B3B3B] border border-[#6F6E6C] hover:bg-gray-50 bg-white py-2 sm:py-3 transition-colors"
                  label={order.orderAction2}
                  onClick={handleReviewClick}
                />
              ) : order.orderAction2 === "View Order" ? (
                <LinkCta
                  className="w-full text-xs sm:text-sm text-[#3B3B3B] border border-[#6F6E6C] hover:bg-gray-50 bg-white py-2 sm:py-3 transition-colors"
                  label={order.orderAction2}
                  onClick={() => setOpen(true)}
                />
              ) : (
                <LinkCta
                  className="w-full text-xs sm:text-sm text-[#3B3B3B] border border-[#6F6E6C] hover:bg-gray-50 bg-white py-2 sm:py-3 transition-colors"
                  label={order.orderAction2}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrdersProductCard;
