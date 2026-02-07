// components/navbar/desktop/DesktopNavItems.tsx
import { NavItem } from "@/types/general";
import Link from "next/link";

interface DesktopNavItemsProps {
  items: NavItem[];
  activeMenu: string | null;
  onMenuOpen: (menu: string) => void;
}

export const DesktopNavItems = ({
  items,
  activeMenu,
  onMenuOpen,
}: DesktopNavItemsProps) => {
  return (
    <>
      {items.map((item) => {
        const hasDropdown = item.sections.length > 0;
        if (!hasDropdown) {
          return (
            <Link
              key={item.title}
              href={item.href}
              className="text-sm font-medium text-white rounded-full px-3 py-1 transition-colors duration-300 hover:bg-black"
            >
              {item.title}
            </Link>
          );
        }
        return (
          <div key={item.title} className="relative">
            <button
              onClick={() => onMenuOpen(item.title)}
              className={`text-sm font-medium text-white rounded-full transition-colors duration-300 px-3 py-1 hover:bg-black ${activeMenu === item.title ? "bg-black text-white" : ""
                }`}
            >
              {item.title}
            </button>
          </div>
        );
      })}
    </>
  );
};
