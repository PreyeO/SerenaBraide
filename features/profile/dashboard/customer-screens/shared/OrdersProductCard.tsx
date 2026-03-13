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

import { cn, formatCurrency } from "@/lib/utils";

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

  const isDarkBg = order.isGiftCard && order.giftCardColour &&
    (order.giftCardColour === "#000000" || order.giftCardColour === "#47011d");
  const textColor = isDarkBg ? "text-white" : "text-[#3B3B3B]";
  const subTextColor = isDarkBg ? "text-gray-300" : "text-[#6F6E6C]";

  return (
    <div
      className={cn(
        "w-full px-4 lg:px-8.5 py-4 lg:py-6 rounded-[10px] transition-all duration-300 hover:shadow-sm border",
        order.isGiftCard ? "border-transparent" : "bg-white lg:bg-[#F6F7F8] border-[#F5F5F5]"
      )}
      style={{
        backgroundColor: order.isGiftCard ? order.giftCardColour || "#F6F7F8" : undefined,
      }}
    >
      {/* Header: Status + Order Number */}
      <div className={cn(
        "flex flex-col lg:flex-row lg:justify-between items-start lg:items-center gap-2 lg:gap-0 pb-3 lg:py-4.75 text-xs font-normal",
        textColor
      )}>
        {/* Mobile: Status on left, Order # on right */}
        <div className="flex justify-between items-center w-full lg:w-auto">
          <Badge
            variant="secondary"
            className={cn(
              "px-2 py-1.5 lg:py-2 text-xs lg:text-sm",
              isDarkBg ? "bg-white/10" : ""
            )}
            style={{
              backgroundColor: !isDarkBg && order.color ? `${order.color}10` : undefined,
              color: isDarkBg ? "#ffffff" : order.color,
            }}
          >
            <Icon className="size-3 lg:size-4" color={isDarkBg ? "#ffffff" : order.iconBg} />
            <span className="whitespace-nowrap">
              {order.isGiftCard && (order.statusType === "DELIVERED" || order.title === "Processing")
                ? "Delivered"
                : order.title}
            </span>
          </Badge>

          {/* Mobile: Order number with copy button */}
          <div className={cn("flex lg:hidden items-center gap-1.5", subTextColor)}>
            <span className="text-xs">{order.orderNumber}</span>
          </div>
        </div>

        {/* Desktop: Order number and view details */}
        <div className="hidden lg:flex flex-wrap gap-2 lg:gap-2.5 items-center">
          <SubHeading
            title={order.orderNumber}
            className={cn("text-xs lg:text-sm truncate max-w-37.5 lg:max-w-none", textColor)}
          />
          <div className={cn("border h-4 hidden lg:block", isDarkBg ? "border-white/20" : "border-[#D1D5DB]")} />
          <>
            <button
              onClick={() => setOpen(true)}
              className={cn("flex items-center font-medium text-xs lg:text-sm hover:opacity-80 transition-opacity", textColor)}
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

      {reviewOpen && (
        <ReviewModal
          open={reviewOpen}
          onClose={() => setReviewOpen(false)}
          order={order}
        />
      )}

      {/* Separator */}
      <div className={cn("border w-full", isDarkBg ? "border-white/10" : "border-[#F0F0F0] lg:border-[#D1D5DB]")} />

      {/* Content: Product Info */}
      <div className={cn("pt-4 lg:pt-6 w-full", subTextColor)}>
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
              <div
                className="w-16 h-16 lg:w-25.5 lg:h-25.5 rounded-[5px] shrink-0 flex items-center justify-center border border-white/20"
                style={{
                  backgroundColor: order.giftCardColour || "#3B3B3B",
                }}
              >
                <span
                  className="text-xs lg:text-sm font-medium"
                  style={{
                    color:
                      order.giftCardColour === "#ffffff" ||
                        order.giftCardColour === "#f49670"
                        ? "#3B3B3B"
                        : "#ffffff",
                  }}
                >
                  Gift Card
                </span>
              </div>
            )}
            <div className="flex flex-col gap-0.5 lg:gap-1.5 min-w-0 flex-1">
              <SubHeading
                title={order.productName}
                className={cn("text-sm lg:text-base font-medium line-clamp-2", textColor)}
              />
              <div className={cn("flex flex-wrap gap-2 lg:gap-4 text-xs lg:text-sm", subTextColor)}>
                <Paragraph
                  content={order.price}
                  className={cn("text-xs lg:text-sm font-medium", textColor)}
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
                className={cn("text-xs lg:text-sm font-medium pb-0.75", textColor)}
              />
              {order.extraInfo && (
                <Paragraph
                  content={order.extraInfo}
                  className={cn("text-xs", subTextColor)}
                />
              )}
            </div>
            <div className="flex flex-col gap-2 w-full lg:w-50">
              <SubmitButton
                label={order.OrderAction1}
                className={cn(
                  "text-xs lg:text-sm py-2 lg:py-3",
                  isDarkBg ? "bg-white text-black hover:bg-gray-100" : ""
                )}
                isPending={isBuyingAgain}
                onClick={
                  order.OrderAction1 === "Buy Again"
                    ? handleBuyAgain
                    : undefined
                }
              />
              {order.orderAction2 === "Leave a review" ? (
                <LinkCta
                  className={cn(
                    "w-full text-xs lg:text-sm border py-2 lg:py-3 transition-colors",
                    isDarkBg
                      ? "text-white border-white/20 hover:bg-white/10 bg-transparent"
                      : "text-[#3B3B3B] border-[#6F6E6C] hover:bg-gray-50 bg-white"
                  )}
                  label={order.orderAction2}
                  onClick={handleReviewClick}
                />
              ) : order.orderAction2 === "View Order" ? (
                <LinkCta
                  className={cn(
                    "w-full text-xs lg:text-sm border py-2 lg:py-3 transition-colors",
                    isDarkBg
                      ? "text-white border-white/20 hover:bg-white/10 bg-transparent"
                      : "text-[#3B3B3B] border-[#6F6E6C] hover:bg-gray-50 bg-white"
                  )}
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
            className={cn(
              "flex-1 text-xs",
              isDarkBg ? "bg-white text-black hover:bg-gray-100" : ""
            )}
            isPending={isBuyingAgain}
            onClick={
              order.OrderAction1 === "Buy Again" ? handleBuyAgain : undefined
            }
          />
          {order.orderAction2 === "Leave a review" ? (
            <LinkCta
              className={cn(
                "flex-1 text-xs border py-2.5 transition-colors",
                isDarkBg
                  ? "text-white border-white/20 hover:bg-white/10 bg-transparent"
                  : "text-[#3B3B3B] border-[#6F6E6C] hover:bg-gray-50 bg-white"
              )}
              label={order.orderAction2}
              onClick={handleReviewClick}
            />
          ) : order.orderAction2 === "View Order" ? (
            <LinkCta
              className={cn(
                "flex-1 text-xs border py-2.5 transition-colors",
                isDarkBg
                  ? "text-white border-white/20 hover:bg-white/10 bg-transparent"
                  : "text-[#3B3B3B] border-[#6F6E6C] hover:bg-gray-50 bg-white"
              )}
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
