"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  // SidebarHeader,
  SidebarMenu as Menu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarSeparator,
  Sidebar,
} from "@/components/ui/sidebar";

import {
  adminRoutes,
  customerRoutes,
} from "@/features/profile/data/general.routes";
import { cn } from "@/lib/utils";
import { SidebarItem } from "@/features/profile/type/profile.general";

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
  hoverText,
  hoverBg,
  textColor,
}) => {
  const pathname = usePathname();
  const routes: SidebarItem[] = role === "admin" ? adminRoutes : customerRoutes;

  return (
    <SidebarContent className="overflow-hidden   ">
      {/* Sidebar Logo + Branding */}
      {/* <SidebarHeader className="flex items-center">
          <Logo />
        </SidebarHeader> */}

      {/* <SidebarSeparator /> */}

      <SidebarGroup className="">
        <SidebarGroupContent className="">
          <Menu className="">
            {routes.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;

              return (
                <SidebarMenuItem key={item.title} className="pb-1   ">
                  <Link href={item.href ?? "#"} passHref>
                    <SidebarMenuButton
                      isActive={isActive}
                      className={cn(
                        isActive
                          ? `${activeBg} ${activeText} ${hoverBg}  ${hoverText} `
                          : `${hoverBg}  ${hoverText} ${textColor} `
                      )}
                    >
                      <Icon className="size-5" />
                      <span className="text-base ">{item.title}</span>
                    </SidebarMenuButton>
                  </Link>
                </SidebarMenuItem>
              );
            })}
          </Menu>
        </SidebarGroupContent>
      </SidebarGroup>
    </SidebarContent>
  );
};

export default SidebarMenu;
