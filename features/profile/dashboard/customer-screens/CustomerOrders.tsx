"use client";

import React, { useMemo, useState } from "react";
import OrdersList from "./shared/OrdersList";
import { useOrders } from "../../hooks/customer/useOrders";
import { transformOrdersToOrderInfo } from "../../utils/order.utils";
import BackNavigation from "@/components/ui/btns/back-navigation";

const CustomerOrders = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState("");

  // Debounce search query for API
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
    }, 500); // 500ms debounce
    return () => clearTimeout(timer);
  }, [searchQuery]);

  const { data: ordersData, isLoading } = useOrders({
    // Fetch all paid orders and filter locally to handle gift card status mapping correctly
    search: debouncedSearchQuery || undefined,
  });

  // Transform API response to OrderInfo format and filter by active tab
  const orders = useMemo(() => {
    if (!ordersData?.results) return [];

    // Filter out "pending" orders
    const paidOrders = ordersData.results.filter(
      (order) => order.status !== "pending"
    );

    const transformedOrders = transformOrdersToOrderInfo(paidOrders);

    if (activeTab === "all") return transformedOrders;

    return transformedOrders.filter((order) => {
      if (activeTab === "processing") {
        return order.statusType === "PROCESSING";
      }
      if (activeTab === "in-transit") {
        return order.statusType === "IN_TRANSIT";
      }
      if (activeTab === "delivered") {
        return order.statusType === "DELIVERED";
      }
      return true;
    });
  }, [ordersData, activeTab]);

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
        onTabChange={setActiveTab}
        onSearchChange={setSearchQuery}
        isLoading={isLoading}
      />
    </>
  );
};

export default CustomerOrders;

