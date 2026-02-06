"use client";

import React, { useState } from "react";
import { ShoppingBag, ChevronDown } from "lucide-react";
import Paragraph from "@/components/ui/typography/paragraph";
import CartItem from "./CartItem";
import { formatCurrency } from "@/lib/utils";
import {
  getOrderItemImage,
  getOrderItemMetaLabel,
} from "../utils/checkout.utils";
import { OrderItem } from "../type/checkout.type";

interface OrderSummaryCardProps {
  totalPrice: number;
  totalQuantity: number;
  items: OrderItem[];
  isLoading?: boolean;
  /** If true, uses controlled expanded state from parent */
  isExpanded?: boolean;
  onToggleExpanded?: () => void;
}

/**
 * Displays order summary with items.
 * On mobile: Collapsible with header showing cart total
 * On desktop: Always expanded with full header
 */
const OrderSummaryCard = ({
  totalPrice,
  totalQuantity,
  items,
  isLoading = false,
  isExpanded: controlledExpanded,
  onToggleExpanded,
}: OrderSummaryCardProps) => {
  // Use internal state if not controlled
  const [internalExpanded, setInternalExpanded] = useState(false);
  const isExpanded = controlledExpanded ?? internalExpanded;

  const handleToggle = () => {
    if (onToggleExpanded) {
      onToggleExpanded();
    } else {
      setInternalExpanded((prev) => !prev);
    }
  };

  const pointsEarned = totalQuantity * 2;

  return (
    <div className="xl:w-143 lg:w-118 w-full lg:py-4 lg:px-4 bg-[#F6F7F8] rounded-[10px] border border-[#F5F5F5]">
      {/* Mobile Collapsible Header */}
      <button
        className="lg:hidden w-full bg-[#3B3B3B] rounded-md py-4 px-4 flex items-center justify-between"
        onClick={handleToggle}
      >
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
            <ShoppingBag className="w-4 h-4 text-white" />
          </div>
          <div className="text-left">
            <Paragraph
              className="text-white font-medium text-sm"
              content={`My cart - ${formatCurrency(totalPrice)}`}
            />
            <Paragraph
              className="text-[#9A9A98] italic font-normal text-xs"
              content={`You will earn ${pointsEarned} points earned from this purchase*`}
            />
          </div>
        </div>
        <ChevronDown
          className={`w-5 h-5 text-white transition-transform duration-200 ${
            isExpanded ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Desktop Header - Always visible on lg */}
      <div className="hidden lg:flex bg-[#3B3B3B] rounded-md py-7.5 px-[32.5px] gap-7.5 mb-4.5">
        <div>
          <Paragraph
            className="text-white font-medium text-sm"
            content={`My order - ${formatCurrency(totalPrice)}`}
          />
          <Paragraph
            className="text-[#9A9A98] italic font-normal text-sm"
            content={`You will earn ${pointsEarned} points earned from this purchase*`}
          />
        </div>
      </div>

      {/* Order Items - Collapsible on mobile, always visible on desktop */}
      <div
        className={`flex flex-col gap-4 overflow-hidden transition-all duration-300 ${
          isExpanded
            ? "max-h-500 opacity-100 py-4 lg:py-0"
            : "max-h-0 lg:max-h-none opacity-0 lg:opacity-100"
        }`}
      >
        {isLoading ? (
          <div className="py-8 text-center text-[#6F6E6C]">
            Loading order...
          </div>
        ) : items.length > 0 ? (
          items.map((item) => {
            const image = getOrderItemImage(item.variant.images);
            const metaLabel = getOrderItemMetaLabel(
              item.variant.size,
              item.variant.color,
            );

            return (
              <CartItem
                key={item.id}
                image={image}
                name={item.variant.product_name}
                price={formatCurrency(item.price)}
                metaLabel={metaLabel}
                className="bg-white"
                quantity={item.quantity}
                showQuantity={true}
                height={150}
                width={130}
                imageClassName="w-full h-full"
                showRemoveButton={false}
                showQuantityBox={false}
                showRemoveEdit={false}
              />
            );
          })
        ) : (
          <div className="py-8 text-center text-[#6F6E6C]">
            No items in order
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderSummaryCard;
