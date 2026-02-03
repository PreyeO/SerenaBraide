"use client";

import React from "react";
import { Variant } from "../../product.type";
import { formatPrice, getColorVariants } from "../../product.utils";
import ColorVariantSwatch from "./ColorVariantSwatch";
import SizeVariantCard from "./SizeVariantCard";

interface VariantSelectorProps {
    variants: Variant[];
    selectedVariant: Variant | null;
    selectedVariantId: number | null;
    onVariantClick: (variant: Variant) => void;
    basePrice?: string;
}

const VariantSelector: React.FC<VariantSelectorProps> = ({
    variants,
    selectedVariant,
    selectedVariantId,
    onVariantClick,
    basePrice,
}) => {
    const colorVariants = getColorVariants(variants);
    const hasColors = colorVariants.length > 0;

    // No variants - show base price
    if (!variants?.length) {
        return (
            <div className="mt-8 max-w-95.5">
                <p className="font-medium lg:text-lg text-base">
                    Price: {formatPrice(basePrice || "0")}
                </p>
            </div>
        );
    }

    // Color variants UI
    if (hasColors) {
        return (
            <div className="mt-6 max-w-112.5">
                {/* Size & Price */}
                {selectedVariant && (
                    <>
                        <p className="text-sm text-[#6F6E6C] mb-1">
                            Size: {selectedVariant.size}
                        </p>
                        <p className="text-2xl font-medium text-[#3B3B3B] mb-4">
                            {formatPrice(selectedVariant.price)}
                        </p>
                    </>
                )}

                {/* Color Swatches */}
                <div className="flex gap-3 items-center">
                    {colorVariants.map((variant) => (
                        <ColorVariantSwatch
                            key={variant.id}
                            variant={variant}
                            isSelected={selectedVariantId === variant.id}
                            onClick={onVariantClick}
                        />
                    ))}
                </div>

                {/* Selected Color Name */}
                {selectedVariant?.color && (
                    <p className="text-sm text-[#6F6E6C] mt-3">
                        Available: <span className="text-[#3B3B3B]">{selectedVariant.color}</span>
                    </p>
                )}

                {/* Out of Stock indicator */}
                {selectedVariant && !selectedVariant.is_in_stock && (
                    <p className="text-sm text-[#C40606] mt-2 font-medium">Out of Stock</p>
                )}
            </div>
        );
    }

    // Size-only variants UI (boxes)
    return (
        <div className="grid grid-cols-2 lg:gap-4 gap-3.75 mt-8 max-w-95.5">
            {variants.map((variant) => (
                <SizeVariantCard
                    key={variant.id}
                    variant={variant}
                    isSelected={selectedVariantId === variant.id}
                    onClick={onVariantClick}
                />
            ))}
        </div>
    );
};

export default VariantSelector;
