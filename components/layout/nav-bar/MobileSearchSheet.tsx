// components/navbar/mobile/MobileSearchSheet.tsx
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Search, ChevronLeft } from "lucide-react";
import SubHeading from "@/components/ui/typography/subHeading";
import { Input } from "@/components/ui/input";
import ProductImage from "@/components/ui/images/product-image";
import { dummySearchItems } from "@/constant/data";

interface MobileSearchSheetProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export const MobileSearchSheet = ({
  isOpen,
  onOpenChange,
}: MobileSearchSheetProps) => {
  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetTrigger asChild>
        <button className="text-white">
          <Search className="size-6" />
        </button>
      </SheetTrigger>

      <SheetContent
        side="left"
        className="py-6 w-full max-w-xs top-12"
        showClose={false}
      >
        {/* Search input */}
        <div className="flex items-center gap-2 mb-6 bg-[#F5F5F5] py-4.5 px-6">
          <ChevronLeft
            className="cursor-pointer"
            onClick={() => onOpenChange(false)}
          />
          <Input
            placeholder="What are you looking for"
            className="w-full border rounded-full px-4 py-4 text-sm outline-none"
          />
        </div>

        {/* Recently searched */}
        <div className="mb-6 px-6">
          <SubHeading
            className="text-base text-[#6F6E6C] font-normal mb-6"
            title="RECENTLY SEARCHED"
          />
          <ul className="flex flex-col gap-4">
            {dummySearchItems.map((item, idx) => (
              <li
                key={idx}
                className="flex gap-3 items-center text-[#363438] text-sm font-normal"
              >
                <ProductImage
                  src={item.image}
                  width={41}
                  height={41}
                  alt={item.name}
                  className="rounded"
                />
                <div className="flex flex-col gap-0.75">
                  {item.name}
                  <span className="text-[#6F6E6C] text-xs">{item.price}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Trending */}
        <div className="px-6">
          <SubHeading
            className="text-[#6F6E6C] text-base font-normal mb-6"
            title="TRENDING NOW"
          />
          <ul className="space-y-4">
            {dummySearchItems.map((item, idx) => (
              <li
                key={idx}
                className="flex gap-3 items-center text-[#363438] text-sm font-normal"
              >
                <ProductImage
                  src={item.image}
                  width={48}
                  height={48}
                  alt={item.name}
                  className="rounded"
                />
                <div className="flex flex-col gap-0.75">
                  {item.name}
                  <span className="text-[#6F6E6C] text-xs">{item.price}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </SheetContent>
    </Sheet>
  );
};
