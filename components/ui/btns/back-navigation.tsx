"use client";

import { CornerUpLeft } from "lucide-react";
import UnderlineLink from "@/components/ui/btns/underline-cta";

interface BackNavigationProps {
  href: string;
  text?: string;
  iconColor?: string;
  className?: string;
}

const BackNavigation = ({
  href,
  text = "Go Back",
  iconColor = "#6F6E6C",
  className,
}: BackNavigationProps) => {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <CornerUpLeft className="size-4.5" color={iconColor} />
      <UnderlineLink
        href={href}
        text={text}
        className="text-xs font-normal text-[#6F6E6C]"
      />
    </div>
  );
};

export default BackNavigation;
