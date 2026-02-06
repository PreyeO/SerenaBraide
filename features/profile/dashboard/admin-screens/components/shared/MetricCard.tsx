"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface MetricCardProps {
    label: string;
    value: string | number;
    className?: string;
}

const MetricCard = ({ label, value, className }: MetricCardProps) => {
    return (
        <Card className={`flex flex-col gap-1 ${className || ""}`}>
            <CardHeader>
                <CardTitle className="text-sm font-normal text-[#6F6E6C]">
                    {label}
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="text-[22px] font-medium text-[#3B3B3B]">{value}</div>
            </CardContent>
        </Card>
    );
};

export default MetricCard;
