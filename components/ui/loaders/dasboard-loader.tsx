import { Spinner } from "@/components/ui/spinner";

const DashboardLoader = () => {
  return (
    <div className="flex h-[50vh] w-full items-center justify-center -translate-x-8">
      <div className="flex flex-col items-center gap-3">
        <Spinner className="size-8 text-[#3B3B3B]" />
        <p className="text-sm text-gray-500">Loading...</p>
      </div>
    </div>
  );
};

export default DashboardLoader;
