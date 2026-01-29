"use client";

import { Product } from "@/types/product";
import ProductImage from "../images/product-image";
import Caption from "../typography/caption";
import { Heart, Star } from "lucide-react";
import { useWishlist } from "@/features/profile/hooks/customer/useWishlist";
import { useAddToWishlist } from "@/features/profile/hooks/customer/useAddToWishlist";
import { useRemoveFromWishlist } from "@/features/profile/hooks/customer/useRemoveFromWishlist";
import { useAuthStore } from "@/features/auth/auth.store";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useMemo, useState } from "react";

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const router = useRouter();
  const user = useAuthStore((state) => state.user);
  const { data: wishlistData } = useWishlist();
  const addToWishlistMutation = useAddToWishlist();
  const removeFromWishlistMutation = useRemoveFromWishlist();
  const [isAnimating, setIsAnimating] = useState(false);
  const [isLocallyLiked, setIsLocallyLiked] = useState(false);

  const isInWishlist = useMemo(() => {
    if (!product.variantId || !wishlistData?.results) return false;
    return wishlistData.results.some(
      (item) => item.product_variant.id === product.variantId,
    );
  }, [product.variantId, wishlistData]);

  const wishlistItemId = useMemo(() => {
    if (!product.variantId || !wishlistData?.results) return null;
    const item = wishlistData.results.find(
      (item) => item.product_variant.id === product.variantId,
    );
    return item?.id || null;
  }, [product.variantId, wishlistData]);

  const isLoading =
    addToWishlistMutation.isPending || removeFromWishlistMutation.isPending;

  const isLiked = product.variantId ? isInWishlist : isLocallyLiked;

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!user) {
      const currentPath = window.location.pathname;
      router.push(`/auth/login?return_url=${encodeURIComponent(currentPath)}`);
      return;
    }

    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 300);

    if (!product.variantId) {
      setIsLocallyLiked(!isLocallyLiked);
      return;
    }

    if (isInWishlist && wishlistItemId) {
      removeFromWishlistMutation.mutate(wishlistItemId);
    } else {
      addToWishlistMutation.mutate({ product_variant: product.variantId });
    }
  };

  const productLink =
    product.slug && product.categorySlug
      ? `/categories/${product.categorySlug}/${product.slug}`
      : "#";

  return (
    <Link href={productLink} className="block">
      <div className="rounded-[15px] py-3  flex flex-col h-full gap-3">
        {/* IMAGE CARD */}
        <div className="relative aspect-3/4 w-full overflow-hidden rounded-[15px] bg-[#F2F2F2]">
          <ProductImage
            src={product.src}
            alt={product.name}
            fill
            className="object-cover"
          />

          {/* Stock Badge */}
          <div className="absolute top-2 left-2 z-10">
            <span
              className={`rounded-[40px] text-[10px] h-6 px-2 flex items-center justify-center
                ${
                  product.inStock
                    ? "bg-white text-[#3B3B3B]"
                    : "bg-white text-[#C40606]"
                }
              `}
            >
              <Caption
                title={product.inStock ? "In stock" : "Out of stock"}
                className="font-normal text-[10px] text-[#3B3B3B]"
              />
            </span>
          </div>

          {/* Price */}
          <span className="absolute top-2 right-2 lg:text-sm text-[10px] text-white z-10">
            <Caption title={product.price} className="font-medium" />
          </span>

          {/* Wishlist */}
          <button
            onClick={handleWishlistToggle}
            disabled={isLoading}
            className={`
              absolute bottom-3 right-3 z-20
              rounded-full w-6 h-6 flex items-center justify-center 
              transition-all duration-200
              ${
                isLiked
                  ? "bg-black"
                  : "bg-white/30 backdrop-blur-2xl hover:bg-white/50"
              }
              ${isLoading ? "opacity-50 cursor-wait" : "cursor-pointer"}
              ${isAnimating ? "animate-bounce" : ""}
              hover:scale-110 active:scale-95
            `}
          >
            <Heart
              className="w-3.5 h-3.5"
              fill={isLiked ? "#FFFFFF" : "transparent"}
              color={isLiked ? "#FFFFFF" : "#000000"}
              strokeWidth={isLiked ? 0 : 2}
            />
          </button>

          {/* LG OVERLAY ONLY */}
          <div className="hidden lg:block absolute bottom-0 left-0 right-0 bg-linear-to-t from-black/80 via-black/40 to-transparent p-3 pt-8">
            <Caption
              title={product.name}
              className="font-medium text-white text-xl line-clamp-1"
            />

            {product.reviews !== undefined && product.reviews > 0 && (
              <div className="flex items-center gap-1 mt-1.5 text-[#D1D5DB]">
                <Star size={11} fill="#D1D5DB" stroke="#D1D5DB" />
                <span className="text-[10px]">
                  {product.reviews}{" "}
                  {product.reviews === 1 ? "rating" : "ratings"}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* MOBILE CONTENT (OUTSIDE IMAGE) */}
        <div className="lg:hidden flex flex-col gap-1">
          <Caption
            title={product.name}
            className="font-medium text-[#3B3B3B] text-sm line-clamp-1"
          />

          {product.reviews !== undefined && product.reviews > 0 && (
            <div className="flex items-center gap-1 text-gray-500">
              <Star size={12} fill="#D1D5DB" stroke="#D1D5DB" />
              <span className="text-xs">
                {product.reviews} {product.reviews === 1 ? "rating" : "ratings"}
              </span>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
