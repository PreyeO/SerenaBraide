"use client";

import React from "react";
import OrdersSearchFilterSection from "./OrdersSearchFilterSection";

interface OrdersSearchFilterProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
}

const OrdersSearchFilter: React.FC<OrdersSearchFilterProps> = ({
  searchQuery,
  onSearchChange,
}) => {
  return (
    <div className="bg-[#F6F7F8] border border-[#F5F5F5] lg:px-8.5 px-6 py-6 rounded-[10px]">
      <OrdersSearchFilterSection
        searchQuery={searchQuery}
        onSearchChange={onSearchChange}
      />
    </div>
  );
};

export default OrdersSearchFilter;

