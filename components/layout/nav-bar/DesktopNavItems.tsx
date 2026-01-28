// components/navbar/desktop/DesktopNavItems.tsx
import { NavItem } from "@/types/general";

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
      {items.map((item) => (
        <div key={item.title} className="relative">
          <button
            onClick={() => onMenuOpen(item.title)}
            className={`text-sm font-medium text-white rounded-full transition-colors duration-300 ${
              activeMenu === item.title ? "bg-black px-3 py-1 text-white" : ""
            }`}
          >
            {item.title}
          </button>
        </div>
      ))}
    </>
  );
};
