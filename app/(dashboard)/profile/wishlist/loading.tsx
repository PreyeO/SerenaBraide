import { Skeleton } from "@/components/ui/skeleton";

export default function WishlistLoading() {
    return (
        <div className="flex flex-col gap-6 animate-pulse">
            <Skeleton className="h-8 w-32 bg-[#E0E0E0]" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {[...Array(4)].map((_, i) => (
                    <div key={i} className="flex flex-col gap-2">
                        <Skeleton className="aspect-square rounded-lg bg-[#E0E0E0]" />
                        <Skeleton className="h-4 w-3/4 bg-[#E0E0E0]" />
                        <Skeleton className="h-4 w-1/2 bg-[#E0E0E0]" />
                    </div>
                ))}
            </div>
        </div>
    );
}
