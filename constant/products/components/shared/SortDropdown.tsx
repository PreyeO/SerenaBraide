"use client";

import { useState, useEffect } from "react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";

interface SortDropdownProps {
  onSortChange?: (sort: string) => void;
  selected: string;
}

export default function SortDropdown({
  onSortChange,
  selected,
}: SortDropdownProps) {
  const [current, setCurrent] = useState(selected);

  useEffect(() => {
    setCurrent(selected);
  }, [selected]);

  const options = [
    { value: "all", label: "All" },
    { value: "best-sellers", label: "Best Sellers" },
    { value: "newest", label: "Newest" },
  ];

  const handleSelect = (value: string) => {
    setCurrent(value);
    onSortChange?.(value);
  };

  return (
    <div className="flex items-center text-[#3B3B3B]">
      <span className="font-font text-sm mr-2">SORTED BY:</span>
      <DropdownMenu>
        <DropdownMenuTrigger className=" flex items-center justify-center text-sm font-normal">
          {/* Show current selection, default to "All" */}
          {options.find((o) => o.value === current)?.label || "All"}
          <ChevronDown className="w-4 h-4 text-[#3B3B3B]  ml-1" />
        </DropdownMenuTrigger>

        <DropdownMenuContent className="">
          {options.map((option) => (
            <DropdownMenuItem
              key={option.value}
              onSelect={() => handleSelect(option.value)}
            >
              {option.label}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
