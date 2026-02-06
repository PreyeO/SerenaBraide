import { formatDistanceToNow } from "date-fns";
import { ProductReview, VariantImage } from "./product.type";

/**
 * Review-related utility functions
 */

/**
 * Format date to "X weeks ago" format
 */
export function formatReviewDate(dateString: string): string {
    try {
        const date = new Date(dateString);
        return formatDistanceToNow(date, { addSuffix: true });
    } catch {
        return "Recently";
    }
}

/**
 * Get initials from customer profile (fallback to "U" for unknown)
 */
export function getCustomerInitials(customer?: {
    first_name?: string;
    last_name?: string;
}): string {
    if (!customer) return "U";

    const firstInitial = customer.first_name?.charAt(0) || "";
    const lastInitial = customer.last_name?.charAt(0) || "";

    return `${firstInitial}${lastInitial}`.toUpperCase() || "U";
}

/**
 * Get primary image from review's order item variant
 */
export function getReviewPrimaryImage(review: ProductReview): VariantImage | null {
    if (!review?.order_item?.variant?.images) return null;
    const primaryImage = review.order_item.variant.images.find(
        (img) => img.is_primary
    );
    return primaryImage || review.order_item.variant.images[0] || null;
}

/**
 * Calculate review statistics from reviews array
 */
export interface ReviewStats {
    averageRating: number;
    totalReviews: number;
    recommendationRate: number;
}

export function calculateReviewStats(
    reviews: ProductReview[] | undefined,
    totalCount: number = 0
): ReviewStats {
    if (!reviews || reviews.length === 0) {
        return { averageRating: 0, totalReviews: 0, recommendationRate: 0 };
    }

    const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
    const average = totalRating / reviews.length;
    const recommendedCount = reviews.filter((r) => r.rating >= 4).length;
    const recommendationRate = Math.round(
        (recommendedCount / reviews.length) * 100
    );

    return {
        averageRating: Math.round(average * 10) / 10, // Round to 1 decimal
        totalReviews: totalCount || reviews.length,
        recommendationRate,
    };
}
