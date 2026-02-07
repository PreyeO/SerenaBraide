"use client";

import React from "react";
import Paragraph from "@/components/ui/typography/paragraph";
import { formatCurrency } from "@/lib/utils";
import { cn } from "@/lib/utils";

interface SimpleOrderSummaryProps {
    title?: string;
    subtitle?: string;
    orderNumber?: string | number;
    subtotal: number | string;
    tax?: number | string;
    shipping?: number | string;
    total: number | string;
    className?: string;
    headerClassName?: string;
}

const SimpleOrderSummary = ({
    title = "Order Summary",
    subtitle,
    orderNumber,
    subtotal,
    tax,
    shipping,
    total,
    className,
    headerClassName,
}: SimpleOrderSummaryProps) => {
    const parseAmount = (amount: number | string | undefined) => {
        if (amount === undefined) return 0;
        return typeof amount === "string" ? parseFloat(amount) : amount;
    };

    const subtotalVal = parseAmount(subtotal);
    const taxVal = parseAmount(tax);
    const shippingVal = parseAmount(shipping);
    const totalVal = parseAmount(total);

    return (
        <div
            className={cn(
                "w-full bg-[#F6F7F8] rounded-[10px] border border-[#F5F5F5]",
                className,
            )}
        >
            {/* Header */}
            <div
                className={cn(
                    "bg-[#3B3B3B] lg:py-7.5 py-4 lg:px-8 px-4 rounded-t-[10px]",
                    headerClassName,
                )}
            >
                <div className="text-white">
                    <Paragraph className="font-medium text-sm" content={title} />
                    {subtitle && (
                        <Paragraph
                            className="italic font-normal text-sm"
                            content={subtitle}
                        />
                    )}
                </div>
            </div>

            {/* Receipt Details */}
            <div className="flex flex-col lg:gap-6 gap-4 lg:px-8 px-4 lg:py-8 py-6">
                {/* Order Number */}
                {orderNumber && (
                    <div className="flex justify-between items-center">
                        <Paragraph
                            className="text-[#6F6E6C] lg:text-base text-sm"
                            content="Order Number"
                        />
                        <Paragraph
                            className="font-medium lg:text-base text-sm"
                            content={`#${orderNumber}`}
                        />
                    </div>
                )}

                {/* Subtotal */}
                <div className="flex justify-between items-center">
                    <Paragraph
                        className="text-[#3B3B3B] font-medium lg:text-base text-sm"
                        content="Subtotal"
                    />
                    <Paragraph
                        className="font-normal lg:text-base text-sm"
                        content={formatCurrency(subtotalVal, true)}
                    />
                </div>

                {/* Tax */}
                {taxVal > 0 && (
                    <div className="flex justify-between items-center">
                        <Paragraph
                            className="text-[#3B3B3B] font-medium lg:text-base text-sm"
                            content="Tax"
                        />
                        <Paragraph
                            className="font-normal lg:text-base text-sm"
                            content={formatCurrency(taxVal, true)}
                        />
                    </div>
                )}

                {/* Shipping */}
                <div className="flex justify-between items-center">
                    <Paragraph
                        className="text-[#3B3B3B] font-medium lg:text-base text-sm"
                        content="Shipping"
                    />
                    <Paragraph
                        className={cn(
                            "font-normal lg:text-base text-sm",
                            shippingVal === 0 ? "text-[#6F6E6C]" : "",
                        )}
                        content={shippingVal > 0 ? formatCurrency(shippingVal, true) : "Free"}
                    />
                </div>

                {/* Total */}
                <div className="border-t pt-4 lg:pb-6 pb-4">
                    <div className="flex justify-between items-center">
                        <Paragraph
                            className="text-[#3B3B3B] font-medium lg:text-base text-sm"
                            content="Total"
                        />
                        <Paragraph
                            className="font-bold lg:text-lg text-base"
                            content={formatCurrency(totalVal, true)}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SimpleOrderSummary;
