"use client";

import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Pie, PieChart, Cell } from "recharts";
import { chartConfig } from "@/features/profile/data/data.admin";
import { PieChartDataPoint } from "@/features/profile/utils/dashboard.utils";

interface LocationChartProps {
    data: PieChartDataPoint[];
    title?: string;
    emptyMessage?: string;
}

const LocationChart = ({
    data,
    title = "Top customers by location",
    emptyMessage = "No location data available",
}: LocationChartProps) => {
    const hasData = data.length > 0;

    return (
        <Card className="bg-white border border-[#F5F5F5]">
            <CardHeader className="pb-4">
                <CardTitle className="text-lg font-semibold text-[#3B3B3B]">
                    {title}
                </CardTitle>
            </CardHeader>
            <CardContent>
                {hasData ? (
                    <>
                        <ChartContainer config={chartConfig} className="h-auto w-full">
                            <PieChart>
                                <Pie
                                    data={data}
                                    cx="50%"
                                    cy="50%"
                                    labelLine={false}
                                    outerRadius={80}
                                    fill="#8884d8"
                                    dataKey="value"
                                    label={({ name, value }) => `${value}% ${name}`}
                                >
                                    {data.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Pie>
                                <ChartTooltip content={<ChartTooltipContent />} />
                            </PieChart>
                        </ChartContainer>
                        <div className="mt-6 space-y-3">
                            {data.map((location, index) => (
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
                    </>
                ) : (
                    <div className="flex items-center justify-center h-48 text-[#6F6E6C]">
                        {emptyMessage}
                    </div>
                )}
            </CardContent>
        </Card>
    );
};

export default LocationChart;
