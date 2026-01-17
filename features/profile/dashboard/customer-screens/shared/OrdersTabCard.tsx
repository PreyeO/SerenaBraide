"use client";

import React from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import OrdersSearchFilterSection from "./OrdersSearchFilterSection";

interface OrdersTabCardProps {
  activeTab: string;
  onTabChange: (value: string) => void;
  searchQuery: string;
  onSearchChange: (value: string) => void;
  filterValue: string;
  onFilterChange: (value: string) => void;
  tabs?: Array<{ value: string; label: string }>;
}

const OrdersTabCard: React.FC<OrdersTabCardProps> = ({
  activeTab,
  onTabChange,
  searchQuery,
  onSearchChange,
  filterValue,
  onFilterChange,
  tabs,
}) => {
  const defaultTabs = [
    { value: "all", label: "All Orders" },
    { value: "processing", label: "Processing" },
    { value: "in-transit", label: "In Transit" },
    { value: "delivered", label: "Delivered" },
  ];

  const displayTabs = tabs || defaultTabs;

  return (
    <div className=" bg-[#F6F7F8] border border-[#F5F5F5] px-8.5 py-6 rounded-[10px]">
      <Tabs value={activeTab} onValueChange={onTabChange} className="w-full">
        <TabsList className="w-97.75 justify-start bg-transparent h-auto p-0 gap-2 relative">
          {displayTabs.map((tab) => (
            <TabsTrigger
              key={tab.value}
              value={tab.value}
              className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-[#3B3B3B] bg-transparent text-[#6F6E6C] border-0 border-b-2 border-transparent px-4 py-2 rounded-none relative z-10"
            >
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>

        <div className="border-t border-[#D1D5DB] w-full mb-4 -mt-2.5" />

        <OrdersSearchFilterSection
          searchQuery={searchQuery}
          onSearchChange={onSearchChange}
          filterValue={filterValue}
          onFilterChange={onFilterChange}
        />
      </Tabs>
    </div>
  );
};

export default OrdersTabCard;
