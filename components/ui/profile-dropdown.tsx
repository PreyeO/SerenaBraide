import React from "react";
import {
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
} from "./dropdown-menu";
import { profileRoutes } from "@/features/profile/data/general.routes";
import Link from "next/link";
import LinkCta from "./btns/link-cta";
import { Trophy } from "lucide-react";
import Paragraph from "./typography/paragraph";

const ProfileDropdown = () => {
  return (
    <DropdownMenuContent
      align="start"
      sideOffset={40}
      className="px-[10px] w-full py-[10px] -translate-x-5 relative z-[200]"
    >
      <div className=" w-[260px] flex flex-col  gap-[6px] ">
        {profileRoutes.map((route, index) => {
          return (
            <DropdownMenuGroup key={index}>
              <Link href={route.href}>
                <DropdownMenuItem className="mb-[10px] cursor-pointer">
                  {route.title}
                </DropdownMenuItem>
              </Link>
            </DropdownMenuGroup>
          );
        })}
        <div className="mb-[10px]  text-[#3B3B3B] flex gap-[10px]">
          <span className="w-[42px] h-[42px] rounded-[5px] bg-[#2F88FF]/10 flex items-center justify-center">
            <Trophy className="text-[#2F88FF] size-6" />
          </span>
          <div>
            <Paragraph
              className=" font-normal text-[12px] pb-[2px] "
              content="Loyalty Point"
            />
            <Paragraph
              className=" font-medium text-sm"
              content="You have 0 points = $0.00"
            />
          </div>
        </div>
        <Link href="/auth/login">
          <LinkCta
            label="login"
            className="w-full bg-[#3B3B3B] text-white mb-[10px]  "
          />
        </Link>
        <Link href="/auth/register">
          <LinkCta
            label="Join us"
            className="mb-[10px] w-full text-[#3B3B3B] bg-white border border-[#3B3B3B] hover:bg-white"
          />
        </Link>
      </div>
    </DropdownMenuContent>
  );
};

export default ProfileDropdown;
