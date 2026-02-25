import { Skeleton } from "@/components/ui/skeleton";

export default function ShippingDetailLoading() {
    return (
        <div className="flex flex-col gap-6 animate-pulse">
            <Skeleton className="h-8 w-48 bg-[#E0E0E0]" />
            <div className="flex flex-col gap-4">
                {[...Array(2)].map((_, i) => (
                    <div
                        key={i}
                        className="bg-[#F6F7F8] border border-[#F5F5F5] p-6 rounded-[10px]"
                    >
                        <div className="flex justify-between mb-3">
                            <Skeleton className="h-5 w-32 bg-[#E0E0E0]" />
                            <Skeleton className="h-5 w-16 bg-[#E0E0E0]" />
                        </div>
                        <Skeleton className="h-4 w-64 mb-2 bg-[#E0E0E0]" />
                        <Skeleton className="h-4 w-48 bg-[#E0E0E0]" />
                    </div>
                ))}
            </div>
        </div>
    );
}
