// components/navbar/desktop/DesktopSearchPanel.tsx
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import SubHeading from "@/components/ui/typography/subHeading";
import { Search } from "lucide-react";
import {
  useSearchProducts,
  useTrendingProducts,
} from "@/features/products/hooks/useSearchProducts";
import { ProductListItem } from "@/features/products/product.type";
import LoadingState from "@/components/ui/loaders/loading-state";
import SearchProductItem from "@/features/products/components/shared/SearchProductItem";

interface DesktopSearchPanelProps {
  onClose: () => void;
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

export const DesktopSearchPanel = ({ onClose }: DesktopSearchPanelProps) => {
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
    onClose();
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
      <ul className="flex flex-col gap-6">
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
    <div className="w-full bg-[#FAFAFA] h-117.5 pt-8 px-16 transition-all duration-300 overflow-y-auto border-t border-gray-100 shadow-sm">
      {/* Search Input */}
      <div className="w-full max-w-4xl mx-auto mb-12 relative">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 size-5" />
          <Input
            placeholder="What are you looking for"
            className="w-full border border-gray-300 rounded-full pl-12 pr-4 py-6 text-base outline-none bg-transparent focus-visible:ring-0 focus-visible:border-gray-400"
            autoFocus
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="flex gap-20 justify-center">
        {/* Recently Searched / Search Results */}
        <div className="w-96">
          <SubHeading
            className="text-xs text-[#6F6E6C] font-normal mb-6 tracking-wide uppercase"
            title={searchQuery ? "SEARCH RESULTS" : "RECENTLY SEARCHED"}
          />
          {searchQuery ? (
            renderProductList(
              searchResults?.results,
              isSearching,
              "No products found matching your search.",
              5,
            )
          ) : (
            <div className="text-gray-400 text-sm italic">
              Type to search products...
            </div>
          )}
        </div>

        {/* Trending Now */}
        <div className="w-96">
          <SubHeading
            className="text-xs text-[#6F6E6C] font-normal mb-6 tracking-wide uppercase"
            title="TRENDING NOW"
          />
          {renderProductList(
            trendingProducts?.results,
            isTrendingLoading,
            "No trending products available.",
            3,
          )}
        </div>
      </div>
    </div>
  );
};
