"use client";

import React from "react";
import Link from "next/link";
import { Bell, Plus, Search, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import SubHeading from "@/components/ui/typography/subHeading";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { ModeToggle } from "@/components/ui/mode-toggle";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { useAuthStore } from "@/features/auth/auth.store";
import { useLogout } from "@/features/auth/hooks/useLogout";

const Header = () => {
  const user = useAuthStore((state) => state.user);
  const logoutMutation = useLogout();

  const handleLogout = () => {
    logoutMutation.mutate();
  };

  const initials =
    user?.first_name && user?.last_name
      ? `${user.first_name[0]}${user.last_name[0]}`.toUpperCase()
      : user?.email?.[0].toUpperCase() || "A";

  const fullName =
    user?.first_name && user?.last_name
      ? `${user.first_name} ${user.last_name}`
      : "Admin User";

  return (
    <header className="h-15 flex justify-between items-center px-7.5 my-1">
      <div className="flex items-center gap-7.5">
        <SubHeading
          className="text-[#6F6E6C] font-normal text-sm whitespace-nowrap"
          title="Dashboard / Admin"
        />

        <div className="relative w-112.5">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-[#9A9A98]" />
          <Input
            placeholder="Search product, customers, order"
            className="pl-10 text-sm rounded-full border border-[#D1D5DB]"
          />
        </div>
      </div>

      <div className="flex items-center gap-2">
        <div className="flex gap-6">
          <ModeToggle />
          <Link href="/admin/products?tab=add-product">
            <Button className="py-1.75 px-2.5 rounded-full text-sm font-medium text-white">
              <Plus />
              Add new product
            </Button>
          </Link>
        </div>
        <div className="border border-[#F0F0F0] h-4" />

        <div className="flex gap-2">
          {/* Avatar Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="cursor-pointer">
                <Avatar>
                  <AvatarImage src="/avatar.png" alt="Admin avatar" />
                  <AvatarFallback>{initials}</AvatarFallback>
                </Avatar>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-64 p-4">
              {/* Admin Info */}
              <div className="flex items-center gap-3 mb-3">
                <Avatar className="h-12 w-12">
                  <AvatarImage src="/avatar.png" alt="Admin avatar" />
                  <AvatarFallback className="text-lg">{initials}</AvatarFallback>
                </Avatar>
                <div className="flex flex-col min-w-0">
                  <span className="font-medium text-sm text-[#3B3B3B] truncate">
                    {fullName}
                  </span>
                  <span className="text-xs text-[#6F6E6C] truncate">
                    {user?.email || "admin@example.com"}
                  </span>
                </div>
              </div>

              <DropdownMenuSeparator />

              {/* Logout Button */}
              <button
                onClick={handleLogout}
                disabled={logoutMutation.isPending}
                className="w-full mt-3 bg-[#3B3B3B] text-white rounded-full py-3 px-4 font-medium text-sm hover:bg-[#3B3B3B]/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                <LogOut className="size-4" />
                {logoutMutation.isPending ? "Logging out..." : "Logout"}
              </button>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default Header;
