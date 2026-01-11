import { ChartDataPoint, MetricType } from "@/types/admin";
import { DateRange } from "react-day-picker";

export const generateTimeSeriesData = (
  dateRange: DateRange,
  metric: MetricType
): ChartDataPoint[] => {
  const { from, to } = dateRange;
  if (!from || !to) return [];

  const data: ChartDataPoint[] = [];
  const diffTime = to.getTime() - from.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  // Determine number of data points based on range
  let points: number;
  if (diffDays <= 1) {
    points = 24; // Hourly for 1 day
  } else if (diffDays <= 7) {
    points = diffDays; // Daily for a week
  } else if (diffDays <= 30) {
    points = diffDays; // Daily for a month
  } else if (diffDays <= 365) {
    points = Math.ceil(diffDays / 7); // Weekly for a year
  } else {
    points = Math.ceil(diffDays / 30); // Monthly for multiple years
  }

  const interval = diffTime / points;

  for (let i = 0; i < points; i++) {
    const date = new Date(from.getTime() + i * interval);
    
    let dateLabel: string;
    if (diffDays <= 1) {
      dateLabel = date.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
      });
    } else if (diffDays <= 90) {
      dateLabel = date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      });
    } else {
      dateLabel = date.toLocaleDateString("en-US", { month: "short" });
    }

    // Generate value based on metric type with consistent pattern
    const seed = i * 7 + (metric === "revenue" ? 100 : metric === "fulfilled" ? 200 : metric === "cancelled" ? 300 : 400);
    const value =
      metric === "revenue"
        ? Math.floor((Math.sin(seed / 10) * 30000 + 60000) * (1 + i / 100))
        : metric === "fulfilled"
        ? Math.floor((Math.sin(seed / 10) * 50 + 120) * (1 + i / 100))
        : metric === "cancelled"
        ? Math.floor((Math.sin(seed / 10) * 15 + 25) * (1 + i / 100))
        : Math.floor((Math.sin(seed / 10) * 40 + 80) * (1 + i / 100));

    data.push({ date: dateLabel, value });
  }

  return data;
};

