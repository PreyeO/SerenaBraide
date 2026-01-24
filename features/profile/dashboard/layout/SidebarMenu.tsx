"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, ChevronRight } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

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
  const [openItems, setOpenItems] = useState<Set<string>>(new Set());

  const toggleItem = (title: string) => {
    setOpenItems((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(title)) {
        newSet.delete(title);
      } else {
        newSet.add(title);
      }
      return newSet;
    });
  };

  const renderMenuItem = (item: SidebarItem, depth = 0) => {
    const Icon = item.icon;
    const isActive = pathname === item.href;
    const hasChildren = item.children && item.children.length > 0;
    const isOpen = openItems.has(item.title);

    if (hasChildren) {
      const parentContent = (
        <CollapsibleTrigger asChild>
          <SidebarMenuButton
            isActive={isActive}
            className={cn(
              "transition-all w-full justify-start cursor-pointer",
              isActive
                ? `px-4 py-5 rounded-lg font-medium ${activeBg} ${activeText}`
                : `px-3 py-5`,
            )}
          >
            <Icon className="size-5.5" />
            <span className="text-base flex-1 text-left">{item.title}</span>
            {isOpen ? (
              <ChevronDown className="size-4" />
            ) : (
              <ChevronRight className="size-4" />
            )}
          </SidebarMenuButton>
        </CollapsibleTrigger>
      );

      return (
        <Collapsible
          key={item.title}
          open={isOpen}
          onOpenChange={() => toggleItem(item.title)}
        >
          <SidebarMenuItem className="pb-3.75 text-[#6F6E6C] font-normal text-sm hover:font-medium hover:text-[#3B3B3B]">
            {item.href ? (
              <Link href={item.href} passHref>
                {parentContent}
              </Link>
            ) : (
              parentContent
            )}
            <CollapsibleContent className="space-y-1">
              <div className="ml-6 border-l border-gray-200 pl-4">
                {item.children?.map((child) =>
                  renderMenuItem(child, depth + 1),
                )}
              </div>
            </CollapsibleContent>
          </SidebarMenuItem>
        </Collapsible>
      );
    }

    // Child items (depth > 0) have smaller styling
    const isChild = depth > 0;

    return (
      <SidebarMenuItem
        key={item.title}
        className={cn(
          "text-[#6F6E6C] font-normal hover:font-medium hover:text-[#3B3B3B]",
          isChild ? "pb-2 text-xs" : "pb-3.75 text-sm",
        )}
      >
        <Link href={item.href ?? "#"} passHref>
          <SidebarMenuButton
            isActive={isActive}
            className={cn(
              "transition-all",
              isActive
                ? `px-4 py-3 rounded-lg font-medium ${activeBg} ${activeText}`
                : isChild
                  ? `px-2 py-2`
                  : `px-3 py-5`,
            )}
          >
            {!isChild && <Icon className="size-5.5" />}
            <span className={cn("text-base", isChild && "text-sm")}>
              {item.title}
            </span>
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
          <Menu className="">{routes.map((item) => renderMenuItem(item))}</Menu>
        </SidebarGroupContent>
      </SidebarGroup>
    </SidebarContent>
  );
};

export default SidebarMenu;
