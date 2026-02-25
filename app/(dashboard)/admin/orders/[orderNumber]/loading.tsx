import { Skeleton } from "@/components/ui/skeleton";

export default function OrderDetailLoading() {
    return (
        <div className="flex flex-col gap-6 animate-pulse p-4 lg:p-0">
            <Skeleton className="h-6 w-20 bg-[#E0E0E0]" />
            <div className="flex justify-between items-center">
                <Skeleton className="h-8 w-48 bg-[#E0E0E0]" />
                <Skeleton className="h-8 w-28 rounded-full bg-[#E0E0E0]" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Skeleton className="h-48 rounded-xl bg-[#E0E0E0]" />
                <Skeleton className="h-48 rounded-xl bg-[#E0E0E0]" />
            </div>
            <Skeleton className="h-12 w-full rounded-lg bg-[#E0E0E0]" />
            {[...Array(3)].map((_, i) => (
                <Skeleton key={i} className="h-14 w-full rounded-lg bg-[#E0E0E0]" />
            ))}
        </div>
    );
}
