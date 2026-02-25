import { Skeleton } from "@/components/ui/skeleton";

export default function CartLoading() {
    return (
        <div className="flex flex-col lg:flex-row gap-8 animate-pulse px-4 lg:px-16 py-8">
            {/* Cart items */}
            <div className="flex-1 flex flex-col gap-4">
                <Skeleton className="h-8 w-32 bg-[#E0E0E0]" />
                {[...Array(3)].map((_, i) => (
                    <div key={i} className="flex gap-4 p-4 rounded-lg border border-[#F5F5F5]">
                        <Skeleton className="w-20 h-20 rounded-lg bg-[#E0E0E0]" />
                        <div className="flex-1 flex flex-col gap-2">
                            <Skeleton className="h-5 w-48 bg-[#E0E0E0]" />
                            <Skeleton className="h-4 w-24 bg-[#E0E0E0]" />
                            <Skeleton className="h-4 w-20 bg-[#E0E0E0]" />
                        </div>
                    </div>
                ))}
            </div>

            {/* Summary */}
            <div className="w-full lg:w-80 flex flex-col gap-4">
                <Skeleton className="h-6 w-32 bg-[#E0E0E0]" />
                <Skeleton className="h-4 w-full bg-[#E0E0E0]" />
                <Skeleton className="h-4 w-full bg-[#E0E0E0]" />
                <Skeleton className="h-px w-full bg-[#D1D5DB]" />
                <Skeleton className="h-6 w-full bg-[#E0E0E0]" />
                <Skeleton className="h-12 w-full rounded-full bg-[#E0E0E0]" />
            </div>
        </div>
    );
}
