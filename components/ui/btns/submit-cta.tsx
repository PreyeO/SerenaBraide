"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface AuthSubmitButtonProps {
  label: string;
  loadingLabel?: string;
  isPending: boolean;
  onClick?: () => void;
  className?: string;
  icon?: LucideIcon;
  iconPosition?: "left" | "right";
}

const SubmitButton = ({
  label,
  loadingLabel = "Processing...",
  isPending,
  onClick,
  className,
  icon: Icon,
  iconPosition = "left",
}: AuthSubmitButtonProps) => {
  return (
    <Button
      type="submit"
      onClick={onClick}
      disabled={isPending}
      className={cn(
        "relative w-full flex items-center justify-center gap-2 bg-[#3B3B3B] text-white hover:bg-[#2f2f2f] py-6 text-base font-semibold rounded-[50px] transition-all duration-200 ease-in-out",
        isPending && "opacity-80 cursor-not-allowed",
        className
      )}
    >
      <AnimatePresence mode="wait" initial={false}>
        {isPending ? (
          <motion.span
            key="loading"
            className="flex items-center gap-2"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.2 }}
          >
            <Loader2 className="h-5 w-5 animate-spin" />
            {loadingLabel}
          </motion.span>
        ) : (
          <motion.span
            key="label"
            className="flex items-center gap-2"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.2 }}
          >
            {iconPosition === "left" && Icon && <Icon size={18} />}
            {label}
            {iconPosition === "right" && Icon && <Icon size={18} />}
          </motion.span>
        )}
      </AnimatePresence>
    </Button>
  );
};

export default SubmitButton;
