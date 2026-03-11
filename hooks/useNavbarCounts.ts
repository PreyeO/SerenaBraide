// hooks/useNavbarCounts.ts
import { useMemo } from "react";
import { useCart } from "@/features/cart-checkout/hooks/useCart";
// import { useWishlist } from "@/features/profile/hooks/customer/useWishlist"; // WISHLIST HIDDEN FOR LAUNCH

export function useNavbarCounts() {
  const { data: cartData } = useCart();
  // const { data: wishlistData } = useWishlist(); // WISHLIST HIDDEN FOR LAUNCH

  return useMemo(
    () => ({
      cart: cartData?.items?.reduce((sum, item) => sum + item.quantity, 0) ?? 0,
      // wishlist: wishlistData?.count ?? 0, // WISHLIST HIDDEN FOR LAUNCH
    }),
    [cartData?.items],
  );
}

export default useNavbarCounts;
