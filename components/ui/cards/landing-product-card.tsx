"use client";

import { Product } from "@/types/product";
import ProductImage from "../images/product-image";
import Caption from "../typography/caption";
import { Heart, Star } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

interface LandingProductCardProps {
  product: Product;
}

/**
 * A simplified product card for landing page sections (Best Sellers, Gift Sets, etc.)
 * This card doesn't integrate with the wishlist API - just shows a visual heart icon
 */
const LandingProductCard: React.FC<LandingProductCardProps> = ({ product }) => {
  const [isLiked, setIsLiked] = useState(false);

  const handleHeartClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsLiked(!isLiked);
  };

  // Generate star rating
  const renderStars = (rating: number = 0) => {
    return Array.from({ length: 5 }, (_, i) => {
      const starValue = i + 1;
      if (rating >= starValue) {
        return <Star key={i} size={11} fill="#D1D5DB" stroke="#D1D5DB" />;
      } else if (rating >= starValue - 0.5) {
        return (
          <Star
            key={i}
            size={11}
            fill="url(#half)"
            stroke="#D1D5DB"
          />
        );
      } else {
        return <Star key={i} size={11} className="text-[#D1D5DB]" />;
      }
    });
  };

  // Build product link - for landing page products, link to category page
  const productLink = product.slug && product.categorySlug
    ? `/categories/${product.categorySlug}/${product.slug}`
    : "#";

  return (
    <Link href={productLink} className="block">
      <div className="rounded-[15px] py-3 px-3 flex flex-col text-[#D1D5DB] h-full">
        <div className="relative aspect-[3/4] w-full overflow-hidden rounded-[15px] bg-gray-100">
          <ProductImage
            src={product.src || "/placeholder-product.png"}
            alt={product.name}
            fill
            className="object-cover"
          />

          {/* Type Badge */}
          <div className="absolute top-2 left-2 z-10">
            <span className="rounded-[40px] text-[10px] h-6 px-3 bg-white text-[#3B3B3B] flex items-center justify-center whitespace-nowrap">
              <Caption title={product.type} className="font-normal" />
            </span>
          </div>

          {/* Price */}
          <span className="absolute top-2 right-2 text-sm text-white z-10">
            <Caption title={product.price} className="font-medium" />
          </span>

          {/* Bottom overlay with product info */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-3 pt-8">
            {/* Name */}
            <Caption
              title={product.name}
              className="font-medium text-sm text-white line-clamp-1"
            />

            {/* Sizes or Colors */}
            <div className="flex justify-between items-center mt-1">
              <div className="flex-1 min-w-0">
                {product.colors && product.colors.length > 0 ? (
                  <div className="flex items-center gap-1">
                    <span className="text-[10px] font-normal text-[#D1D5DB] whitespace-nowrap">
                      Available in:
                    </span>
                    <div className="flex items-center gap-1">
                      {product.colors.slice(0, 4).map((color, index) => (
                        <div
                          key={index}
                          className="w-3 h-3 rounded-full border border-white/40 flex-shrink-0"
                          style={{ backgroundColor: color }}
                        />
                      ))}
                      {product.colors.length > 4 && (
                        <span className="text-[10px] text-[#D1D5DB]">
                          +{product.colors.length - 4}
                        </span>
                      )}
                    </div>
                  </div>
                ) : product.sizes && product.sizes.length > 0 ? (
                  <span className="text-[10px] font-normal text-[#D1D5DB] line-clamp-1">
                    Available in: {product.sizes.slice(0, 3).join(", ")}
                    {product.sizes.length > 3 && "..."}
                  </span>
                ) : null}
              </div>

              {/* Heart icon - visual only, no API call */}
              <button
                onClick={handleHeartClick}
                className={`
                  group/heart rounded-full w-6 h-6 flex items-center justify-center 
                  transition-all duration-200 flex-shrink-0 ml-2
                  ${isLiked 
                    ? "bg-black" 
                    : "bg-white/30 backdrop-blur-2xl hover:bg-white/50"
                  }
                  cursor-pointer hover:scale-110 active:scale-95
                `}
                aria-label={isLiked ? "Unlike" : "Like"}
              >
                <Heart
                  className={`
                    w-3.5 h-3.5 transition-all duration-200
                    group-hover/heart:scale-110
                  `}
                  fill={isLiked ? "#FFFFFF" : "transparent"}
                  color={isLiked ? "#FFFFFF" : "#000000"}
                  strokeWidth={isLiked ? 0 : 2}
                />
              </button>
            </div>

            {/* Reviews + Sold */}
            {(product.rating !== undefined || product.reviews !== undefined || product.sold) && (
              <div className="flex items-center gap-1 mt-1.5 flex-wrap">
                {product.rating !== undefined && (
                  <div className="flex items-center gap-0.5 text-[10px] font-normal text-[#D1D5DB]">
                    {renderStars(product.rating)}
                    <span className="ml-0.5">{product.rating.toFixed(1)}</span>
                  </div>
                )}
                {product.reviews !== undefined && product.reviews > 0 && (
                  <>
                    <div className="border-[0.5px] h-2 border-[#D1D5DB]/30" />
                    <span className="text-[10px] text-[#D1D5DB]">
                      {product.reviews} {product.reviews === 1 ? "review" : "reviews"}
                    </span>
                  </>
                )}
                {product.sold && (
                  <>
                    <div className="border-[0.5px] h-2 border-[#D1D5DB]/30" />
                    <span className="text-[10px] text-[#D1D5DB]">{product.sold} sold</span>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default LandingProductCard;




