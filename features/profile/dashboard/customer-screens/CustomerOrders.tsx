"use client";

import React, { useState, useMemo, useEffect } from "react";
import OrdersProductCard from "./shared/OrdersProductCard";
import OrdersTabCard from "./shared/OrdersTabCard";
import { orderInfo } from "../../data/data.profile";
import { Skeleton } from "@/components/ui/skeleton";

const CustomerOrders = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [filterValue, setFilterValue] = useState("all");
  const [isLoading, setIsLoading] = useState(false);
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState("");

  // Debounce search query for smooth UX
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
      setIsLoading(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Show loading when tab or filter changes
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 200);

    return () => clearTimeout(timer);
  }, [activeTab, filterValue]);

  // Filter orders based on tab selection
  const filterByTab = (orders: typeof orderInfo) => {
    if (activeTab === "all") return orders;
    if (activeTab === "processing")
      return orders.filter((order) => order.title === "Processing");
    if (activeTab === "in-transit")
      return orders.filter((order) => order.title === "In Transit");
    if (activeTab === "delivered")
      return orders.filter((order) =>
        order.title.toLowerCase().includes("delivered")
      );
    return orders;
  };

  // Filter by search query
  const filterBySearch = (orders: typeof orderInfo) => {
    if (!debouncedSearchQuery.trim()) return orders;
    const query = debouncedSearchQuery.toLowerCase();
    return orders.filter(
      (order) =>
        order.productName.toLowerCase().includes(query) ||
        order.orderNumber.toLowerCase().includes(query)
    );
  };

  // Filter by date range
  const filterByDate = (orders: typeof orderInfo) => {
    if (filterValue === "all") return orders;

    const now = new Date();
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(now.getMonth() - 6);
    const oneYearAgo = new Date();
    oneYearAgo.setFullYear(now.getFullYear() - 1);
    const recentDate = new Date();
    recentDate.setDate(now.getDate() - 30); // Last 30 days

    return orders.filter((order) => {
      // Extract date from order.date (format: "Order date: Mar 27, 2025" or "Mar 27, 2025")
      const dateStr = order.date.replace("Order date: ", "").trim();
      const orderDate = new Date(dateStr);

      if (filterValue === "recent") {
        return orderDate >= recentDate;
      }
      if (filterValue === "last-6-months") {
        return orderDate >= sixMonthsAgo;
      }
      if (filterValue === "last-year") {
        return orderDate >= oneYearAgo;
      }
      return true;
    });
  };

  // Apply all filters
  const filteredOrders = useMemo(() => {
    let result = filterByTab(orderInfo);
    result = filterBySearch(result);
    result = filterByDate(result);
    return result;
  }, [activeTab, debouncedSearchQuery, filterValue]);

  // Loading skeleton component
  const OrderSkeleton = () => (
    <div className="w-full bg-[#F6F7F8] border border-[#F5F5F5] px-4 sm:px-8.5 py-6 rounded-[10px] animate-pulse">
      <div className="flex justify-between items-center mb-4">
        <Skeleton className="h-6 w-24" />
        <Skeleton className="h-6 w-32" />
      </div>
      <div className="border border-[#D1D5DB] w-full mb-4" />
      <div className="flex flex-col sm:flex-row gap-4 sm:justify-between">
        <div className="flex gap-2.5 items-center">
          <Skeleton className="w-[102px] h-[102px] rounded-[5px]" />
          <div className="flex flex-col gap-2">
            <Skeleton className="h-5 w-48" />
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-4 w-40" />
          </div>
        </div>
        <div className="flex flex-col gap-2 sm:items-end">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-10 w-40" />
          <Skeleton className="h-10 w-40" />
        </div>
      </div>
    </div>
  );

  return (
    <section className="flex flex-col gap-4 sm:gap-6 px-4 sm:px-0">
      <OrdersTabCard
        activeTab={activeTab}
        onTabChange={setActiveTab}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        filterValue={filterValue}
        onFilterChange={setFilterValue}
      />

      <div className="flex flex-col gap-4 sm:gap-6">
        {isLoading ? (
          <>
            <OrderSkeleton />
            <OrderSkeleton />
          </>
        ) : filteredOrders.length > 0 ? (
          <div className="space-y-4 sm:space-y-6">
            {filteredOrders.map((order, index) => (
              <div
                key={`${order.orderNumber}-${index}`}
                className="opacity-0 animate-[fadeIn_0.3s_ease-in-out_forwards]"
                style={{ animationDelay: `${Math.min(index * 50, 300)}ms` }}
              >
                <OrdersProductCard order={order} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 text-[#6F6E6C]">
            <p className="text-sm sm:text-base">
              No orders found matching your criteria.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default CustomerOrders;
