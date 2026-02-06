import {
    RevenueMonthData,
    CustomerLocationData,
} from "@/features/profile/type/admin/general.type";

// Color palette for pie charts
export const CHART_COLORS = [
    "#22C55E",
    "#EF4444",
    "#F59E0B",
    "#6366F1",
    "#8B5CF6",
    "#EC4899",
    "#14B8A6",
    "#0EA5E9",
    "#84CC16",
    "#F97316",
];

export interface ChartDataPoint {
    date: string;
    value: number;
}

export interface PieChartDataPoint {
    name: string;
    value: number;
    color: string;
}

/**
 * Transforms revenue API data into chart-compatible format
 */
export const transformRevenueData = (
    monthlyData: RevenueMonthData[] | undefined
): ChartDataPoint[] => {
    if (!monthlyData) return [];
    return monthlyData.map((item) => ({
        date: item.month_name.substring(0, 3),
        value: parseFloat(item.revenue),
    }));
};

/**
 * Transforms location API data into pie chart-compatible format
 */
export const transformLocationData = (
    locationData: CustomerLocationData[] | undefined
): PieChartDataPoint[] => {
    if (!locationData) return [];
    return locationData.map((item, index) => ({
        name: item.country_name,
        value: parseFloat(item.percentage),
        color: CHART_COLORS[index % CHART_COLORS.length],
    }));
};

/**
 * Format currency in NGN format
 */
export const formatCurrency = (
    value: string | number,
    options?: { minimumFractionDigits?: number; maximumFractionDigits?: number }
): string => {
    const numValue = typeof value === "string" ? parseFloat(value) : value;
    const { minimumFractionDigits = 2, maximumFractionDigits = 2 } = options || {};
    return `NGN ${numValue.toLocaleString("en-NG", {
        minimumFractionDigits,
        maximumFractionDigits,
    })}`;
};

/**
 * Format currency for chart axis (abbreviated)
 */
export const formatCurrencyAxis = (value: number): string => {
    if (value >= 1000000) {
        return `NGN ${(value / 1000000).toFixed(1)}M`;
    }
    if (value >= 1000) {
        return `NGN ${(value / 1000).toFixed(0)}k`;
    }
    return `NGN ${value}`;
};
