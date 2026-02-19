// components/navbar/mobile/MobileMenuLevel.tsx
import Link from "next/link";
import { ChevronRight, ChevronLeft } from "lucide-react";
import { NavItem, NavSection } from "@/types/general";

interface MobileMenuLevelProps {
  activeItem: string | null;
  activeSection: string | null;
  currentItem?: NavItem;
  currentSection?: NavSection;
  onItemClick: (item: string) => void;
  onSectionClick: (section: string) => void;
  onBack: () => void;
  onLinkClick: (e: React.MouseEvent<HTMLAnchorElement>, href: string) => void;
  navItems: NavItem[];
}

export const MobileMenuLevel = ({
  activeItem,
  activeSection,
  currentItem,
  currentSection,
  onItemClick,
  onSectionClick,
  onBack,
  onLinkClick,
  navItems,
}: MobileMenuLevelProps) => {
  return (
    <div className="relative overflow-hidden">
      {/* Main Menu Level */}
      <div
        className={`transition-all duration-300 ease-in-out ${activeItem
          ? "opacity-0 -translate-x-full absolute inset-0"
          : "opacity-100 translate-x-0"
          }`}
      >
        <div className="flex flex-col">
          <ul className="space-y-3 my-6">
            {navItems.map((item) => (
              <li
                key={item.title}
                className="text-sm font-normal text-[#6F6E6C] transition-colors duration-200 hover:text-[#3B3B3B]"
              >
                {item.sections.length > 0 ? (
                  <button
                    onClick={() => onItemClick(item.title)}
                    className="text-left w-full flex justify-between items-center"
                  >
                    {item.title}
                    <ChevronRight color="#3B3B3B" size={18} />
                  </button>
                ) : (
                  <Link
                    href={item.href}
                    onClick={(e) => onLinkClick(e, item.href)}
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
                onClick={(e) => onLinkClick(e, "/contact-us")}
                className="flex justify-between items-center w-full"
              >
                CONTACT US
                <ChevronRight color="#3B3B3B" size={18} />
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Section Menu Level */}
      <div
        className={`transition-all duration-300 ease-in-out ${activeItem && !activeSection
          ? "opacity-100 translate-x-0"
          : "opacity-0 translate-x-full absolute inset-0"
          }`}
      >
        {activeItem && !activeSection && (
          <>
            <button
              className="mb-4 text-sm text-gray-500 flex items-center gap-1.25 transition-colors duration-200 hover:text-[#3B3B3B]"
              onClick={onBack}
            >
              <ChevronLeft className="size-6" />
              <h2 className="text-sm font-medium text-[#3B3B3B]">
                {activeItem}
              </h2>
            </button>

            <ul className="space-y-3">
              {currentItem?.sections.map((section) => (
                <li
                  key={section.heading}
                  className="text-sm font-normal text-[#6F6E6C] transition-colors duration-200 hover:text-[#3B3B3B]"
                >
                  <button
                    onClick={() => onSectionClick(section.heading)}
                    className="text-left w-full flex justify-between items-center"
                  >
                    {section.heading}
                    <ChevronRight color="#3B3B3B" size={18} />
                  </button>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>

      {/* Item Menu Level */}
      <div
        className={`transition-all duration-300 ease-in-out ${activeSection
          ? "opacity-100 translate-x-0"
          : "opacity-0 translate-x-full absolute inset-0"
          }`}
      >
        {activeSection && (
          <>
            <button
              className="mb-4 text-sm text-gray-500 flex items-center gap-1.25 transition-colors duration-200 hover:text-[#3B3B3B]"
              onClick={onBack}
            >
              <ChevronLeft className="size-6" />
              <h2 className="text-sm font-medium text-[#3B3B3B]">
                {activeSection}
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
                    onClick={(e) => onLinkClick(e, link.href)}
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
  );
};
