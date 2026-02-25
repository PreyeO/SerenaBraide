import { Skeleton } from "@/components/ui/skeleton";

export default function CheckoutLoading() {
    return (
        <div className="flex flex-col lg:flex-row gap-8 animate-pulse px-4 lg:px-16 py-8">
            {/* Form */}
            <div className="flex-1 flex flex-col gap-5">
                <Skeleton className="h-8 w-40 bg-[#E0E0E0]" />
                {[...Array(4)].map((_, i) => (
                    <div key={i} className="flex flex-col gap-2">
                        <Skeleton className="h-4 w-24 bg-[#E0E0E0]" />
                        <Skeleton className="h-10 w-full rounded-full bg-[#E0E0E0]" />
                    </div>
                ))}
            </div>

            {/* Order summary */}
            <div className="w-full lg:w-96 flex flex-col gap-4">
                <Skeleton className="h-6 w-36 bg-[#E0E0E0]" />
                {[...Array(2)].map((_, i) => (
                    <div key={i} className="flex gap-3">
                        <Skeleton className="w-16 h-16 rounded-lg bg-[#E0E0E0]" />
                        <div className="flex-1 flex flex-col gap-2">
                            <Skeleton className="h-4 w-32 bg-[#E0E0E0]" />
                            <Skeleton className="h-4 w-20 bg-[#E0E0E0]" />
                        </div>
                    </div>
                ))}
                <Skeleton className="h-px w-full bg-[#D1D5DB]" />
                <Skeleton className="h-6 w-full bg-[#E0E0E0]" />
                <Skeleton className="h-12 w-full rounded-full bg-[#E0E0E0]" />
            </div>
        </div>
    );
}
