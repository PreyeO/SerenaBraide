// features/cart-checkout/components/CartSection.tsx
"use client";

import { useState } from "react";
import BackNavigation from "@/components/ui/btns/back-navigation";
import CartHeader from "../../shared/CartHeader";
import CartItem from "../../shared/CartItem";
import Receipt from "../../shared/Receipt";
import EmptyCart from "../empty-screens/EmptyCart";
import { useCart } from "../../hooks/useCart";
import { useUpdateCartItem } from "../../hooks/useUpdateCartItem";
import { useRemoveCartItem } from "../../hooks/useRemoveCartItem";
import LoadingState from "@/components/ui/loaders/loading-state";
import { getOrderItemImage } from "../../utils/checkout.utils";
import { formatCurrency } from "@/lib/utils";
import DeleteConfirmationModal from "@/components/ui/modals/delete-confirmation-modal";
import { CartItem as CartItemType } from "../../type/cart.type";

const CartSection = () => {
  const { data, isLoading } = useCart();
  const updateMutation = useUpdateCartItem();
  const removeMutation = useRemoveCartItem();
  const [itemToDelete, setItemToDelete] = useState<CartItemType | null>(null);

  // Show loading only on initial load (no data yet), not on refetches
  if (isLoading && !data) {
    return <LoadingState />;
  }

  const cartItems = data?.items ?? [];

  if (!cartItems.length) return <EmptyCart />;

  const totalQuantity = cartItems.reduce((sum, i) => sum + i.quantity, 0);
  const totalPrice = cartItems.reduce((sum, i) => sum + i.subtotal, 0);

  const handleDeleteClick = (item: CartItemType) => {
    setItemToDelete(item);
  };

  const handleDeleteConfirm = () => {
    if (itemToDelete) {
      removeMutation.mutate(itemToDelete.id, {
        onSuccess: () => {
          setItemToDelete(null);
        },
      });
    }
  };

  const handleDeleteCancel = () => {
    setItemToDelete(null);
  };

  const getItemImage = (item: CartItemType) => {
    return getOrderItemImage(item.variant.images);
  };

  return (
    <section className="lg:pt-38 pt-33 lg:px-16 px-6 lg:pb-25 pb-12.5 ">
      <BackNavigation href="/" text="Back to Home page" />
      <CartHeader totalItems={totalQuantity} />

      <div className="md:flex flex-wrap md:flex-nowrap lg:gap-10 md:gap-5 gap-0 lg:mt-10 mt-4 ">
        <div className="flex flex-col gap-6 lg:w-175 w-full">
          {cartItems.map((item) => {
            const image = getItemImage(item);

            return (
              <CartItem
                key={item.id}
                image={image}
                name={item.variant.product_name}
                price={formatCurrency(item.variant.price)}
                metaLabel={
                  item.variant.size ? `Size: ${item.variant.size}` : ""
                }
                quantity={item.quantity}
                showQuantity
                onIncrease={() =>
                  updateMutation.mutate({
                    id: item.id,
                    quantity: item.quantity + 1,
                  })
                }
                onDecrease={() =>
                  item.quantity > 1 &&
                  updateMutation.mutate({
                    id: item.id,
                    quantity: item.quantity - 1,
                  })
                }
                onRemove={() => handleDeleteClick(item)}
                height={150}
                width={150}
                imageClassName="lg:w-37.5 w-full h-full object-cover"
                className="bg-[#F6F7F8]"
              />
            );
          })}
        </div>

        <div className="lg:w-143 w-full md:mt-0 mt-8.5 ">
          <Receipt
            totalItems={totalQuantity}
            totalPrice={totalPrice}
            showButton
          />
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {itemToDelete && (
        <DeleteConfirmationModal
          open={!!itemToDelete}
          onClose={handleDeleteCancel}
          onConfirm={handleDeleteConfirm}
          productImage={getItemImage(itemToDelete)}
          productName={itemToDelete.variant.product_name}
          productPrice={formatCurrency(itemToDelete.variant.price)}
          productSize={itemToDelete.variant.size || undefined}
          productQuantity={itemToDelete.quantity}
          isLoading={removeMutation.isPending}
        />
      )}
    </section>
  );
};

export default CartSection;
