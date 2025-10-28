"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

interface AuthSubmitButtonProps {
  label: string;
  loadingLabel: string;
  isPending: boolean;
  className?: string;
}

const SubmitButton = ({
  label,
  loadingLabel,
  isPending,
  className,
}: AuthSubmitButtonProps) => {
  return (
    <Button
      type="submit"
      disabled={isPending}
      className={` ${className} w-full bg-[#3B3B3B] text-white rounded-[50px] py-6 text-base font-semibold `}
    >
      {isPending ? loadingLabel : label}
    </Button>
  );
};

export default SubmitButton;
