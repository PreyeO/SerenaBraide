"use client";

import React, { useMemo, useState } from "react";
import OrdersList from "./shared/OrdersList";
import { useOrders } from "../../hooks/customer/useOrders";
import { transformOrdersToOrderInfo } from "../../utils/order.utils";
import BackNavigation from "@/components/ui/btns/back-navigation";

const CustomerOrders = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [filterValue, setFilterValue] = useState("all");

  // Map UI tab to backend status filter
  const statusFilter =
    activeTab === "processing"
      ? "paid"
      : activeTab === "in-transit"
        ? "shipped"
        : activeTab === "delivered"
          ? "delivered"
          : undefined;

  const { data: ordersData, isLoading } = useOrders({
    status: statusFilter,
    // Let the API handle searching against product name
    search: searchQuery || undefined,
  });

  // Transform API response to OrderInfo format
  const orders = useMemo(() => {
    if (!ordersData?.results) return [];
    return transformOrdersToOrderInfo(ordersData.results);
  }, [ordersData]);

  return (
    <>
      <BackNavigation
        href="/profile"
        text="Back"
        className="lg:hidden mb-4 hover:text-[#3B3B3B] transition-colors"
      />
      <OrdersList
        orders={orders}
        activeTab={activeTab}
        searchQuery={searchQuery}
        filterValue={filterValue}
        onTabChange={setActiveTab}
        onSearchChange={setSearchQuery}
        onFilterChange={setFilterValue}
        isLoading={isLoading}
      />
    </>
  );
};

export default CustomerOrders;
