import { Skeleton } from "@/components/ui/skeleton";

export default function AdminTableLoading() {
    return (
        <div className="flex flex-col gap-6 animate-pulse p-4 lg:p-0">
            {/* Header */}
            <div className="flex justify-between items-center">
                <Skeleton className="h-8 w-40 bg-[#E0E0E0]" />
                <Skeleton className="h-10 w-32 rounded-full bg-[#E0E0E0]" />
            </div>

            {/* Search / filter bar */}
            <div className="flex gap-3">
                <Skeleton className="h-10 flex-1 max-w-md rounded-full bg-[#E0E0E0]" />
                <Skeleton className="h-10 w-36 rounded-full bg-[#E0E0E0]" />
            </div>

            {/* Table header */}
            <Skeleton className="h-12 w-full rounded-lg bg-[#E0E0E0]" />

            {/* Table rows */}
            {[...Array(6)].map((_, i) => (
                <Skeleton key={i} className="h-16 w-full rounded-lg bg-[#E0E0E0]" />
            ))}
        </div>
    );
}
