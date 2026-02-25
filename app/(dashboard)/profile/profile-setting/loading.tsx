import { Skeleton } from "@/components/ui/skeleton";

export default function ProfileSettingLoading() {
    return (
        <div className="flex flex-col gap-6 animate-pulse">
            <Skeleton className="h-8 w-40 bg-[#E0E0E0]" />
            <div className="bg-[#F6F7F8] border border-[#F5F5F5] p-6 rounded-[10px] flex flex-col gap-5">
                {[...Array(4)].map((_, i) => (
                    <div key={i} className="flex flex-col gap-2">
                        <Skeleton className="h-4 w-24 bg-[#E0E0E0]" />
                        <Skeleton className="h-10 w-full rounded-full bg-[#E0E0E0]" />
                    </div>
                ))}
                <Skeleton className="h-10 w-40 rounded-full bg-[#E0E0E0] mt-2" />
            </div>
        </div>
    );
}
