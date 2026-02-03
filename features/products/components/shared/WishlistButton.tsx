"use client";

import React from "react";
import { Heart } from "lucide-react";

interface WishlistButtonProps {
    isInWishlist: boolean;
    isLoading: boolean;
    isAnimating: boolean;
    onClick: () => void;
    className?: string;
}

const WishlistButton: React.FC<WishlistButtonProps> = ({
    isInWishlist,
    isLoading,
    isAnimating,
    onClick,
    className = "",
}) => {
    return (
        <button
            onClick={onClick}
            disabled={isLoading}
            className={`
        rounded-full w-10 h-10 flex items-center justify-center 
        transition-all duration-200 shrink-0
        ${isInWishlist ? "bg-black" : "bg-white/80 backdrop-blur-sm hover:bg-white"}
        ${isLoading ? "opacity-50 cursor-wait" : "cursor-pointer"}
        ${isAnimating ? "animate-bounce" : ""}
        hover:scale-110 active:scale-95
        shadow-md
        ${className}
      `}
            aria-label={isInWishlist ? "Remove from wishlist" : "Add to wishlist"}
        >
            <Heart
                className={`w-5 h-5 transition-all duration-200 ${isAnimating ? "scale-125" : ""}`}
                fill={isInWishlist ? "#FFFFFF" : "transparent"}
                color={isInWishlist ? "#FFFFFF" : "#3B3B3B"}
                strokeWidth={isInWishlist ? 0 : 2}
            />
        </button>
    );
};

export default WishlistButton;
