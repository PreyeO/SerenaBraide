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
    search: debouncedSearchQuery || undefined,
  });

  // Transform API response to OrderInfo format
  // Filter out "pending" orders — those are unpaid/incomplete checkout attempts
  const orders = useMemo(() => {
    if (!ordersData?.results) return [];
    const paidOrders = ordersData.results.filter(
      (order) => order.status !== "pending"
    );
    return transformOrdersToOrderInfo(paidOrders);
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
        onTabChange={setActiveTab}
        onSearchChange={setSearchQuery}
        isLoading={isLoading}
      />
    </>
  );
};

export default CustomerOrders;

