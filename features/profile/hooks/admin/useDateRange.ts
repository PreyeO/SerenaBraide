import { useState, useMemo, useCallback } from "react";
import { TimePeriod } from "@/types/admin";
import { DateRange } from "react-day-picker";
import { startOfYear, startOfDay, endOfDay, subDays, subMonths, subYears, format } from "date-fns";

/**
 * Formats a Date as YYYY-MM-DD for the backend API.
 */
const formatDateParam = (date: Date): string => format(date, "yyyy-MM-dd");

export const useDateRange = () => {
  const today = new Date();

  // Default to current year (Jan 1 → today) so dashboard shows full-year totals
  const [dateRange, setDateRange] = useState<DateRange>({
    from: startOfYear(today),
    to: endOfDay(today),
  });
  const [period, setPeriod] = useState<TimePeriod>("1Y");

  const setPeriodAndRange = useCallback((newPeriod: TimePeriod, range?: DateRange) => {
    setPeriod(newPeriod);

    if (range) {
      setDateRange(range);
      return;
    }

    const now = new Date();
    let from: Date;
    const to: Date = endOfDay(now);

    switch (newPeriod) {
      case "1D":
        from = startOfDay(now);
        break;
      case "7D":
        from = startOfDay(subDays(now, 6));
        break;
      case "1M":
        from = startOfDay(subMonths(now, 1));
        break;
      case "1Y":
        from = startOfYear(now);
        break;
      default:
        from = startOfDay(now);
    }

    setDateRange({ from, to });
  }, []);

  const displayLabel = useMemo(() => {
    if (period === "custom") {
      if (!dateRange.from || !dateRange.to) return "Select Date";
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
      "1Y": "This Year",
    };
    return labels[period];
  }, [period, dateRange]);

  // Formatted date strings ready for the API (YYYY-MM-DD)
  const startDate = dateRange.from ? formatDateParam(dateRange.from) : undefined;
  const endDate = dateRange.to ? formatDateParam(dateRange.to) : undefined;

  return {
    dateRange,
    period,
    displayLabel,
    startDate,
    endDate,
    setDateRange: (range: DateRange) => {
      setPeriodAndRange("custom", range);
    },
    setPeriod: setPeriodAndRange,
  };
};
