"use client";

import React, { useState, useMemo } from "react";
import OrdersList from "./shared/OrdersList";
import { useOrders } from "../../hooks/customer/useOrders";
import { transformOrdersToOrderInfo } from "../../utils/order.utils";

const ReviewProduct = () => {
  const [activeTab, setActiveTab] = useState("ready-for-review");
  const [searchQuery, setSearchQuery] = useState("");
  const [filterValue, setFilterValue] = useState("all");

  const { data: ordersData, isLoading } = useOrders();

  // Transform API response to OrderInfo format
  const allOrders = useMemo(() => {
    if (!ordersData?.results) return [];
    return transformOrdersToOrderInfo(ordersData.results);
  }, [ordersData]);

  // Filter to show only delivered orders
  const deliveredOrders = useMemo(() => {
    return allOrders.filter((order) => order.statusType === "DELIVERED");
  }, [allOrders]);

  // Create tabs with count
  const reviewTabs = useMemo(() => {
    return [
      {
        value: "ready-for-review",
        label: `Orders ready for review (${deliveredOrders.length})`,
      },
    ];
  }, [deliveredOrders.length]);

  return (
    <OrdersList
      orders={deliveredOrders}
      activeTab={activeTab}
      searchQuery={searchQuery}
      filterValue={filterValue}
      onTabChange={setActiveTab}
      onSearchChange={setSearchQuery}
      onFilterChange={setFilterValue}
      showTabs={true}
      tabs={reviewTabs}
      orderDetail="View Details"
      isLoading={isLoading}
    />
  );
};

export default ReviewProduct;
