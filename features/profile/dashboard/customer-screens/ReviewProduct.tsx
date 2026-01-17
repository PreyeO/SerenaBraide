"use client";

import React, { useState, useMemo } from "react";
import OrdersList from "./shared/OrdersList";
import { orderInfo } from "../../data/data.profile";

const ReviewProduct = () => {
  const [activeTab, setActiveTab] = useState("ready-for-review");
  const [searchQuery, setSearchQuery] = useState("");
  const [filterValue, setFilterValue] = useState("all");

  // Filter to show only delivered orders
  const deliveredOrders = useMemo(() => {
    return orderInfo.filter((order) => order.statusType === "DELIVERED");
  }, []);

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
    />
  );
};

export default ReviewProduct;
