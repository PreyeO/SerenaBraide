import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, ChevronRight, ChevronLeft } from "lucide-react";
import Link from "next/link";
import { NavItem } from "@/types/general";
import { currencyNavItem } from "@/constant/data";
import SubHeading from "@/components/ui/typography/subHeading";
import ProductImage from "@/components/ui/images/product-image";

interface MobileMenuSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  mobileNavItems: NavItem[];
  mobileActiveItem: string | null;
  setMobileActiveItem: (item: string | null) => void;
  mobileActiveSection: string | null;
  setMobileActiveSection: (section: string | null) => void;
  selectedCurrency: string;
  handleCurrencySelect: (currency: string) => void;
  handleLinkClick: (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => void;
}

export const MobileMenuSheet = ({
  open,
  onOpenChange,
  mobileNavItems,
  mobileActiveItem,
  setMobileActiveItem,
  mobileActiveSection,
  setMobileActiveSection,
  selectedCurrency,
  handleCurrencySelect,
  handleLinkClick,
}: MobileMenuSheetProps) => {
  const currentItem = mobileNavItems.find(
    (item) => item.title === mobileActiveItem,
  );
  const currentSection = currentItem?.sections.find(
    (sec) => sec.heading === mobileActiveSection,
  );

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetTrigger className="text-white">
        <Menu className="size-6" />
      </SheetTrigger>
      <SheetContent side="left" className="px-6 py-6 w-full max-w-xs top-12">
        <SubHeading
          className="font-medium text-sm text-[#3B3B3B]"
          title="Menu"
        />

        <div className="relative overflow-hidden">
          {/* Main Menu Level */}
          <div
            className={`transition-all duration-300 ease-in-out ${
              mobileActiveItem
                ? "opacity-0 -translate-x-full absolute inset-0"
                : "opacity-100 translate-x-0"
            }`}
          >
            <div className="flex flex-col">
              <ul className="space-y-3 my-6">
                {mobileNavItems.map((item) => (
                  <li
                    key={item.title}
                    className="text-sm font-normal text-[#6F6E6C] transition-colors duration-200 hover:text-[#3B3B3B]"
                  >
                    {item.sections.length > 0 ? (
                      <button
                        onClick={() => setMobileActiveItem(item.title)}
                        className="text-left w-full flex justify-between items-center"
                      >
                        {item.title}
                        <ChevronRight color="#3B3B3B" size={18} />
                      </button>
                    ) : (
                      <Link
                        href={item.href}
                        onClick={(e) => handleLinkClick(e, item.href)}
                        className="flex justify-between items-center"
                      >
                        {item.title}
                        <ChevronRight color="#3B3B3B" size={18} />
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
              <div className="border border-[#F0F0F0] w-full shrink-0 my-6" />
              <ul className="flex flex-col text-sm font-normal text-[#6F6E6C] space-y-3">
                <li className="flex justify-between w-full items-center transition-colors duration-200 hover:text-[#3B3B3B] cursor-pointer">
                  <Link
                    href="/contact-us"
                    onClick={(e) => handleLinkClick(e, "/contact-us")}
                    className="flex justify-between items-center w-full"
                  >
                    CONTACT US
                    <ChevronRight color="#3B3B3B" size={18} />
                  </Link>
                </li>
                <li className="flex justify-between w-full items-center transition-colors duration-200 hover:text-[#3B3B3B] cursor-pointer">
                  <button
                    onClick={() => setMobileActiveItem("CURRENCY")}
                    className="text-left w-full flex justify-between items-center"
                  >
                    <span className="flex items-center gap-2">
                      CURRENCY
                      <span className="text-xs text-[#3B3B3B]">
                        ({selectedCurrency})
                      </span>
                    </span>
                    <ChevronRight color="#3B3B3B" size={18} />
                  </button>
                </li>
              </ul>
            </div>
          </div>

          {/* Section Menu Level */}
          <div
            className={`transition-all duration-300 ease-in-out ${
              mobileActiveItem && !mobileActiveSection
                ? "opacity-100 translate-x-0"
                : "opacity-0 translate-x-full absolute inset-0"
            }`}
          >
            {mobileActiveItem && !mobileActiveSection && (
              <>
                <button
                  className="mb-4 text-sm text-gray-500 flex items-center gap-1.25 transition-colors duration-200 hover:text-[#3B3B3B]"
                  onClick={() => setMobileActiveItem(null)}
                >
                  <ChevronLeft className="size-6" />
                  <h2 className="text-sm font-medium text-[#3B3B3B]">
                    {mobileActiveItem}
                  </h2>
                </button>

                {mobileActiveItem === "CURRENCY" ? (
                  <ul className="space-y-3 my-6">
                    {currencyNavItem.sections[0]?.items.map((currency) => (
                      <li
                        key={currency.name}
                        className="text-sm font-normal text-[#6F6E6C] transition-colors duration-200 hover:text-[#3B3B3B]"
                      >
                        <button
                          onClick={() => handleCurrencySelect(currency.name)}
                          className="flex items-center gap-3 w-full"
                        >
                          {currency.icon && (
                            <ProductImage
                              src={currency.icon}
                              width={24}
                              height={16}
                              alt={currency.name}
                              className="rounded"
                            />
                          )}
                          <span className="flex-1 text-left">
                            {currency.name}
                          </span>
                          {selectedCurrency === currency.name && (
                            <span className="text-green-600">✓</span>
                          )}
                        </button>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <ul className="space-y-3">
                    {currentItem?.sections.map((section) => (
                      <li
                        key={section.heading}
                        className="text-sm font-normal text-[#6F6E6C] transition-colors duration-200 hover:text-[#3B3B3B]"
                      >
                        <button
                          onClick={() =>
                            setMobileActiveSection(section.heading)
                          }
                          className="text-left w-full flex justify-between items-center"
                        >
                          {section.heading}
                          <ChevronRight color="#3B3B3B" size={18} />
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </>
            )}
          </div>

          {/* Item Menu Level */}
          <div
            className={`transition-all duration-300 ease-in-out ${
              mobileActiveSection
                ? "opacity-100 translate-x-0"
                : "opacity-0 translate-x-full absolute inset-0"
            }`}
          >
            {mobileActiveSection && (
              <>
                <button
                  className="mb-4 text-sm text-gray-500 flex items-center gap-1.25 transition-colors duration-200 hover:text-[#3B3B3B]"
                  onClick={() => setMobileActiveSection(null)}
                >
                  <ChevronLeft className="size-6" />
                  <h2 className="text-sm font-medium text-[#3B3B3B]">
                    {mobileActiveSection}
                  </h2>
                </button>

                <ul className="space-y-2 my-6">
                  {currentSection?.items.map((link) => (
                    <li
                      key={link.name}
                      className="text-sm font-normal text-[#6F6E6C] transition-colors duration-200 hover:text-[#3B3B3B]"
                    >
                      <Link
                        href={link.href}
                        onClick={(e) => handleLinkClick(e, link.href)}
                        className="flex justify-between items-center"
                      >
                        {link.name}
                        <ChevronRight color="#3B3B3B" size={18} />
                      </Link>
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};
