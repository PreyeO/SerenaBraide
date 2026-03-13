"use client";

import React from "react";
import { Star } from "lucide-react";

interface ProductRatingProps {
    rating?: number;
    totalReviews?: number;
    maxRating?: number;
    className?: string;
}

const ProductRating: React.FC<ProductRatingProps> = ({
    rating = 5,
    totalReviews = 0,
    maxRating = 5,
    className = "",
}) => {
    return (
        <div className={`flex gap-2 items-center ${className}`}>
            <div className="flex text-[#3B3B3B] gap-0.5">
                {[...Array(maxRating)].map((_, i) => (
                    <Star
                        key={i}
                        fill={i < rating ? "#3B3B3B" : "transparent"}
                        className="w-4 h-4"
                        strokeWidth={i < rating ? 0 : 1}
                    />
                ))}
            </div>
            <span className="font-normal text-sm text-[#6F6E6C]">
                {totalReviews} Reviews
            </span>
        </div>
    );
};

export default ProductRating;
