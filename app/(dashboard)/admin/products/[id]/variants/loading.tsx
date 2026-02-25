import { Skeleton } from "@/components/ui/skeleton";

export default function VariantsLoading() {
    return (
        <div className="flex flex-col gap-6 animate-pulse p-4 lg:p-0">
            <Skeleton className="h-6 w-20 bg-[#E0E0E0]" />
            <Skeleton className="h-8 w-48 bg-[#E0E0E0]" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[...Array(6)].map((_, i) => (
                    <Skeleton key={i} className="h-40 rounded-xl bg-[#E0E0E0]" />
                ))}
            </div>
        </div>
    );
}
