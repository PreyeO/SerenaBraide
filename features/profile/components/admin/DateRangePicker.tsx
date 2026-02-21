"use client";

import React, { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon, ChevronDown } from "lucide-react";
import { DateRange as ReactDayPickerRange } from "react-day-picker";
import { TimePeriod } from "@/types/admin";
import { cn } from "@/lib/utils";

interface DateRangePickerProps {
  dateRange: ReactDayPickerRange | undefined;
  onDateRangeChange: (range: ReactDayPickerRange | undefined) => void;
  displayLabel: string;
  period: TimePeriod;
  onPeriodChange: (period: TimePeriod) => void;
}

const DateRangePicker: React.FC<DateRangePickerProps> = ({
  dateRange,
  onDateRangeChange,
  displayLabel,
  period,
  onPeriodChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (range: ReactDayPickerRange | undefined) => {
    if (range?.from && range?.to) {
      // onDateRangeChange maps to setPeriodAndRange("custom", range) — no need to call onPeriodChange separately
      onDateRangeChange(range);
      setIsOpen(false);
    } else if (range?.from) {
      // Partial selection (only start date picked so far), keep popover open
      onDateRangeChange(range);
    }
  };

  const handleQuickSelect = (newPeriod: TimePeriod) => {
    onPeriodChange(newPeriod);
    setIsOpen(false);
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "justify-start text-left font-normal border border-[#D1D5DB] rounded-lg px-4 py-2 h-auto",
            !dateRange && "text-muted-foreground",
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          <span className="text-sm text-[#3B3B3B]">{displayLabel}</span>
          <ChevronDown className="ml-2 h-4 w-4 text-[#9A9A98]" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="end">
        <div className="p-4 space-y-4">
          {/* Quick Select Buttons */}
          <div className="grid grid-cols-2 gap-2">
            {(["1D", "7D", "1M", "1Y"] as TimePeriod[]).map((p) => (
              <Button
                key={p}
                variant={period === p ? "default" : "outline"}
                size="sm"
                onClick={() => handleQuickSelect(p)}
                className={cn(
                  "text-xs",
                  period === p
                    ? "bg-[#3B3B3B] text-white"
                    : "text-[#6F6E6C] hover:bg-[#F5F5F5]",
                )}
              >
                {p === "1D"
                  ? "Today"
                  : p === "7D"
                    ? "Last 7 Days"
                    : p === "1M"
                      ? "Last Month"
                      : "This Year"}
              </Button>
            ))}
          </div>

          {/* Double Calendar */}
          <div className="flex gap-4">
            <Calendar
              mode="range"
              defaultMonth={dateRange?.from}
              selected={dateRange}
              onSelect={handleSelect}
              numberOfMonths={2}
              className="rounded-lg border-0"
            />
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default DateRangePicker;
