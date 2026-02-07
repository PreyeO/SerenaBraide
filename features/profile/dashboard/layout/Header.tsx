"use client";

import React from "react";
import Link from "next/link";
import { Plus, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
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
    <header className=" px-5 py-2.5 flex justify-between items-center border-b border-[#F0F0F0]">
      <div className="flex items-center gap-7.5">
        <div className="text-[#6F6E6C] font-PPEditorialNew font-normal text-base flex items-center ">
          <h2>Hello, {fullName}</h2>

          <span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="50"
              height="50"
              viewBox="0 0 72 72"
            >
              <path
                fill="#6a462f"
                d="M18.658 19.24a3.531 3.531 0 1 0-5.564 4.25l11.533 15.1l2.688 3.387l-7.89-10.331a3.531 3.531 0 1 0-5.564 4.249l7.891 10.331l6.27 7.899c5.468 6.273 14.515 5.93 20.787.465a19.62 19.62 0 0 0 6.515-12.31c.386-4.233.807-15.301.807-15.301c-.182-2.601-3.135-4.524-3.515-3.18l-4.894 9.757l-3.366-4.223l3.366 4.223l-3.366-4.223l-13.465-17.208a3.531 3.531 0 1 0-5.563 4.249l4.249 5.563L36 30.417l-13.419-17.68a3.531 3.531 0 1 0-5.563 4.248L31.689 36"
              />
              <g
                fill="none"
                stroke="#000"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
              >
                <path d="M18.658 19.24a3.531 3.531 0 1 0-5.564 4.25l11.533 15.1l2.688 3.387l-7.89-10.331a3.531 3.531 0 1 0-5.564 4.249l7.891 10.331l6.27 7.899c5.468 6.273 14.515 5.93 20.787.465a19.62 19.62 0 0 0 6.515-12.31c.386-4.233.807-15.301.807-15.301c-.182-2.601-3.135-4.524-3.515-3.18l-4.894 9.757l-3.366-4.223l3.366 4.223l-3.366-4.223l-13.465-17.208a3.531 3.531 0 1 0-5.563 4.249l4.249 5.563L36 30.417l-13.419-17.68a3.531 3.531 0 1 0-5.563 4.248L31.689 36" />
                <path
                  stroke-miterlimit="10"
                  d="M11.673 42.872c0 2.566 1.747 4.643 3.905 4.643m-8.517-5.078c0 5.596 3.81 10.124 8.517 10.124m29.684-31.323c0-2.567-1.747-4.643-3.906-4.643m8.517 5.078c0-5.596-3.81-10.124-8.517-10.124"
                />
              </g>
            </svg>
          </span>
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
                  <AvatarFallback className="text-lg">
                    {initials}
                  </AvatarFallback>
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
