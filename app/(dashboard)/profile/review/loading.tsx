import { Skeleton } from "@/components/ui/skeleton";

export default function ReviewLoading() {
    return (
        <div className="flex flex-col gap-4 lg:gap-6 animate-pulse">
            {/* Tabs */}
            <div className="bg-transparent lg:bg-[#F6F7F8] lg:border border-[#F5F5F5] lg:px-8.5 lg:py-6 lg:rounded-[10px]">
                <Skeleton className="h-8 w-56 mb-4 bg-[#E0E0E0]" />
                <Skeleton className="h-px w-full bg-[#D1D5DB]" />
                <div className="mt-4">
                    <Skeleton className="h-10 w-full max-w-md rounded-full bg-[#E0E0E0]" />
                </div>
            </div>

            {/* Order cards */}
            {[...Array(2)].map((_, i) => (
                <div
                    key={i}
                    className="bg-[#F6F7F8] border border-[#F5F5F5] px-4 sm:px-8.5 py-6 rounded-[10px]"
                >
                    <div className="flex justify-between mb-4">
                        <Skeleton className="h-6 w-24 bg-[#E0E0E0]" />
                        <Skeleton className="h-6 w-32 bg-[#E0E0E0]" />
                    </div>
                    <Skeleton className="h-px w-full bg-[#D1D5DB] mb-4" />
                    <div className="flex gap-4">
                        <Skeleton className="w-16 h-16 lg:w-25.5 lg:h-25.5 rounded-[5px] bg-[#E0E0E0]" />
                        <div className="flex flex-col gap-2 flex-1">
                            <Skeleton className="h-5 w-48 bg-[#E0E0E0]" />
                            <Skeleton className="h-4 w-32 bg-[#E0E0E0]" />
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
