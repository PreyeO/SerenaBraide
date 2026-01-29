"use client";

import React from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search } from "lucide-react";

interface OrdersSearchFilterSectionProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  filterValue: string;
  onFilterChange: (value: string) => void;
}

const OrdersSearchFilterSection: React.FC<OrdersSearchFilterSectionProps> = ({
  searchQuery,
  onSearchChange,
  filterValue,
  onFilterChange,
}) => {
  return (
    <div className="flex justify-between items-center gap-3 px-4 lg:px-0">
      {/* Search input - full width on mobile */}
      <div className="relative flex-1 lg:max-w-md">
        <Input
          type="text"
          placeholder="Order ID, Product or Store"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pr-12 rounded-full text-sm"
        />
        <button className="bg-[#3B3B3B] rounded-full p-1.5 lg:p-1.5 absolute right-1.5 lg:right-3 top-1/2 transform -translate-y-1/2 hover:bg-[#2B2B2B] transition-colors">
          <Search className="text-white size-4" />
        </button>
      </div>

      {/* Date filter - hidden on mobile */}
      <Select value={filterValue} onValueChange={onFilterChange}>
        <SelectTrigger className="hidden lg:flex w-39.75 rounded-full">
          <SelectValue placeholder="Filter by date" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All</SelectItem>
          <SelectItem value="recent">Recent</SelectItem>
          <SelectItem value="last-6-months">Last 6 months</SelectItem>
          <SelectItem value="last-year">Last year</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default OrdersSearchFilterSection;
