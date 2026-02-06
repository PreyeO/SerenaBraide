// components/navbar/desktop/DesktopDropdownPanel.tsx
import Link from "next/link";
import ProductImage from "@/components/ui/images/product-image";
import { NavItem } from "@/types/general";

interface DesktopDropdownPanelProps {
  activeMenu: string;
  navItems: NavItem[];
  onMenuClose: () => void;
}

export const DesktopDropdownPanel = ({
  activeMenu,
  navItems,
  onMenuClose,
}: DesktopDropdownPanelProps) => {
  const activeItem = navItems.find((item) => item.title === activeMenu);

  if (!activeItem) return null;

  return (
    <div className="w-full px-16 pt-8 flex gap-52 h-100 bg-white transition-all duration-300">
      {activeItem.sections.map((section) => (
        <div key={section.heading} className="min-w-37.5">
          {section.image && (
            <ProductImage
              width={190}
              height={100}
              alt="section-image"
              src={section.image}
              className="mb-6"
            />
          )}
          <h4 className="text-[#3B3B3B] font-medium text-base mb-2">
            {section.heading}
          </h4>
          <ul className="space-y-1 text-sm font-normal">
            {section.items.map((link) => (
              <li key={link.name} className="mb-2.5">
                <Link href={link.href} className="block" onClick={onMenuClose}>
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};
