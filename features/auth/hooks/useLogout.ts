"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useAuthStore } from "../auth.store";
import { useCartStore } from "@/features/cart-checkout/store/cart.store";
import { notify } from "@/lib/notify";

interface UseLogoutOptions {
  onSuccess?: () => void;
  onError?: (error: Error) => void;
}

export const useLogout = ({ onSuccess, onError }: UseLogoutOptions = {}) => {
  const clearAuth = useAuthStore((state) => state.clearAuth);
  const clearCart = useCartStore((state) => state.clearCart);
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      // Clear auth state (tokens and user)
      clearAuth();
      
      // Clear cart
      clearCart();
      
      // Clear all react-query cache
      queryClient.clear();
      
      // No API call needed - logout is handled client-side
      return Promise.resolve();
    },
    onSuccess: () => {
      notify.success("Logged out successfully!");
      // Redirect to home page
      router.push("/");
      
      if (onSuccess) {
        onSuccess();
      }
    },
    onError: (error: Error) => {
      notify.error("Failed to logout. Please try again.");
      if (onError) {
        onError(error);
      }
    },
  });
};

