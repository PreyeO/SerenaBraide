"use client";

import React, { useState, useMemo } from "react";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
} from "@/components/ui/table";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Pie,
  PieChart,
  XAxis,
  YAxis,
  Cell,
} from "recharts";
import { ArrowUp, ArrowDown, Download } from "lucide-react";
import { MetricType } from "@/types/admin";
import {
  metricsConfig,
  locationData,
  chartConfig,
} from "@/features/profile/data/data.admin";

import { generateTimeSeriesData } from "@/features/profile/utils/chart-data";
import DateRangePicker from "@/features/profile/components/admin/DateRangePicker";
import { useDateRange } from "../../hooks/admin/useDateRange";

const Overview = () => {
  const { dateRange, period, displayLabel, setDateRange, setPeriod } =
    useDateRange();
  const [selectedMetric, setSelectedMetric] = useState<MetricType>("revenue");

  const chartData = useMemo(() => {
    if (!dateRange.from || !dateRange.to) return [];
    return generateTimeSeriesData(dateRange, selectedMetric);
  }, [dateRange, selectedMetric]);

  const currentMetric = metricsConfig[selectedMetric];

  return (
    <section className="px-6 py-6 space-y-6">
      {/* Overview Section */}
      <div className="space-y-6">
        {/* Header with Title and Date Range Picker */}
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold text-[#3B3B3B]">Overview</h2>
          <DateRangePicker
            dateRange={dateRange}
            onDateRangeChange={setDateRange}
            displayLabel={displayLabel}
            period={period}
            onPeriodChange={setPeriod}
          />
        </div>

        {/* Metric Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {Object.entries(metricsConfig).map(([key, metric]) => {
            const isSelected = selectedMetric === key;
            return (
              <Card
                key={key}
                className={`cursor-pointer transition-all flex flex-col gap-1  ${
                  isSelected
                    ? "ring-2 ring-[#F0F0F0] bg-[#F5F5F5] shadow-md"
                    : ""
                }`}
                onClick={() => setSelectedMetric(key as MetricType)}
              >
                <CardHeader className="">
                  <CardTitle className="text-sm font-normal text-[#6F6E6C]">
                    {metric.label}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="">
                    <div className="text-[22px] font-medium text-[#3B3B3B]">
                      {metric.value}
                    </div>
                    <div
                      className={`flex items-center gap-1 text-sm ${
                        metric.changeType === "increase"
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {metric.changeType === "increase" ? (
                        <ArrowUp className="h-4 w-4" />
                      ) : (
                        <ArrowDown className="h-4 w-4" />
                      )}
                      <span>{metric.change} Today</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Chart */}
          <Card className="lg:col-span-2 bg-white border border-[#F5F5F5]">
            <CardHeader className="flex flex-row items-center justify-between pb-4">
              <CardTitle className="text-lg font-semibold text-[#3B3B3B]">
                {currentMetric.chartTitle}
              </CardTitle>
              <Button
                variant="outline"
                size="sm"
                className="text-xs border-[#D1D5DB]"
              >
                <Download className="h-4 w-4 mr-1" />
                Download Report
              </Button>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig} className="h-auto  w-full">
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#F0F0F0" />
                  <XAxis
                    dataKey="date"
                    tick={{ fill: "#9A9A98", fontSize: 12 }}
                    axisLine={{ stroke: "#F0F0F0" }}
                  />
                  <YAxis
                    domain={[0, selectedMetric === "revenue" ? 100000 : 100]}
                    tick={{ fill: "#9A9A98", fontSize: 12 }}
                    axisLine={{ stroke: "#F0F0F0" }}
                    tickFormatter={(value) =>
                      selectedMetric === "revenue"
                        ? `NGN ${(value / 1000).toFixed(0)}k`
                        : value.toString()
                    }
                  />
                  <ChartTooltip
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        const value = payload[0].value as number;
                        return (
                          <div className="bg-white border border-[#E5E5E5] rounded-lg p-3 shadow-lg">
                            <p className="text-sm font-medium text-[#3B3B3B]">
                              {selectedMetric === "revenue"
                                ? `NGN ${value.toLocaleString()}`
                                : value}
                            </p>
                            <p className="text-xs text-[#9A9A98]">
                              {payload[0].payload.date}
                            </p>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="value"
                    stroke="#3B82F6"
                    strokeWidth={2}
                    fill="url(#colorValue)"
                  />
                </AreaChart>
              </ChartContainer>
            </CardContent>
          </Card>

          {/* Top Customers by Location */}
          <Card className="bg-white border border-[#F5F5F5]">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg font-semibold text-[#3B3B3B]">
                Top customers by location
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig} className="h-auto w-full">
                <PieChart>
                  <Pie
                    data={locationData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, value }) => `${value}% ${name}`}
                  >
                    {locationData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <ChartTooltip content={<ChartTooltipContent />} />
                </PieChart>
              </ChartContainer>
              <div className="mt-6 space-y-3">
                {locationData.map((location, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between text-sm"
                  >
                    <div className="flex items-center gap-2.5">
                      <div
                        className="w-3 h-3 rounded-full shrink-0"
                        style={{ backgroundColor: location.color }}
                      />
                      <span className="text-[#6F6E6C]">{location.name}</span>
                    </div>
                    <span className="font-medium text-[#3B3B3B]">
                      {location.value}%
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Products Section */}
      <Card className="bg-white border border-[#F5F5F5]">
        <CardHeader className="flex flex-row items-center justify-between pb-4">
          <CardTitle className="text-lg font-semibold text-[#3B3B3B]">
            Products
          </CardTitle>
          <Button
            variant="outline"
            size="sm"
            className="text-xs border-[#D1D5DB] text-[#6F6E6C] hover:bg-[#F5F5F5]"
          >
            Filter by
          </Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="bg-[#F9F9F9] hover:bg-[#F9F9F9]">
                <TableHead className="text-sm font-medium text-[#3B3B3B]">
                  Product Name
                </TableHead>
                <TableHead className="text-sm font-medium text-[#3B3B3B]">
                  Status
                </TableHead>
                <TableHead className="text-sm font-medium text-[#3B3B3B]">
                  Inventory
                </TableHead>
                <TableHead className="text-sm font-medium text-[#3B3B3B]">
                  Category
                </TableHead>
                <TableHead className="text-sm font-medium text-[#3B3B3B]">
                  Price
                </TableHead>
                <TableHead className="text-sm font-medium text-[#3B3B3B]">
                  Variants
                </TableHead>
                <TableHead className="text-sm font-medium text-[#3B3B3B]">
                  Action
                </TableHead>
              </TableRow>
            </TableHeader>
          </Table>
          <div className="text-center py-12 space-y-4">
            <p className="text-[#6F6E6C]">No product yet</p>
            <p className="text-sm text-[#9A9A98]">
              Upload your first product to get started!
            </p>
            <Button className="bg-[#3B3B3B] text-white hover:bg-[#2B2B2B] px-6 py-2.5 rounded-lg">
              + Add new product
            </Button>
          </div>
        </CardContent>
      </Card>
    </section>
  );
};

export default Overview;
