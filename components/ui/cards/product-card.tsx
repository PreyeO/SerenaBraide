"use client";

import { Product } from "@/types/product";
import ProductImage from "../images/product-image";
import Caption from "../typography/caption";
import { ShoppingCart, Star } from "lucide-react";
import Link from "next/link";

interface ProductCardProps {
    product: Product;
    className?: string;
}

// No add-to-cart on the card: tapping it opens the product page, where the
// customer picks a size and sees the details and reviews before buying.
const ProductCard: React.FC<ProductCardProps> = ({ product, className }) => {
    const productLink =
        product.slug && product.categorySlug
            ? `/categories/${product.categorySlug}/${product.slug}`
            : "#";

    return (
        <>
            <Link href={productLink} className="block group">
                <div className="rounded-[15px] py-3 flex flex-col h-full gap-3 transition-transform duration-300 ease-out group-hover:scale-[1.03]">
                    {/* IMAGE CARD */}
                    <div className="relative aspect-3/4 w-full overflow-hidden rounded-[15px] bg-[#F2F2F2]">
                        <ProductImage
                            key={product.src}
                            src={product.src}
                            alt={product.name}
                            fill
                            imageClassName="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                        />

                        {/* Stock Badge — transforms to "Shop Now" on hover */}
                        <div className="absolute top-2 left-2 z-10">
                            <span
                                className={`rounded-[40px] text-[10px] h-6 px-2 flex items-center justify-center gap-1 transition-all duration-300
                ${product.inStock
                                        ? "bg-white text-[#3B3B3B] group-hover:bg-[#3B3B3B] group-hover:text-white group-hover:px-3"
                                        : "bg-white text-[#C40606]"
                                    }
              `}
                            >
                                {/* Default state: "In stock" / "Out of stock" */}
                                <span className="group-hover:hidden transition-opacity duration-200">
                                    <Caption
                                        title={product.inStock ? "In stock" : "Out of stock"}
                                        className="font-normal text-[10px] text-inherit"
                                    />
                                </span>

                                {/* Hover state: "Shop Now" with cart icon (only for in-stock) */}
                                {product.inStock && (
                                    <span className="hidden group-hover:flex items-center gap-1">
                                        <ShoppingCart className="w-3 h-3" strokeWidth={2} />
                                        <Caption
                                            title="Shop Now"
                                            className="font-medium text-[10px] text-inherit"
                                        />
                                    </span>
                                )}
                            </span>
                        </div>

                        {/* Price */}
                        <span className="absolute top-2 right-2 lg:text-sm text-[10px] text-white z-10">
                            <Caption title={product.price} className="font-medium" />
                        </span>

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
                            className={`${className} font-medium  text-sm line-clamp-1`}
                        />

                        {product.reviews !== undefined && product.reviews > 0 && (
                            <div className="flex items-center gap-1 text-gray-500">
                                <Star size={12} fill="#D1D5DB" stroke="#D1D5DB" />
                                <span className="text-xs">
                                    {product.reviews}{" "}
                                    {product.reviews === 1 ? "rating" : "ratings"}
                                </span>
                            </div>
                        )}
                    </div>
                </div>
            </Link>
        </>
    );
};

export default ProductCard;
