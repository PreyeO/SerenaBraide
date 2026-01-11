export type TimePeriod = "1D" | "7D" | "1M" | "1Y" | "custom";

export type MetricType = "revenue" | "fulfilled" | "cancelled" | "returning";

export interface MetricConfig {
  label: string;
  value: string;
  change: string;
  changeType: "increase" | "decrease";
  chartTitle: string;
}

export interface LocationData {
  name: string;
  value: number;
  color: string;
}

export interface ChartDataPoint {
  date: string;
  value: number;
}

