import React from "react";

interface ShadesBadgeProps {
    count: number;
    className?: string;
}

const ShadesBadge: React.FC<ShadesBadgeProps> = ({ count, className = "" }) => {
    if (count === 0) return null;

    return (
        <span
            className={`inline-block text-xs text-[#6F6E6C] border border-[#D1D5DB] rounded-full px-3 py-1 mb-3 ${className}`}
        >
            Available in {count} {count === 1 ? "shade" : "shades"}
        </span>
    );
};

export default ShadesBadge;
