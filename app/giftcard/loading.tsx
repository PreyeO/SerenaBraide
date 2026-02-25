import { Skeleton } from "@/components/ui/skeleton";

export default function GiftCardLoading() {
    return (
        <div className="flex flex-col gap-6 animate-pulse px-4 lg:px-16 py-8">
            <Skeleton className="h-10 w-48 bg-[#E0E0E0]" />
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {[...Array(4)].map((_, i) => (
                    <Skeleton key={i} className="aspect-[3/2] rounded-lg bg-[#E0E0E0]" />
                ))}
            </div>
            <Skeleton className="h-6 w-32 bg-[#E0E0E0]" />
            <div className="flex gap-3">
                {[...Array(4)].map((_, i) => (
                    <Skeleton key={i} className="h-10 w-24 rounded-full bg-[#E0E0E0]" />
                ))}
            </div>
            <Skeleton className="h-12 w-48 rounded-full bg-[#E0E0E0]" />
        </div>
    );
}
