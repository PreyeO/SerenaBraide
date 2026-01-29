"use client";

import React from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { customerRoutes } from "@/features/profile/data/general.routes";

interface MobileProfileMenuProps {
    className?: string;
}

const MobileProfileMenu: React.FC<MobileProfileMenuProps> = ({ className }) => {
    // Filter out "My Account" since we're already on that page
    const menuItems = customerRoutes.filter(
        (route) => route.title !== "My Account"
    );

    return (
        <nav className={className}>
            <ul className="flex flex-col">
                {menuItems.map((item, index) => (
                    <li key={item.title}>
                        <Link
                            href={item.href ?? "#"}
                            className="flex items-center justify-between py-4 text-[#3B3B3B] text-base font-normal hover:text-[#6F6E6C] transition-colors"
                        >
                            <span>{item.title}</span>
                            <ChevronRight className="size-5 text-[#9A9A98]" />
                        </Link>
                        {index < menuItems.length - 1 && (
                            <div className="border-b border-[#F0F0F0]" />
                        )}
                    </li>
                ))}
            </ul>
        </nav>
    );
};

export default MobileProfileMenu;
