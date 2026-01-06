"use client";

import React from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search } from "lucide-react";

interface OrdersTabCardProps {
  activeTab: string;
  onTabChange: (value: string) => void;
  searchQuery: string;
  onSearchChange: (value: string) => void;
  filterValue: string;
  onFilterChange: (value: string) => void;
}

const OrdersTabCard: React.FC<OrdersTabCardProps> = ({
  activeTab,
  onTabChange,
  searchQuery,
  onSearchChange,
  filterValue,
  onFilterChange,
}) => {
  return (
    <div className=" bg-[#F6F7F8] border border-[#F5F5F5] px-8.5 py-6 rounded-[10px]">
      <Tabs value={activeTab} onValueChange={onTabChange} className="w-full">
        <TabsList className="w-97.75 justify-start bg-transparent h-auto p-0 gap-2 relative">
          <TabsTrigger
            value="all"
            className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-[#3B3B3B] bg-transparent text-[#6F6E6C] border-0 border-b-2 border-transparent px-4 py-2 rounded-none relative z-10"
          >
            All Orders
          </TabsTrigger>
          <TabsTrigger
            value="processing"
            className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-[#3B3B3B] bg-transparent text-[#6F6E6C] border-0 border-b-2 border-transparent px-4 py-2 rounded-none relative z-10"
          >
            Processing
          </TabsTrigger>
          <TabsTrigger
            value="in-transit"
            className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-[#3B3B3B] bg-transparent text-[#6F6E6C] border-0 border-b-2 border-transparent px-4 py-2 rounded-none relative z-10"
          >
            In Transit
          </TabsTrigger>
          <TabsTrigger
            value="delivered"
            className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-[#3B3B3B] bg-transparent text-[#6F6E6C] border-0 border-b-2 border-transparent px-4 py-2 rounded-none relative z-10"
          >
            Delivered
          </TabsTrigger>
        </TabsList>

        <div className="border-t border-[#D1D5DB] w-full mb-4 -mt-2.5" />

        <div className="flex justify-between items-center">
          <div className="relative flex-1 max-w-md  ">
            <Input
              type="text"
              placeholder="Order Id Product, Store"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pr-10 rounded-full  "
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
      </Tabs>
    </div>
  );
};

export default OrdersTabCard;
