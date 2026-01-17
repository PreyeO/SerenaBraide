"use client";

import React, { useMemo, useEffect, useState } from "react";
import OrdersProductCard from "./OrdersProductCard";
import OrdersTabCard from "./OrdersTabCard";
import OrdersSearchFilter from "./OrdersSearchFilter";
import OrderSkeleton from "./OrderSkeleton";
import { OrderInfo } from "@/features/profile/type/customers/profile.type";

interface OrdersListProps {
  orders: OrderInfo[];
  activeTab: string;
  searchQuery: string;
  filterValue: string;
  onTabChange: (value: string) => void;
  onSearchChange: (value: string) => void;
  onFilterChange: (value: string) => void;
  showTabs?: boolean;
  showSearchFilter?: boolean;
  tabs?: Array<{ value: string; label: string }>;
  orderDetail?: string;
  isLoading?: boolean;
}

const OrdersList: React.FC<OrdersListProps> = ({
  orders,
  activeTab,
  searchQuery,
  filterValue,
  onTabChange,
  onSearchChange,
  onFilterChange,
  showTabs = true,
  showSearchFilter = true,
  tabs,
  orderDetail = "View Details",
  isLoading = false,
}) => {
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState("");
  const [isFiltering, setIsFiltering] = useState(false);

  // Debounce search query
  useEffect(() => {
    setIsFiltering(true);
    const timer = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
      setIsFiltering(false);
    }, 300);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Show loading when tab or filter changes
  useEffect(() => {
    setIsFiltering(true);
    const timer = setTimeout(() => {
      setIsFiltering(false);
    }, 200);
    return () => clearTimeout(timer);
  }, [activeTab, filterValue]);

  // Apply all filters
  const filteredOrders = useMemo(() => {
    // Filter orders based on tab selection
    let result = orders;
    if (activeTab !== "all") {
      if (activeTab === "processing") {
        result = result.filter((order) => order.statusType === "PROCESSING");
      } else if (activeTab === "in-transit") {
        result = result.filter((order) => order.statusType === "IN_TRANSIT");
      } else if (
        activeTab === "delivered" ||
        activeTab === "ready-for-review"
      ) {
        result = result.filter((order) => order.statusType === "DELIVERED");
      }
    }

    // Filter by search query
    if (debouncedSearchQuery.trim()) {
      const query = debouncedSearchQuery.toLowerCase();
      result = result.filter(
        (order) =>
          order.productName.toLowerCase().includes(query) ||
          order.orderNumber.toLowerCase().includes(query)
      );
    }

    // Filter by date range
    if (filterValue !== "all") {
      const now = new Date();
      const sixMonthsAgo = new Date();
      sixMonthsAgo.setMonth(now.getMonth() - 6);
      const oneYearAgo = new Date();
      oneYearAgo.setFullYear(now.getFullYear() - 1);
      const recentDate = new Date();
      recentDate.setDate(now.getDate() - 30); // Last 30 days

      result = result.filter((order) => {
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
    }

    return result;
  }, [orders, activeTab, debouncedSearchQuery, filterValue]);

  const displayLoading = isLoading || isFiltering;

  return (
    <section className="flex flex-col gap-4 sm:gap-6 px-4 sm:px-0">
      {showTabs ? (
        <OrdersTabCard
          activeTab={activeTab}
          onTabChange={onTabChange}
          searchQuery={searchQuery}
          onSearchChange={onSearchChange}
          filterValue={filterValue}
          onFilterChange={onFilterChange}
          tabs={tabs}
        />
      ) : showSearchFilter !== false ? (
        <OrdersSearchFilter
          searchQuery={searchQuery}
          onSearchChange={onSearchChange}
          filterValue={filterValue}
          onFilterChange={onFilterChange}
        />
      ) : null}

      <div className="flex flex-col gap-4 sm:gap-6">
        {displayLoading ? (
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
                <OrdersProductCard order={order} orderDetail={orderDetail} />
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

export default OrdersList;
