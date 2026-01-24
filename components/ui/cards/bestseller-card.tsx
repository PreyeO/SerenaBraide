// ui/cards/best-seller-card.tsx
"use client";

import React from "react";
import { Product } from "@/types/product";
import ProductImage from "../images/product-image";
import Caption from "../typography/caption";
import { Star } from "lucide-react";
import Link from "next/link";

interface BestSellerCardProps {
  product: Product;
}

const BestSellerCard: React.FC<BestSellerCardProps> = ({ product }) => {
  // Generate star rating
  const renderStars = (rating: number = 0) => {
    return Array.from({ length: 5 }, (_, i) => {
      const starValue = i + 1;
      if (rating >= starValue) {
        return <Star key={i} size={12} fill="#D1D5DB" stroke="#D1D5DB" />;
      } else if (rating >= starValue - 0.5) {
        return <Star key={i} size={12} fill="url(#half)" stroke="#D1D5DB" />;
      } else {
        return <Star key={i} size={12} className="text-[#D1D5DB]" />;
      }
    });
  };

  const productLink =
    product.slug && product.categorySlug
      ? `/categories/${product.categorySlug}/${product.slug}`
      : "#";

  return (
    <Link href={productLink} className="block">
      <div className="rounded-[15px] overflow-hidden bg-gray-900 text-[#D1D5DB] flex flex-col">
        <div className="relative w-full aspect-[3/4]">
          <ProductImage
            src={product.src || "/placeholder-product.png"}
            alt={product.name}
            fill
            className="object-cover"
          />

          {/* Type Badge */}
          <div className="absolute top-2 left-2 z-10">
            <span className="rounded-full px-3 h-6 text-[10px] bg-white text-[#3B3B3B] flex items-center justify-center whitespace-nowrap">
              <Caption title={product.type} className="font-normal" />
            </span>
          </div>

          {/* Price */}
          <div className="absolute top-2 right-2 z-10">
            <Caption
              title={product.price}
              className="font-medium text-white text-sm"
            />
          </div>

          {/* Bottom Info */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-3 pt-8 flex flex-col gap-1">
            <Caption
              title={product.name}
              className="font-medium text-sm text-white line-clamp-1"
            />

            {/* Ratings + Reviews + Sold */}
            <div className="flex items-center gap-1 mt-1 flex-wrap text-[10px] font-normal">
              {product.rating !== undefined && (
                <div className="flex items-center gap-0.5">
                  {renderStars(product.rating)}
                  <span>{product.rating.toFixed(1)}</span>
                </div>
              )}
              {product.reviews && product.reviews > 0 && (
                <>
                  <div className="border-[0.5px] h-2 border-[#D1D5DB]/30" />
                  <span>
                    {product.reviews}{" "}
                    {product.reviews === 1 ? "review" : "reviews"}
                  </span>
                </>
              )}
              {product.sold && (
                <>
                  <div className="border-[0.5px] h-2 border-[#D1D5DB]/30" />
                  <span>{product.sold} sold</span>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default BestSellerCard;
