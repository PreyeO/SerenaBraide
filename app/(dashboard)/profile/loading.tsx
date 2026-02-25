import { Skeleton } from "@/components/ui/skeleton";

export default function ProfileLoading() {
    return (
        <div className="flex flex-col gap-6 animate-pulse">
            {/* Page header */}
            <Skeleton className="h-8 w-48 bg-[#E0E0E0]" />

            {/* Summary cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[...Array(3)].map((_, i) => (
                    <Skeleton key={i} className="h-32 rounded-xl bg-[#E0E0E0]" />
                ))}
            </div>

            {/* Recent orders */}
            <Skeleton className="h-6 w-36 bg-[#E0E0E0]" />
            <div className="flex flex-col gap-4">
                {[...Array(2)].map((_, i) => (
                    <Skeleton key={i} className="h-36 rounded-[10px] bg-[#E0E0E0]" />
                ))}
            </div>
        </div>
    );
}
