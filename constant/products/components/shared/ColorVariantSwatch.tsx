"use client";

import React from "react";
import { Variant } from "../../product.type";
import { getColorValue } from "../../product.utils";

interface ColorVariantSwatchProps {
    variant: Variant;
    isSelected: boolean;
    onClick: (variant: Variant) => void;
}

const ColorVariantSwatch: React.FC<ColorVariantSwatchProps> = ({
    variant,
    isSelected,
    onClick,
}) => {
    const isOutOfStock = !variant.is_in_stock;
    const colorHex = getColorValue(variant.color || "");

    return (
        <button
            onClick={() => onClick(variant)}
            disabled={isOutOfStock}
            className={`
        w-8 h-8 rounded-full transition-all duration-200
        ${isSelected ? "ring-2 ring-offset-2 ring-[#3B3B3B]" : ""}
        ${isOutOfStock ? "opacity-40 cursor-not-allowed" : "hover:scale-110 cursor-pointer"}
      `}
            style={{ backgroundColor: colorHex }}
            title={variant.color || ""}
            aria-label={`Select ${variant.color}`}
        />
    );
};

export default ColorVariantSwatch;
