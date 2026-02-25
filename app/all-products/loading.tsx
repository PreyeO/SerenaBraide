import { Skeleton } from "@/components/ui/skeleton";

export default function AllProductsLoading() {
    return (
        <div className="flex flex-col gap-6 animate-pulse px-4 lg:px-16 py-8">
            <Skeleton className="h-10 w-48 bg-[#E0E0E0]" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
                {[...Array(8)].map((_, i) => (
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
