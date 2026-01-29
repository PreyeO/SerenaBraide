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
    { value: "in-transit", label: "Shipped" },
    { value: "delivered", label: "Delivered" },
  ];

  const displayTabs = tabs || defaultTabs;

  return (
    <div className="bg-transparent lg:bg-[#F6F7F8] border-0 lg:border border-[#F5F5F5] px-0 lg:px-8.5 py-0 lg:py-6 rounded-none lg:rounded-[10px]">
      <Tabs value={activeTab} onValueChange={onTabChange} className="w-full">
        {/* Mobile: Scrollable tabs */}
        <div className="w-full overflow-x-auto pb-0.5" style={{ WebkitOverflowScrolling: 'touch' }}>
          <TabsList className="inline-flex w-max min-w-full lg:w-97.75 justify-start bg-transparent h-auto p-0 gap-0 lg:gap-2">
            {displayTabs.map((tab, index) => (
              <TabsTrigger
                key={tab.value}
                value={tab.value}
                className={`shrink-0 whitespace-nowrap data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-[#3B3B3B] data-[state=active]:text-[#3B3B3B] bg-transparent text-[#6F6E6C] text-sm lg:text-base border-0 border-b-2 border-transparent px-3 lg:px-4 py-2.5 rounded-none ${index === 0 ? 'pl-0' : ''}`}
              >
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>

        <div className="border-t border-[#E5E5E5] lg:border-[#D1D5DB] w-full mb-4 -mt-0.5 lg:-mt-2.5" />

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

