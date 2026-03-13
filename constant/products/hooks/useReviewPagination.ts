"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import { ProductReview } from "../product.type";

interface UseReviewPaginationProps {
    reviews: ProductReview[] | undefined;
    mobilePageSize?: number;
    desktopPageSize?: number;
}

interface UseReviewPaginationReturn {
    paginatedReviews: ProductReview[];
    currentPage: number;
    totalPages: number;
    isMobile: boolean;
    goToNextPage: () => void;
    goToPrevPage: () => void;
    displayRange: string;
}

/**
 * Hook for handling review pagination with mobile/desktop awareness
 */
export function useReviewPagination({
    reviews,
    mobilePageSize = 1,
    desktopPageSize = 5,
}: UseReviewPaginationProps): UseReviewPaginationReturn {
    const [currentPage, setCurrentPage] = useState(1);
    const [isMobile, setIsMobile] = useState(false);

    // Detect mobile screen size
    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768); // md breakpoint
        };

        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    // Reset page when switching between mobile/desktop
    useEffect(() => {
        setCurrentPage(1);
    }, [isMobile]);

    const pageSize = isMobile ? mobilePageSize : desktopPageSize;

    // Get paginated reviews
    const paginatedReviews = useMemo(() => {
        if (!reviews) return [];

        const startIndex = (currentPage - 1) * pageSize;
        const endIndex = startIndex + pageSize;

        return reviews.slice(startIndex, endIndex);
    }, [reviews, currentPage, pageSize]);

    // Calculate total pages
    const totalPages = useMemo(() => {
        if (!reviews) return 0;
        return Math.ceil(reviews.length / pageSize);
    }, [reviews, pageSize]);

    // Pagination handlers
    const goToNextPage = useCallback(() => {
        if (currentPage < totalPages) {
            setCurrentPage((prev) => prev + 1);
        }
    }, [currentPage, totalPages]);

    const goToPrevPage = useCallback(() => {
        if (currentPage > 1) {
            setCurrentPage((prev) => prev - 1);
        }
    }, [currentPage]);

    // Display range text
    const displayRange = useMemo(() => {
        if (!reviews || reviews.length === 0) return "";

        const startIndex = (currentPage - 1) * pageSize + 1;
        const endIndex = Math.min(currentPage * pageSize, reviews.length);

        if (startIndex === endIndex) {
            return `${startIndex}`;
        }
        return `${startIndex}-${endIndex}`;
    }, [reviews, currentPage, pageSize]);

    return {
        paginatedReviews,
        currentPage,
        totalPages,
        isMobile,
        goToNextPage,
        goToPrevPage,
        displayRange,
    };
}
