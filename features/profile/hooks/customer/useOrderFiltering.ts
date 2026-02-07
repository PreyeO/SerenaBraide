"use client";

import { useMemo } from "react";
import { OrderInfo } from "@/features/profile/type/customers/profile.type";

export const useOrderFiltering = ({
    orders,
    filterValue,
}: {
    orders: OrderInfo[];
    filterValue: string;
}) => {
    // Apply date filter
    const filteredOrders = useMemo(() => {
        let result = orders;

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
    }, [orders, filterValue]);

    return { filteredOrders, isFiltering: false };
};
