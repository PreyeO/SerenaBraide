"use client";

import { useState, useMemo, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useWishlist } from "@/features/profile/hooks/customer/useWishlist";
import { useAddToWishlist } from "@/features/profile/hooks/customer/useAddToWishlist";
import { useRemoveFromWishlist } from "@/features/profile/hooks/customer/useRemoveFromWishlist";
import { useAuthStore } from "@/features/auth/auth.store";
import { notify } from "@/lib/notify";

interface UseProductWishlistProps {
    selectedVariantId: number | null;
}

interface UseProductWishlistReturn {
    isInWishlist: boolean;
    isLoading: boolean;
    isAnimating: boolean;
    handleToggle: () => void;
}

/**
 * Hook for managing product wishlist functionality
 */
export function useProductWishlist({
    selectedVariantId,
}: UseProductWishlistProps): UseProductWishlistReturn {
    const router = useRouter();
    const user = useAuthStore((state) => state.user);
    const [isAnimating, setIsAnimating] = useState(false);

    const { data: wishlistData } = useWishlist();
    const addToWishlistMutation = useAddToWishlist();
    const removeFromWishlistMutation = useRemoveFromWishlist();

    const isInWishlist = useMemo(() => {
        if (!selectedVariantId || !wishlistData?.results) return false;
        return wishlistData.results.some(
            (item) => item.product_variant.id === selectedVariantId
        );
    }, [selectedVariantId, wishlistData]);

    const wishlistItemId = useMemo(() => {
        if (!selectedVariantId || !wishlistData?.results) return null;
        const item = wishlistData.results.find(
            (item) => item.product_variant.id === selectedVariantId
        );
        return item?.id || null;
    }, [selectedVariantId, wishlistData]);

    const isLoading =
        addToWishlistMutation.isPending || removeFromWishlistMutation.isPending;

    const handleToggle = useCallback(() => {
        if (!user) {
            const currentPath = window.location.pathname;
            router.push(`/auth/login?return_url=${encodeURIComponent(currentPath)}`);
            return;
        }

        if (!selectedVariantId) {
            notify.error("Please select a variant first");
            return;
        }

        setIsAnimating(true);
        setTimeout(() => setIsAnimating(false), 300);

        if (isInWishlist && wishlistItemId) {
            removeFromWishlistMutation.mutate(wishlistItemId);
        } else {
            addToWishlistMutation.mutate({ product_variant: selectedVariantId });
        }
    }, [
        user,
        selectedVariantId,
        isInWishlist,
        wishlistItemId,
        router,
        addToWishlistMutation,
        removeFromWishlistMutation,
    ]);

    return {
        isInWishlist,
        isLoading,
        isAnimating,
        handleToggle,
    };
}
