"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

interface AuthSubmitButtonProps {
  label: string;
  loadingLabel: string;
  isPending: boolean;
}

const SubmitButton = ({
  label,
  loadingLabel,
  isPending,
}: AuthSubmitButtonProps) => {
  return (
    <Button
      type="submit"
      disabled={isPending}
      className="w-full bg-[#E61A1A] text-white hover:bg-red-700 py-6 text-base font-semibold rounded-[14px]"
    >
      {isPending ? loadingLabel : label} <ArrowRight className="size-6" />
    </Button>
  );
};

export default SubmitButton;
