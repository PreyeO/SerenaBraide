"use client";

import { Button } from "@/components/ui/button";
import { LucideIcon } from "lucide-react";

interface EmptyProps {
  icon?: LucideIcon;
  title: string;
  description: string;
  buttonLabel?: string;
  onAction?: () => void;
  showButton?: boolean;
}

const Empty = ({
  icon: Icon,
  title,
  description,
  buttonLabel = "Get started",
  onAction,
  showButton = true,
}: EmptyProps) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-100 px-4">
      {Icon && (
        <div className="w-16 h-16 bg-[#F5F5F5] rounded-full flex items-center justify-center mb-6">
          <Icon className="w-8 h-8 text-[#6F6E6C]" />
        </div>
      )}
      <h3 className="text-xl font-semibold text-[#3B3B3B] mb-2 text-center">
        {title}
      </h3>
      <p className="text-sm text-[#6F6E6C] mb-6 text-center max-w-md">
        {description}
      </p>
      {showButton && onAction && (
        <Button
          onClick={onAction}
          className="bg-[#3B3B3B] hover:bg-[#2B2B2B] text-white rounded-full px-6"
        >
          {buttonLabel}
        </Button>
      )}
    </div>
  );
};

export default Empty;












