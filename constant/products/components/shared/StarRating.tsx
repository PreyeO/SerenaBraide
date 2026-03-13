"use client";

import React from "react";
import { Star } from "lucide-react";

interface StarRatingProps {
    rating: number;
    size?: "sm" | "md" | "lg";
    className?: string;
    showEmpty?: boolean;
}

const sizeClasses = {
    sm: "size-4",
    md: "size-5",
    lg: "size-6",
};

/**
 * Reusable star rating display component
 */
const StarRating: React.FC<StarRatingProps> = ({
    rating,
    size = "md",
    className = "",
    showEmpty = true,
}) => {
    const starSize = sizeClasses[size];
    const maxStars = showEmpty ? 5 : Math.ceil(rating);

    return (
        <div className={`flex items-center gap-1 ${className}`}>
            {Array.from({ length: maxStars }, (_, index) => {
                const starNumber = index + 1;
                const isFilled = starNumber <= rating;

                return (
                    <Star
                        key={starNumber}
                        className={`${starSize} ${isFilled
                                ? "text-[#D97705] fill-[#D97705]"
                                : "text-[#D1D5DB]"
                            }`}
                    />
                );
            })}
        </div>
    );
};

export default StarRating;
