import React from "react";
import { Skeleton } from "../skeleton";

const CardSkeleton = () => {
  return (
    <div className="rounded-2xl bg-white p-4 space-y-4">
      <Skeleton className="h-48 w-full rounded-xl" />
      <Skeleton className="h-4 w-2/3" />
      <Skeleton className="h-4 w-1/3" />
    </div>
  );
};

export default CardSkeleton;
