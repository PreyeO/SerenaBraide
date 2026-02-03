"use client";

import React from "react";
import Image from "next/image";
import Paragraph from "@/components/ui/typography/paragraph";

interface LoyaltyBadgeProps {
    points?: number;
    value?: string;
    className?: string;
}

const LoyaltyBadge: React.FC<LoyaltyBadgeProps> = ({
    points = 16,
    value = "$16.00",
    className = "",
}) => {
    return (
        <div
            className={`bg-[#F5F5F5] rounded-[5px] w-full flex justify-between items-center ${className}`}
        >
            <Image
                alt="shopping bag icon"
                src="/shop-bag.svg"
                width={85}
                height={90.43}
                className="max-w-21.25 object-cover"
            />

            <span className="lg:pr-3.75 pr-2.5">
                <Paragraph
                    content={`${points} points = ${value}`}
                    className="lg:text-sm text-xs font-medium"
                />
                <Paragraph
                    content="Earn loyalty points with this product"
                    className="font-normal lg:text-sm text-xs lg:leading-5.5 leading-4.5"
                />
            </span>
        </div>
    );
};

export default LoyaltyBadge;
