// components/navbar/mobile/MobileSearchSheet.tsx
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Search, ChevronLeft } from "lucide-react";
import SubHeading from "@/components/ui/typography/subHeading";
import { Input } from "@/components/ui/input";
import {
  useSearchProducts,
  useTrendingProducts,
} from "@/features/products/hooks/useSearchProducts";
import { ProductListItem } from "@/features/products/product.type";
import LoadingState from "@/components/ui/loaders/loading-state";
import SearchProductItem from "@/features/products/components/shared/SearchProductItem";

interface MobileSearchSheetProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

// Helper to debounce search input
function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

export const MobileSearchSheet = ({
  isOpen,
  onOpenChange,
}: MobileSearchSheetProps) => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedSearchQuery = useDebounce(searchQuery, 500);

  // Fetch data
  const { data: searchResults, isLoading: isSearching } =
    useSearchProducts(debouncedSearchQuery);
  const { data: trendingProducts, isLoading: isTrendingLoading } =
    useTrendingProducts();

  const handleProductClick = (slug: string, categorySlug: string) => {
    router.push(`/categories/${categorySlug}/${slug}`);
    onOpenChange(false);
  };

  const renderProductList = (
    products: ProductListItem[] | undefined,
    isLoading: boolean,
    emptyMessage: string,
    limit?: number,
  ) => {
    if (isLoading) {
      return <LoadingState />;
    }

    if (!products || products.length === 0) {
      return <div className="text-gray-400 text-sm">{emptyMessage}</div>;
    }

    const displayedProducts = limit ? products.slice(0, limit) : products;

    return (
      <ul className="flex flex-col gap-4">
        {displayedProducts.map((item) => (
          <SearchProductItem
            key={item.id}
            item={item}
            onClick={handleProductClick}
          />
        ))}
      </ul>
    );
  };

  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetTrigger asChild>
        <button className="text-white">
          <Search className="size-6" />
        </button>
      </SheetTrigger>

      <SheetContent
        side="left"
        className="py-6 pt-20 lg:pt-0 w-full max-w-xs top-12 overflow-y-auto max-h-[calc(100vh-48px)]"
        showClose={false}
      >
        {/* Search input */}
        <div className="flex items-center gap-2 mb-6  bg-[#F5F5F5] py-4.5 px-6 rounded-lg">
          <ChevronLeft
            className="cursor-pointer"
            onClick={() => onOpenChange(false)}
          />
          <Input
            placeholder="What are you looking for"
            className="w-full border-none bg-transparent p-0 text-sm outline-none focus-visible:ring-0"
            autoFocus
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Recently searched / Search Results */}
        <div className="lg:mb-6 mb-2 px-6">
          <SubHeading
            className="lg:text-base text-sm text-[#6F6E6C] font-normal mb-6"
            title={searchQuery ? "SEARCH RESULTS" : "RECENTLY SEARCHED"}
          />
          {searchQuery ? (
            renderProductList(
              searchResults?.results,
              isSearching,
              "No products found.",
              5,
            )
          ) : (
            <div className="text-gray-400 text-sm italic">
              Type to search...
            </div>
          )}
        </div>

        {/* Trending */}
        <div className="px-6">
          <SubHeading
            className="text-[#6F6E6C] lg:text-base text-sm font-normal mb-6"
            title="TRENDING NOW"
          />
          {renderProductList(
            trendingProducts?.results,
            isTrendingLoading,
            "No trending products.",
            3,
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};
