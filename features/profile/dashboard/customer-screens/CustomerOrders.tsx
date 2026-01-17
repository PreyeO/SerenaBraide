"use client";

import React, { useState } from "react";
import OrdersList from "./shared/OrdersList";
import { orderInfo } from "../../data/data.profile";

const CustomerOrders = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [filterValue, setFilterValue] = useState("all");

  return (
    <OrdersList
      orders={orderInfo}
      activeTab={activeTab}
      searchQuery={searchQuery}
      filterValue={filterValue}
      onTabChange={setActiveTab}
      onSearchChange={setSearchQuery}
      onFilterChange={setFilterValue}
    />
  );
};

export default CustomerOrders;
