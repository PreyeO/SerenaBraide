// features/cart-checkout/components/CartSection.tsx
"use client";

import BackNavigation from "@/components/ui/btns/back-navigation";
import CartHeader from "../../shared/CartHeader";
import CartItem from "../../shared/CartItem";
import Receipt from "../../shared/Receipt";
import EmptyCart from "../empty-screens/EmptyCart";
import { useCart } from "../../hooks/useCart";
import { useUpdateCartItem } from "../../hooks/useUpdateCartItem";
import { useRemoveCartItem } from "../../hooks/useRemoveCartItem";

const CartSection = () => {
  const { data, isLoading } = useCart();
  const updateMutation = useUpdateCartItem();
  const removeMutation = useRemoveCartItem();

  // Only show loading on initial load, not on refetches
  if (isLoading) {
    return <p className="pt-38 px-16">Loading cart...</p>;
  }

  const cartItems = data?.items ?? [];

  if (!cartItems.length) return <EmptyCart />;

  const totalQuantity = cartItems.reduce((sum, i) => sum + i.quantity, 0);
  const totalPrice = cartItems.reduce((sum, i) => sum + i.subtotal, 0);

  return (
    <section className="pt-38 px-16 mb-25">
      <BackNavigation href="/" text="Back to Home page" />
      <CartHeader totalItems={totalQuantity} />

      <div className="flex gap-10 mt-10">
        <div className="flex flex-col gap-6 w-175">
          {cartItems.map((item) => {
            const image =
              item.variant.images.find((img) => img.is_primary)?.image_url ??
              item.variant.images[0]?.image_url ??
              "/cart-placeholder.png";

            return (
              <CartItem
                key={item.id}
                image={image}
                name={item.variant.product_name}
                price={`$${item.variant.price}`}
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
                onRemove={() => removeMutation.mutate(item.id)}
                height={150}
                width={150}
                className="bg-[#F6F7F8]"
              />
            );
          })}
        </div>

        <div className="w-143">
          <Receipt
            totalItems={totalQuantity}
            totalPrice={totalPrice}
            showButton
          />
        </div>
      </div>
    </section>
  );
};

export default CartSection;
