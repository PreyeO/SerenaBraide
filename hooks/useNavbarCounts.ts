// hooks/useNavbarCounts.ts
import { useMemo } from "react";
import { useCart } from "@/features/cart-checkout/hooks/useCart";
import { useWishlist } from "@/features/profile/hooks/customer/useWishlist";

export function useNavbarCounts() {
  const { data: cartData } = useCart();
  const { data: wishlistData } = useWishlist();

  return useMemo(
    () => ({
      cart: cartData?.items?.reduce((sum, item) => sum + item.quantity, 0) ?? 0,
      wishlist: wishlistData?.count ?? 0,
    }),
    [cartData?.items, wishlistData?.count],
  );
}

export default useNavbarCounts;
