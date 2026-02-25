import { Skeleton } from "@/components/ui/skeleton";

export default function AdminLoading() {
    return (
        <div className="flex flex-col gap-6 animate-pulse p-4 lg:p-0">
            {/* Header */}
            <div className="flex justify-between items-center">
                <Skeleton className="h-8 w-48 bg-[#E0E0E0]" />
                <Skeleton className="h-10 w-32 rounded-full bg-[#E0E0E0]" />
            </div>

            {/* Stats cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {[...Array(4)].map((_, i) => (
                    <Skeleton key={i} className="h-28 rounded-xl bg-[#E0E0E0]" />
                ))}
            </div>

            {/* Table skeleton */}
            <Skeleton className="h-10 w-full rounded-lg bg-[#E0E0E0]" />
            {[...Array(5)].map((_, i) => (
                <Skeleton key={i} className="h-14 w-full rounded-lg bg-[#E0E0E0]" />
            ))}
        </div>
    );
}
