"use client";

import React, { useMemo } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import DateRangePicker from "@/features/profile/components/admin/DateRangePicker";
import { useDateRange } from "../../hooks/admin/useDateRange";
import SubHeading from "@/components/ui/typography/subHeading";
import TableEmpty from "./components/shared/empty-screens/TableEmpty";
import { useGetRevenueGraph } from "../../hooks/admin/useGetRevenueGraph";
import { useGetDashboardCards } from "../../hooks/admin/useGetDashboardCards";
import { useGetCustomersByLocation } from "../../hooks/admin/useGetCustomersByLocation";
import { useGetProducts } from "../../hooks/admin/useGetProducts";
import LoadingState from "@/components/ui/loaders/loading-state";
import ProductTable from "./components/tables/ProductTable";
import MetricCard from "./components/shared/MetricCard";
import dynamic from "next/dynamic";

const LocationChart = dynamic(
  () => import("./components/shared/LocationChart"),
  {
    loading: () => <CardSkeleton />,
  },
);
const RevenueChart = dynamic(() => import("./components/shared/RevenueChart"), {
  loading: () => <CardSkeleton />,
});
import {
  transformRevenueData,
  transformLocationData,
  formatCurrency,
} from "../../utils/dashboard.utils";
import CardSkeleton from "@/components/ui/loaders/card-skeleton";

const Overview = () => {
  const router = useRouter();
  const {
    dateRange,
    displayLabel,
    setDateRange,
    period,
    setPeriod,
    startDate,
    endDate,
  } = useDateRange();

  // Get current year for revenue graph
  const currentYear = new Date().getFullYear();

  // Fetch dashboard data
  const { data: revenueData, isLoading: isRevenueLoading } =
    useGetRevenueGraph(currentYear);
  const { data: cardsData, isLoading: isCardsLoading } = useGetDashboardCards({
    startDate,
    endDate,
  });
  const { data: locationData, isLoading: isLocationLoading } =
    useGetCustomersByLocation();
  const { data: products, isLoading: isProductsLoading } = useGetProducts();

  // Transform data for charts
  const chartData = useMemo(
    () => transformRevenueData(revenueData?.monthly_data),
    [revenueData],
  );

  const pieChartData = useMemo(
    () => transformLocationData(locationData),
    [locationData],
  );

  // Get the most recent 3 products
  const recentProducts = useMemo(() => {
    if (!products) return [];
    return products.slice(0, 3);
  }, [products]);

  const handleAddProduct = () => {
    router.push("/admin/products?tab=add-product");
  };

  const handleDateRangeChange = (range: typeof dateRange | undefined) => {
    if (range) {
      setDateRange(range);
    }
  };

  // Show full-page loading only on initial load (no data at all), not on date filter changes
  const isInitialLoading =
    (!revenueData && isRevenueLoading) ||
    (!cardsData && isCardsLoading) ||
    (!locationData && isLocationLoading);

  if (isInitialLoading) {
    return <LoadingState />;
  }

  return (
    <section className="px-6 py-6 space-y-6">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <SubHeading
            title="Overview"
            className="text-sm text-[#3B3B3B] font-semibold"
          />
          <DateRangePicker
            dateRange={dateRange}
            onDateRangeChange={handleDateRangeChange}
            displayLabel={displayLabel}
            period={period}
            onPeriodChange={setPeriod}
          />
        </div>

        {/* Metric Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <MetricCard
            label="Total Revenue"
            value={
              cardsData ? formatCurrency(cardsData.total_revenue) : "NGN 0.00"
            }
          />
          <MetricCard
            label="Orders Fulfilled"
            value={cardsData?.orders_fulfilled ?? 0}
          />
          <MetricCard
            label="Cancelled Orders"
            value={cardsData?.cancelled_orders ?? 0}
          />
          <MetricCard
            label="Returning Customers"
            value={cardsData?.returning_customers ?? 0}
          />
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <RevenueChart
            data={chartData}
            title={`Revenue Graph (${revenueData?.year ?? currentYear})`}
          />
          <LocationChart data={pieChartData} />
        </div>
      </div>

      {/* Products Section */}
      <Card className="bg-white border border-[#F5F5F5]">
        <CardHeader className="flex flex-row items-center justify-between pb-4">
          <CardTitle className="text-lg font-semibold text-[#3B3B3B]">
            Recent Products
          </CardTitle>
          <Button
            variant="outline"
            size="sm"
            className="text-xs border-[#D1D5DB] text-[#6F6E6C] hover:bg-[#F5F5F5]"
            onClick={() => router.push("/admin/products")}
          >
            View All
          </Button>
        </CardHeader>
        <CardContent>
          {isProductsLoading ? (
            <div className="flex items-center justify-center h-48">
              <p className="text-[#6F6E6C]">Loading products...</p>
            </div>
          ) : recentProducts.length > 0 ? (
            <ProductTable
              products={recentProducts}
              onAddProduct={handleAddProduct}
              hideEmptyState
            />
          ) : (
            <TableEmpty
              title="No product yet"
              description="Upload your first product to get started!"
              buttonLabel="Add new product"
              onAction={handleAddProduct}
            />
          )}
        </CardContent>
      </Card>
    </section>
  );
};

export default Overview;
