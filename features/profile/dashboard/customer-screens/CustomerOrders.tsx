"use client";

import React, { useMemo, useState } from "react";
import OrdersList from "./shared/OrdersList";
import { useOrders } from "../../hooks/customer/useOrders";
import { transformOrdersToOrderInfo } from "../../utils/order.utils";

const CustomerOrders = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [filterValue, setFilterValue] = useState("all");

  const { data: ordersData, isLoading } = useOrders();

  // Transform API response to OrderInfo format
  const orders = useMemo(() => {
    if (!ordersData?.results) return [];
    return transformOrdersToOrderInfo(ordersData.results);
  }, [ordersData]);

  return (
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
  );
};

export default CustomerOrders;
