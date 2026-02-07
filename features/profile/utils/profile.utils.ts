import { format } from "date-fns";
import { VariantImage } from "@/features/products/product.type";

/**
 * Profile-related utility functions
 */

/**
 * Display value or "null" placeholder
 */
export function displayValue(value: string | null | undefined): string {
    if (value === null || value === undefined || value === "") {
        return "null";
    }
    return value;
}

/**
 * Format date to short format: "MMM dd, yyyy" (e.g., "Jan 15, 2024")
 */
export function formatDateShort(dateString: string): string {
    try {
        const date = new Date(dateString);
        return format(date, "MMM dd, yyyy");
    } catch {
        return dateString;
    }
}

/**
 * Format date to long format: "Month DD, YYYY" (e.g., "January 15, 2024")
 */
export function formatDateLong(dateString: string): string {
    try {
        return new Date(dateString).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
        });
    } catch {
        return dateString;
    }
}

/**
 * Format date to member since format: "Month Year" (e.g., "January 2024")
 */
export function formatMemberSince(dateString: string): string {
    return new Date(dateString).toLocaleDateString("en-US", {
        month: "long",
        year: "numeric",
    });
}

/**
 * Get primary image from variant images array
 */
export function getPrimaryVariantImage(
    images: VariantImage[] | undefined
): VariantImage | null {
    if (!images || images.length === 0) return null;
    const primaryImage = images.find((img) => img.is_primary);
    return primaryImage || images[0] || null;
}

/**
 * Format date of birth for display
 */
export function formatDateOfBirth(dateStr: string | null): string {
    if (!dateStr) return "null";
    try {
        return new Date(dateStr).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
        });
    } catch {
        return dateStr;
    }
}

/**
 * Get phone number from addresses with fallback to user phone
 */
export function getPrimaryPhoneNumber(
    addresses: Array<{ is_default?: boolean; phone_number?: string | null }> | undefined,
    userPhoneNumber?: string | null
): string | null {
    if (!addresses || addresses.length === 0) {
        return userPhoneNumber ?? null;
    }

    // Prefer default address if it has a phone number
    const defaultWithPhone = addresses.find(
        (addr) => addr.is_default && addr.phone_number
    );
    if (defaultWithPhone?.phone_number) {
        return defaultWithPhone.phone_number;
    }

    // Otherwise, use the first address that has a phone number
    const anyWithPhone = addresses.find((addr) => addr.phone_number);
    if (anyWithPhone?.phone_number) {
        return anyWithPhone.phone_number;
    }

    // Fallback to user phone number
    return userPhoneNumber ?? null;
}
