"use client";

import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

interface TableEmptyProps {
  title: string;
  description: string;
  buttonLabel?: string;
  onAction?: () => void;
  showButton?: boolean;
}

const TableEmpty = ({
  title,
  description,
  buttonLabel = "Add new item",
  onAction,
  showButton = true,
}: TableEmptyProps) => {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <h3 className="text-lg font-semibold text-[#3B3B3B] mb-2">{title}</h3>
      <p className="text-sm text-[#6F6E6C] mb-6 text-center">{description}</p>
      {showButton && onAction && (
        <Button
          onClick={onAction}
          className="bg-[#3B3B3B] hover:bg-[#2B2B2B] text-white rounded-full px-6"
        >
          <Plus className="w-4 h-4 mr-2" />
          {buttonLabel}
        </Button>
      )}
    </div>
  );
};

export default TableEmpty;




