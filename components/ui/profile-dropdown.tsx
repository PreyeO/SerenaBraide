"use client";

import React from "react";
import {
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
} from "./dropdown-menu";
import { profileRoutes } from "@/features/profile/data/general.routes";
import Link from "next/link";
import LinkCta from "./btns/link-cta";
import { useAuthStore } from "@/features/auth/auth.store";
import { useRouter } from "next/navigation";
import { useLogout } from "@/features/auth/hooks/useLogout";
import { LogOut } from "lucide-react";

const ProfileDropdown = () => {
  const user = useAuthStore((state) => state.user);
  const router = useRouter();
  const logoutMutation = useLogout();

  const handleMenuItemClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    if (!user) {
      e.preventDefault();
      // Get current path to redirect back after login
      const returnUrl = encodeURIComponent(href);
      router.push(`/auth/login?return_url=${returnUrl}`);
    }
  };

  const handleLogout = () => {
    logoutMutation.mutate();
  };

  return (
    <DropdownMenuContent
      align="start"
      sideOffset={40}
      className="px-2.5 w-65 py-2.5 -translate-x-5 relative z-200"
    >
      <div className=" w-65flex flex-col  gap-1.5 ">
        {profileRoutes.map((route, index) => {
          return (
            <DropdownMenuGroup key={index}>
              <Link
                href={route.href}
                onClick={(e) => handleMenuItemClick(e, route.href)}
              >
                <DropdownMenuItem className="mb-2.5 cursor-pointer">
                  {route.title}
                </DropdownMenuItem>
              </Link>
            </DropdownMenuGroup>
          );
        })}
        {/* <div className="mb-2.5  text-[#3B3B3B] flex gap-2.5">
          <span className="w-10.5 h-10.5 rounded-[5px] bg-[#2F88FF]/10 flex items-center justify-center">
            <Trophy className="text-[#2F88FF] size-6" />
          </span>
          <div>
            <Paragraph
              className=" font-normal text-[12px] pb-0.5"
              content="Loyalty Point"
            />
            <Paragraph
              className=" font-medium text-sm"
              content="You have 0 points = $0.00"
            />
          </div>
        </div> */}
        {user ? (
          <button
            onClick={handleLogout}
            disabled={logoutMutation.isPending}
            className="w-full bg-[#3B3B3B] text-white mb-2.5 rounded-[50px] py-3 px-4 font-medium text-sm hover:bg-[#3B3B3B]/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            <LogOut className="size-4" />
            {logoutMutation.isPending ? "Logging out..." : "Logout"}
          </button>
        ) : (
          <>
            <Link href="/auth/login">
              <LinkCta
                label="login"
                className="w-full bg-[#3B3B3B] text-white mb-2.5  "
              />
            </Link>
            <Link href="/auth/register">
              <LinkCta
                label="Join us"
                className="mb-2.5 w-full text-[#3B3B3B] bg-white border border-[#3B3B3B] hover:bg-white"
              />
            </Link>
          </>
        )}
      </div>
    </DropdownMenuContent>
  );
};

export default ProfileDropdown;
