import { Spinner } from "@/components/ui/spinner";

const LoadingState = () => {
  return (
    <section className="min-h-screen p-4 sm:p-8  flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <Spinner className="size-8 text-[#3B3B3B] " />
        <p className="text-white text-sm sm:text-base font-medium">
          Screen Loading ...
        </p>
      </div>
    </section>
  );
};
export default LoadingState;
