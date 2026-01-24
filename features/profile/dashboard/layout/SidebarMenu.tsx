"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu as Menu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarSeparator,
} from "@/components/ui/sidebar";

import {
  adminRoutes,
  customerRoutes,
} from "@/features/profile/data/general.routes";
import { cn } from "@/lib/utils";
import { SidebarItem } from "@/features/profile/type/profile.general";
import ProductImage from "@/components/ui/images/product-image";

type SidebarMenuProps = {
  role: "customer" | "admin";
  activeBg?: string;
  activeText?: string;
  hoverText?: string;
  hoverBg?: string;
  textColor?: string;
};

const SidebarMenu: React.FC<SidebarMenuProps> = ({
  role,
  activeBg,
  activeText,
}) => {
  const pathname = usePathname();
  const routes: SidebarItem[] = role === "admin" ? adminRoutes : customerRoutes;

  // Flatten routes to include parent and children as separate items
  const flattenRoutes = (items: SidebarItem[]): SidebarItem[] => {
    const flattened: SidebarItem[] = [];
    items.forEach((item) => {
      // Add parent item if it has an href
      if (item.href) {
        flattened.push({ ...item, children: undefined });
      }
      // Add all children as separate items
      if (item.children && item.children.length > 0) {
        item.children.forEach((child) => {
          flattened.push(child);
        });
      }
    });
    return flattened;
  };

  const flatRoutes = flattenRoutes(routes);

  const renderMenuItem = (item: SidebarItem) => {
    const Icon = item.icon;
    const isActive = pathname === item.href;

    return (
      <SidebarMenuItem
        key={item.title}
        className="pb-3.75 text-[#6F6E6C] font-normal text-sm hover:font-medium hover:text-[#3B3B3B]"
      >
        <Link href={item.href ?? "#"} passHref>
          <SidebarMenuButton
            isActive={isActive}
            className={cn(
              "transition-all w-full justify-start",
              isActive
                ? `px-4 py-5 rounded-lg font-medium ${activeBg} ${activeText}`
                : `px-3 py-5`,
            )}
          >
            <Icon className="size-5.5" />
            <span className="text-base flex-1 text-left">{item.title}</span>
          </SidebarMenuButton>
        </Link>
      </SidebarMenuItem>
    );
  };

  return (
    <SidebarContent className="overflow-hidden">
      <SidebarHeader className="flex px-5 py-2.5 items-center">
        <ProductImage
          alt="logo image"
          src="/logo-2.svg"
          height={40}
          width={107.59}
          className=" "
        />
      </SidebarHeader>

      <SidebarSeparator />

      <SidebarGroup className="pt-6 px-5">
        <SidebarGroupContent className="">
          <Menu className="">{flatRoutes.map((item) => renderMenuItem(item))}</Menu>
        </SidebarGroupContent>
      </SidebarGroup>
    </SidebarContent>
  );
};

export default SidebarMenu;
