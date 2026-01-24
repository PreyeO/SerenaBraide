import { Spinner } from "@/components/ui/spinner";

const LoadingState = () => {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <Spinner className="size-8 text-[#3B3B3B] " />
        <p className="text-sm text-gray-500">Loading...</p>
      </div>
    </div>
  );
};
export default LoadingState;
