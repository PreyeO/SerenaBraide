"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Bell, Plus, Search, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import SubHeading from "@/components/ui/typography/subHeading";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { ModeToggle } from "@/components/ui/mode-toggle";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuthStore } from "@/features/auth/auth.store";
import { useCartStore } from "@/features/cart-checkout/store/cart.store";
import LogoutModal from "@/features/profile/components/admin/LogoutModal";

const Header = () => {
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const router = useRouter();
  const clearAuth = useAuthStore((state) => state.clearAuth);
  const clearCart = useCartStore((state) => state.clearCart);
  const user = useAuthStore((state) => state.user);

  const handleLogout = () => {
    clearAuth();
    clearCart();
    router.push("/auth/login");
  };

  const initials = user?.first_name && user?.last_name
    ? `${user.first_name[0]}${user.last_name[0]}`.toUpperCase()
    : user?.email?.[0].toUpperCase() || "A";

  return (
    <>
      <header className="h-15 flex justify-between items-center px-7.5 my-1">
        <div className="flex items-center gap-7.5">
          <SubHeading
            className="text-[#6F6E6C] font-normal text-sm whitespace-nowrap"
            title="Dashboard / Admin"
          />

          <div className="relative w-112.5  ">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-[#9A9A98]" />

            {/* Input */}
            <Input
              placeholder="Search product, customers, order"
              className=" pl-10 text-sm rounded-full border border-[#D1D5DB] "
            />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex gap-6">
            <ModeToggle />
            <Link href="/admin/products/new-product">
              <Button className="py-1.75 px-2.5 rounded-full text-sm font-meduim text-white">
                <Plus />
                Add new user
              </Button>
            </Link>
          </div>
          <div className="border border-[#F0F0F0] h-4" />

          <div className="flex gap-2">
            <button className="relative p-2 rounded-full hover:bg-muted transition">
              <Bell className="size-5 text-[#3B3B3B]" />
              {/* Notification dot */}
              <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-500" />
            </button>

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
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem
                  variant="destructive"
                  onClick={() => setShowLogoutModal(true)}
                  className="cursor-pointer"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      <LogoutModal
        open={showLogoutModal}
        onClose={() => setShowLogoutModal(false)}
        onConfirm={handleLogout}
      />
    </>
  );
};

export default Header;
