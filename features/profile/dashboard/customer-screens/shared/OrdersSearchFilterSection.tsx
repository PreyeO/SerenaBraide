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
    <div className="flex justify-between items-center">
      <div className="relative flex-1 max-w-md">
        <Input
          type="text"
          placeholder="Order Id Product, Store"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pr-10 rounded-full"
        />
        <span className="bg-[#3B3B3B] rounded-full p-1.5 absolute right-3 top-1/2 transform -translate-y-1/2">
          <Search className="text-white size-4" />
        </span>
      </div>
      <Select value={filterValue} onValueChange={onFilterChange}>
        <SelectTrigger className="w-39.75 rounded-full">
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


