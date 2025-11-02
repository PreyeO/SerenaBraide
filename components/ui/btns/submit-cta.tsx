"use client";

import { Button } from "@/components/ui/button";
import { LucideIcon } from "lucide-react"; // allows passing any lucide icon type

interface AuthSubmitButtonProps {
  label: string;
  loadingLabel: string;
  isPending?: boolean;
  className?: string;
  icon?: LucideIcon; // optional icon component
  iconPosition?: "left" | "right"; // optional position control
}

const SubmitButton = ({
  label,
  loadingLabel,
  isPending,
  className,
  icon: Icon,
  iconPosition = "left",
}: AuthSubmitButtonProps) => {
  return (
    <Button
      type="submit"
      disabled={isPending}
      className={`flex items-center justify-center gap-2 w-full bg-[#3B3B3B] text-white rounded-[50px] py-6 text-base font-semibold ${className}`}
    >
      {iconPosition === "left" && Icon && <Icon size={18} />}
      {isPending ? loadingLabel : label}
      {iconPosition === "right" && Icon && <Icon size={18} />}
    </Button>
  );
};

export default SubmitButton;
