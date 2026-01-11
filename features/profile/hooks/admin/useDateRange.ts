import { useState, useMemo } from "react";
import { TimePeriod } from "@/types/admin";
import { DateRange } from "react-day-picker";
import { startOfDay, endOfDay, subDays, subMonths, subYears } from "date-fns";

export const useDateRange = () => {
  const [dateRange, setDateRange] = useState<DateRange>({
    from: startOfDay(new Date()),
    to: endOfDay(new Date()),
  });
  const [period, setPeriod] = useState<TimePeriod>("1D");

  const setPeriodAndRange = (newPeriod: TimePeriod, range?: DateRange) => {
    setPeriod(newPeriod);
    
    if (range) {
      setDateRange(range);
      return;
    }

    const today = new Date();
    let from: Date;
    let to: Date = endOfDay(today);

    switch (newPeriod) {
      case "1D":
        from = startOfDay(today);
        break;
      case "7D":
        from = startOfDay(subDays(today, 6));
        break;
      case "1M":
        from = startOfDay(subMonths(today, 1));
        break;
      case "1Y":
        from = startOfDay(subYears(today, 1));
        break;
      default:
        from = startOfDay(today);
    }

    setDateRange({ from, to });
  };

  const displayLabel = useMemo(() => {
    if (period === "custom") {
      if (!dateRange.from || !dateRange.to) return "Today";
      const fromStr = dateRange.from.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      });
      const toStr = dateRange.to.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      });
      return `${fromStr} - ${toStr}`;
    }

    const labels: Record<Exclude<TimePeriod, "custom">, string> = {
      "1D": "Today",
      "7D": "Last 7 Days",
      "1M": "Last Month",
      "1Y": "Last Year",
    };
    return labels[period];
  }, [period, dateRange]);

  return {
    dateRange,
    period,
    displayLabel,
    setDateRange: (range: DateRange) => {
      setPeriodAndRange("custom", range);
    },
    setPeriod: setPeriodAndRange,
  };
};

