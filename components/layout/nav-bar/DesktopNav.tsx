// components/navbar/desktop/DesktopNav.tsx
import { forwardRef } from "react";
import Link from "next/link";
import { Search } from "lucide-react";
import Logo from "@/components/ui/logo";
import { NavItem } from "@/types/general";
import { DesktopNavItems } from "./DesktopNavItems";
import NavCartButton from "./NavCartButton";
import { DesktopProfileMenu } from "./DesktopProfileMenu";
import { NavWishlistButton } from "./NavWhislistButton";
import dynamic from "next/dynamic";

const DesktopDropdownPanel = dynamic(
  () =>
    import("./DesktopDropdownPanel").then((mod) => mod.DesktopDropdownPanel),
  { ssr: false },
);
const DesktopSearchPanel = dynamic(
  () => import("./DesktopSearchPanel").then((mod) => mod.DesktopSearchPanel),
  { ssr: false },
);

interface DesktopNavProps {
  navItems: NavItem[];
  cartCount: number;
  wishlistCount: number;
  activeMenu: string | null;
  onMenuOpen: (menu: string) => void;
  onMenuClose: () => void;
  onWishlistClick: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}

export const DesktopNav = forwardRef<HTMLDivElement, DesktopNavProps>(
  (
    {
      navItems,
      cartCount,
      wishlistCount,
      activeMenu,
      onMenuOpen,
      onMenuClose,
      onWishlistClick,
    },
    ref,
  ) => {
    return (
      <div
        ref={ref}
        className={`hidden lg:block transition-all duration-300 pt-12.5 ${
          activeMenu ? "bg-white h-117.5" : "h-25"
        }`}
        onMouseLeave={onMenuClose}
      >
        <div className="bg-black/30 backdrop-blur-lg rounded-full h-17.5 my-4 mx-16 px-6 flex items-center justify-between">
          {/* Left - Nav Items */}
          <div className="flex items-center xl:w-136">
            <DesktopNavItems
              items={navItems}
              activeMenu={activeMenu}
              onMenuOpen={onMenuOpen}
            />
          </div>

          {/* Center - Logo */}
          <div>
            <Link href="/">
              <Logo width={100} height={40} />
            </Link>
          </div>

          {/* Right - Icons */}
          <div className="flex gap-4 items-center justify-end xl:w-136 max-w-136">
            <Search
              className="text-white size-6 cursor-pointer"
              onClick={() => onMenuOpen("SEARCH")}
            />

            <NavWishlistButton
              count={wishlistCount}
              onClick={onWishlistClick}
            />

            <div className="py-3.25 px-4.25 flex items-center gap-4.25 bg-[#3B3B3B] rounded-[50px] shrink-0 h-fit">
              <NavCartButton count={cartCount} />
              <div className="border border-[#6F6E6C99] h-5 shrink-0" />
              <DesktopProfileMenu />
            </div>
          </div>
        </div>

        {/* Dropdown Panel */}
        {activeMenu === "SEARCH" ? (
          <DesktopSearchPanel onClose={onMenuClose} />
        ) : (
          activeMenu && (
            <DesktopDropdownPanel
              activeMenu={activeMenu}
              navItems={navItems}
              onMenuClose={onMenuClose}
            />
          )
        )}
      </div>
    );
  },
);

DesktopNav.displayName = "DesktopNav";
