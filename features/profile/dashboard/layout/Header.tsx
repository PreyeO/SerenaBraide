"use client";

import React from "react";
import Link from "next/link";
import { Plus, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import InitialsAvatar from "@/components/ui/InitialsAvatar";
import { ModeToggle } from "@/components/ui/mode-toggle";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { useAuthStore } from "@/features/auth/auth.store";
import { useLogout } from "@/features/auth/hooks/useLogout";

const getGreeting = (): string => {
  const hour = new Date().getHours();
  if (hour < 12) return "Good Morning";
  if (hour < 17) return "Good Afternoon";
  return "Good Evening";
};

const Header = () => {
  const user = useAuthStore((state) => state.user);
  const logoutMutation = useLogout();

  const handleLogout = () => {
    logoutMutation.mutate();
  };

  const fullName =
    user?.first_name && user?.last_name
      ? `${user.first_name} ${user.last_name}`
      : "";

  const greeting = getGreeting();

  return (
    <header className=" px-5 py-2.5 flex justify-between items-center border-b border-[#F0F0F0]">
      <div className="flex items-center gap-7.5">
        <div className="text-[#6F6E6C] font-PPEditorialNew font-normal text-base flex items-center ">
          <h2>
            {greeting}, {fullName}
          </h2>
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
                <InitialsAvatar
                  firstName={user?.first_name}
                  lastName={user?.last_name}
                  fallback={user?.email}
                  size="md"
                  className="bg-[#47011d] text-white"
                />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-64 p-4">
              {/* Admin Info */}
              <div className="flex items-center gap-3 mb-3">
                <InitialsAvatar
                  firstName={user?.first_name}
                  lastName={user?.last_name}
                  fallback={user?.email}
                  size="md"
                  className="text-white bg-[#47011d]"
                />
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
