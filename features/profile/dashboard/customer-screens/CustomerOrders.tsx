"use client";

import React, { useMemo, useState } from "react";
import OrdersList from "./shared/OrdersList";
import { useOrders } from "../../hooks/customer/useOrders";
import { transformOrdersToOrderInfo } from "../../utils/order.utils";
import EmptyOrders from "./empty-screens/EmptyOrders";

const CustomerOrders = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [filterValue, setFilterValue] = useState("all");

  const { data: ordersData, isLoading, error } = useOrders();

  // Transform API response to OrderInfo format
  const orders = useMemo(() => {
    if (!ordersData?.results) return [];
    return transformOrdersToOrderInfo(ordersData.results);
  }, [ordersData]);

  // Show empty state if no orders
  if (!isLoading && !error && orders.length === 0) {
    return <EmptyOrders />;
  }

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
