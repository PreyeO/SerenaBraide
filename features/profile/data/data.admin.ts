import { MetricConfig, LocationData } from "@/types/admin";

export const locationData: LocationData[] = [
  { name: "Nigeria", value: 30, color: "#22C55E" },
  { name: "United Kingdom", value: 25, color: "#EF4444" },
  { name: "South Africa", value: 18, color: "#F59E0B" },
  { name: "Ghana", value: 15, color: "#6366F1" },
  { name: "United States", value: 12, color: "#8B5CF6" },
];

export const metricsConfig: Record<string, MetricConfig> = {
  revenue: {
    label: "Total Revenue",
    value: "NGN 89,935",
    change: "+7.85%",
    changeType: "increase",
    chartTitle: "Total Revenue",
  },
  fulfilled: {
    label: "Orders Fulfilled",
    value: "1,234",
    change: "+12.3%",
    changeType: "increase",
    chartTitle: "Orders/Fulfilled",
  },
  cancelled: {
    label: "Cancelled Orders",
    value: "45",
    change: "-5.2%",
    changeType: "decrease",
    chartTitle: "Cancelled Orders",
  },
  returning: {
    label: "Returning Customers",
    value: "567",
    change: "+18.7%",
    changeType: "increase",
    chartTitle: "Returning Customers",
  },
};

export const chartConfig = {
  value: {
    label: "Value",
    color: "#3B82F6",
  },
};



