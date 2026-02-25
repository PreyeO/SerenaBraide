import { Skeleton } from "@/components/ui/skeleton";

export default function AuthLoading() {
    return (
        <div className="flex items-center justify-center min-h-[60vh] animate-pulse">
            <div className="w-full max-w-md flex flex-col gap-6 px-4">
                <Skeleton className="h-8 w-40 mx-auto bg-[#E0E0E0]" />
                <Skeleton className="h-4 w-64 mx-auto bg-[#E0E0E0]" />
                {[...Array(3)].map((_, i) => (
                    <Skeleton key={i} className="h-10 w-full rounded-full bg-[#E0E0E0]" />
                ))}
                <Skeleton className="h-12 w-full rounded-full bg-[#E0E0E0]" />
            </div>
        </div>
    );
}
