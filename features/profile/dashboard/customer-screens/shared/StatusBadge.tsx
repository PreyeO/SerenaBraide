"use client";

import React from "react";
import { Badge } from "@/components/ui/badge";
import { LucideIcon } from "lucide-react";

interface StatusBadgeProps {
    status: string;
    color: string;
    icon: LucideIcon;
    iconBg: string;
    variant?: "mobile" | "desktop" | "both";
    showDate?: boolean;
    date?: string;
}

/**
 * Format date for display
 */
const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
    });
};

/**
 * Reusable status badge component for orders and fulfilments
 */
const StatusBadge: React.FC<StatusBadgeProps> = ({
    status,
    color,
    icon: Icon,
    iconBg,
    variant = "both",
    showDate = false,
    date,
}) => {
    const statusText =
        showDate && date ? `${status} on ${formatDate(date)}` : status;

    // Mobile variant - transparent bg, left aligned
    if (variant === "mobile") {
        return (
            <Badge
                variant="secondary"
                className="flex items-center gap-1.5 px-0 py-0 text-xs bg-transparent"
                style={{ color }}
            >
                <Icon className="size-4" color={iconBg} />
                <span className="whitespace-nowrap">{statusText}</span>
            </Badge>
        );
    }

    // Desktop variant - colored bg
    if (variant === "desktop") {
        return (
            <Badge
                variant="secondary"
                className="flex items-center gap-1 px-2 py-1 text-xs"
                style={{
                    backgroundColor: `${color}10`,
                    color,
                }}
            >
                <Icon className="size-4" color={iconBg} />
                <span className="whitespace-nowrap">{status}</span>
            </Badge>
        );
    }

    // Both variants - responsive
    return (
        <>
            {/* Mobile */}
            <div className="flex lg:hidden">
                <Badge
                    variant="secondary"
                    className="flex items-center gap-1.5 px-0 py-0 text-xs bg-transparent"
                    style={{ color }}
                >
                    <Icon className="size-4" color={iconBg} />
                    <span className="whitespace-nowrap">{statusText}</span>
                </Badge>
            </div>
            {/* Desktop */}
            <div className="hidden lg:block">
                <Badge
                    variant="secondary"
                    className="flex items-center gap-1 px-2 py-1 text-xs"
                    style={{
                        backgroundColor: `${color}10`,
                        color,
                    }}
                >
                    <Icon className="size-4" color={iconBg} />
                    <span className="whitespace-nowrap">{status}</span>
                </Badge>
            </div>
        </>
    );
};

export default StatusBadge;
