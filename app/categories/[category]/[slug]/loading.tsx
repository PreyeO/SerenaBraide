import { Skeleton } from "@/components/ui/skeleton";

export default function ProductDetailLoading() {
    return (
        <div className="flex flex-col lg:flex-row gap-8 animate-pulse px-4 lg:px-16 py-8">
            {/* Image */}
            <Skeleton className="w-full lg:w-1/2 aspect-square rounded-lg bg-[#E0E0E0]" />

            {/* Details */}
            <div className="flex-1 flex flex-col gap-4">
                <Skeleton className="h-4 w-32 bg-[#E0E0E0]" />
                <Skeleton className="h-8 w-3/4 bg-[#E0E0E0]" />
                <Skeleton className="h-6 w-24 bg-[#E0E0E0]" />
                <Skeleton className="h-4 w-full bg-[#E0E0E0]" />
                <Skeleton className="h-4 w-5/6 bg-[#E0E0E0]" />
                <div className="flex gap-2 mt-4">
                    {[...Array(4)].map((_, i) => (
                        <Skeleton key={i} className="h-10 w-10 rounded-full bg-[#E0E0E0]" />
                    ))}
                </div>
                <Skeleton className="h-12 w-full rounded-full mt-4 bg-[#E0E0E0]" />
            </div>
        </div>
    );
}
