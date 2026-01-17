"use client";

import React, { useState } from "react";
import { ShoppingBasket, Trash2, CheckCircle } from "lucide-react";
import EmptyWishlist from "./empty-screens/EmptyWishlist";
import OverviewCard from "./shared/OverviewCard";
import { useWishlist } from "../../hooks/customer/useWishlist";
import { useRemoveFromWishlist } from "../../hooks/customer/useRemoveFromWishlist";
import { useAddToCart } from "@/features/cart-checkout/hooks/useAddToCart";
import DeleteConfirmationModal from "@/components/ui/modals/delete-confirmation-modal";
import ProductImage from "@/components/ui/images/product-image";
import Paragraph from "@/components/ui/typography/paragraph";
import SubHeading from "@/components/ui/typography/subHeading";
import SubmitButton from "@/components/ui/btns/submit-cta";
import LoadingState from "@/components/ui/loaders/loading-state";
import { useAuthStore } from "@/features/auth/auth.store";
import { WishlistItem } from "../../type/customers/profile.type";
import { VariantImage } from "@/features/products/product.type";
import { format } from "date-fns";

const CustomerWishlist = () => {
  const user = useAuthStore((state) => state.user);
  const { data: wishlistData, isLoading } = useWishlist();
  const removeFromWishlistMutation = useRemoveFromWishlist();
  const addToCartMutation = useAddToCart();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<number | null>(null);

  const handleDelete = (itemId: number) => {
    setItemToDelete(itemId);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (itemToDelete !== null) {
      removeFromWishlistMutation.mutate(itemToDelete, {
        onSuccess: () => {
          setIsDeleteModalOpen(false);
          setItemToDelete(null);
        },
      });
    }
  };

  const handleAddToCart = (variantId: number) => {
    addToCartMutation.mutate({
      variant_id: variantId,
      quantity: 1,
    });
  };

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return format(date, "MMM dd, yyyy");
    } catch {
      return dateString;
    }
  };

  const getPrimaryImage = (item: WishlistItem): VariantImage | null => {
    if (!item?.product_variant?.images) return null;
    const primaryImage = item.product_variant.images.find(
      (img) => img.is_primary,
    );
    return primaryImage || item.product_variant.images[0] || null;
  };

  if (!user) {
    return <LoadingState />;
  }

  if (isLoading) {
    return <LoadingState />;
  }

  if (!wishlistData?.results || wishlistData.results.length === 0) {
    return <EmptyWishlist />;
  }

  return (
    <section className="flex flex-col gap-6">
      <OverviewCard
        subHeading={`My Wishlist (${wishlistData.count} ${wishlistData.count === 1 ? "item" : "items"})`}
      >
        <div className="flex flex-col gap-6">
          {wishlistData.results.map((item) => {
            const primaryImage = getPrimaryImage(item);
            const imageUrl = primaryImage?.image_url || "/placeholder.png";
            const isInStock = item.product_variant.is_in_stock;

            return (
              <div
                key={item.id}
                className="flex gap-4 items-start pb-6 border-b border-[#F5F5F5] last:border-0 last:pb-0"
              >
                {/* Product Image */}
                <div className="relative shrink-0 max-h-51 max-w-66.75 ">
                  <ProductImage
                    src={imageUrl}
                    alt={
                      primaryImage?.alt_text ||
                      item.product_variant.product_name
                    }
                    width={267}
                    height={204}
                    className="object-cover rounded-md h-full w-full"
                  />
                  {/* IN STOCK Badge */}
                  {isInStock && (
                    <div className="absolute top-2 left-2 bg-white text-[#01AD73] text-[10px] font-medium px-2 py-1 rounded-[40px] flex items-center gap-1">
                      <CheckCircle
                        fill="#01AD73"
                        className=" size-3.5"
                        color="white"
                      />
                      IN STOCK
                    </div>
                  )}
                </div>

                {/* Product Details */}
                <div className="flex-1 flex flex-col  justify-between ">
                  <div className="flex justify-between items-start">
                    <div className="flex-1 max-w-100">
                      <SubHeading
                        title={item.product_variant.product_name}
                        className="text-lg font-medium text-[#3B3B3B] mb-1.5"
                      />
                      <div className="flex flex-col">
                        <Paragraph
                          content={`NGN${parseFloat(
                            item.product_variant.price,
                          ).toLocaleString("en-US", {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          })}`}
                          className="text-sm font-normal text-[#6F6E6C] pb-1"
                        />
                        <Paragraph
                          content={item.product_variant.size}
                          className="text-sm text-[#6F6E6C] font-normal pb-2.5"
                        />
                        <Paragraph
                          content={`Added ${formatDate(item.created_on)}`}
                          className="text-xs text-[#6F6E6C] font-normal"
                        />
                      </div>

                      <SubmitButton
                        label="Add to Cart"
                        icon={ShoppingBasket}
                        isPending={addToCartMutation.isPending}
                        onClick={() => handleAddToCart(item.product_variant.id)}
                        className="w-full rounded-full mt-4"
                        disabled={!isInStock}
                      />
                    </div>

                    {/* Delete Button */}
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="text-[#DC2626]  transition-colors p-2 shrink-0"
                      aria-label="Delete item"
                    >
                      <Trash2 className="size-5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </OverviewCard>

      <DeleteConfirmationModal
        open={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setItemToDelete(null);
        }}
        onConfirm={handleConfirmDelete}
        title="Remove from wishlist?"
        description="This item will be removed from your wishlist. You can add it back anytime."
        confirmText="Yes, Remove"
        cancelText="No, keep it"
        isLoading={removeFromWishlistMutation.isPending}
      />
    </section>
  );
};

export default CustomerWishlist;
