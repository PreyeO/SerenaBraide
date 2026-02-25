import { Skeleton } from "@/components/ui/skeleton";

export default function CustomerDetailLoading() {
    return (
        <div className="flex flex-col gap-6 animate-pulse p-4 lg:p-0">
            {/* Back button */}
            <Skeleton className="h-6 w-20 bg-[#E0E0E0]" />

            {/* Customer info */}
            <div className="flex items-center gap-4">
                <Skeleton className="h-16 w-16 rounded-full bg-[#E0E0E0]" />
                <div className="flex flex-col gap-2">
                    <Skeleton className="h-6 w-40 bg-[#E0E0E0]" />
                    <Skeleton className="h-4 w-56 bg-[#E0E0E0]" />
                </div>
            </div>

            {/* Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[...Array(4)].map((_, i) => (
                    <Skeleton key={i} className="h-24 rounded-xl bg-[#E0E0E0]" />
                ))}
            </div>

            {/* Orders table */}
            <Skeleton className="h-8 w-36 bg-[#E0E0E0]" />
            {[...Array(3)].map((_, i) => (
                <Skeleton key={i} className="h-14 w-full rounded-lg bg-[#E0E0E0]" />
            ))}
        </div>
    );
}
