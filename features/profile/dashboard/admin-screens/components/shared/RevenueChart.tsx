"use client";

import { ReactNode } from "react";
import { ChartContainer, ChartTooltip } from "@/components/ui/chart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
    Area,
    AreaChart,
    CartesianGrid,
    XAxis,
    YAxis,
} from "recharts";
import { Download } from "lucide-react";
import { chartConfig } from "@/features/profile/data/data.admin";
import {
    ChartDataPoint,
    formatCurrency,
    formatCurrencyAxis,
} from "@/features/profile/utils/dashboard.utils";

interface RevenueChartProps {
    data: ChartDataPoint[];
    title: string;
    showDownloadButton?: boolean;
    onDownload?: () => void;
    gradientId?: string;
}

const RevenueChart = ({
    data,
    title,
    showDownloadButton = true,
    onDownload,
    gradientId = "colorValue",
}: RevenueChartProps) => {
    const renderTooltip = ({
        active,
        payload,
    }: {
        active?: boolean;
        payload?: Array<{ value: number; payload: { date: string } }>;
    }): ReactNode => {
        if (active && payload && payload.length) {
            const value = payload[0].value;
            return (
                <div className="bg-white border border-[#E5E5E5] rounded-lg p-3 shadow-lg">
                    <p className="text-sm font-medium text-[#3B3B3B]">
                        {formatCurrency(value)}
                    </p>
                    <p className="text-xs text-[#9A9A98]">{payload[0].payload.date}</p>
                </div>
            );
        }
        return null;
    };

    return (
        <Card className="lg:col-span-2 bg-white border border-[#F5F5F5]">
            <CardHeader className="flex flex-row items-center justify-between pb-4">
                <CardTitle className="text-lg font-semibold text-[#3B3B3B]">
                    {title}
                </CardTitle>
                {showDownloadButton && (
                    <Button
                        variant="outline"
                        size="sm"
                        className="text-xs border-[#D1D5DB]"
                        onClick={onDownload}
                    >
                        <Download className="h-4 w-4 mr-1" />
                        Download Report
                    </Button>
                )}
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig} className="h-auto w-full">
                    <AreaChart data={data}>
                        <defs>
                            <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
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
                            tick={{ fill: "#9A9A98", fontSize: 12 }}
                            axisLine={{ stroke: "#F0F0F0" }}
                            tickFormatter={formatCurrencyAxis}
                        />
                        <ChartTooltip content={renderTooltip} />
                        <Area
                            type="monotone"
                            dataKey="value"
                            stroke="#3B82F6"
                            strokeWidth={2}
                            fill={`url(#${gradientId})`}
                        />
                    </AreaChart>
                </ChartContainer>
            </CardContent>
        </Card>
    );
};

export default RevenueChart;
