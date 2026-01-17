import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

export const OrderSkeleton = () => {
  return (
    <div className="w-full bg-[#F6F7F8] border border-[#F5F5F5] px-4 sm:px-8.5 py-6 rounded-[10px] animate-pulse">
      <div className="flex justify-between items-center mb-4">
        <Skeleton className="h-6 w-24" />
        <Skeleton className="h-6 w-32" />
      </div>
      <div className="border border-[#D1D5DB] w-full mb-4" />
      <div className="flex flex-col sm:flex-row gap-4 sm:justify-between">
        <div className="flex gap-2.5 items-center">
          <Skeleton className="w-25.5 h-25.5 rounded-[5px]" />
          <div className="flex flex-col gap-2">
            <Skeleton className="h-5 w-48" />
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-4 w-40" />
          </div>
        </div>
        <div className="flex flex-col gap-2 sm:items-end">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-10 w-40" />
          <Skeleton className="h-10 w-40" />
        </div>
      </div>
    </div>
  );
};

export default OrderSkeleton;
