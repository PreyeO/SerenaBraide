"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { CornerUpLeft, Plus } from "lucide-react";
import Paragraph from "@/components/ui/typography/paragraph";
import SubHeading from "@/components/ui/typography/subHeading";
import MobileProfileMenu from "./MobileProfileMenu";

interface MobileProfileOverviewProps {
  userName: string;
  memberSince: string;
  country?: string;
}

const MobileProfileOverview: React.FC<MobileProfileOverviewProps> = ({
  userName,
  memberSince,
  country,
}) => {
  return (
    <section className="flex flex-col md:hidden">
      {/* Back Link */}
      <Link
        href="/"
        className="flex items-center gap-2 text-sm text-[#6F6E6C] mb-6 hover:text-[#3B3B3B] transition-colors"
      >
        <CornerUpLeft className="size-4" />
        <span>Home page</span>
      </Link>

      {/* Welcome Header */}
      <div className="mb-6">
        <h1 className="text-lg font-PPEditorialNew font-normal text-[#3B3B3B] mb-2">
          Welcome back, {userName}.
        </h1>

        <Paragraph
          className="text-xs text-[#6F6E6C]"
          content="Your orders, saved scents, and more — all in one place."
        />
      </div>

      {/* Profile Summary Card */}
      <div className="bg-[#F6F7F8] rounded-xl p-4 mb-6">
        <div className="flex items-center justify-between">
          {/* Left: Avatar + Info */}
          <div className="flex items-center gap-3">
            {/* Avatar with plus icon */}
            <div className="relative w-12 h-12">
              <div className="rounded-full w-full h-full bg-[#E0E0E0] flex items-center justify-center text-[#6F6E6C] text-lg font-medium">
                {userName
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
                  .toUpperCase()
                  .slice(0, 2)}
              </div>
              {/* Plus icon */}
              <div className="absolute -bottom-0.5 -right-0.5 w-5 h-5 bg-[#2F88FF] rounded-full flex items-center justify-center border-2 border-white">
                <Plus className="text-white size-3" />
              </div>
            </div>

            {/* Name and member info */}
            <div>
              <SubHeading
                title={`Hello, ${userName}`}
                className="text-sm font-semibold text-[#3B3B3B]"
              />
              <Paragraph
                className="text-xs text-[#6F6E6C]"
                content={memberSince}
              />
            </div>
          </div>

          {/* Right: Country flag */}
          {country && (
            <Image
              alt="country flag"
              src="/country-flag.svg"
              width={24}
              height={24}
            />
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      <MobileProfileMenu />
    </section>
  );
};

export default MobileProfileOverview;
