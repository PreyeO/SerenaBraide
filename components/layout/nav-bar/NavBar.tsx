"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useNavbarCounts } from "@/hooks/useNavbarCounts";
import { useDesktopMenu } from "@/hooks/useDesktopMenu";
import { useAuthStore } from "@/features/auth/auth.store";
import { MobileNav } from "@/components/layout/nav-bar/MobileNav";
import { DesktopNav } from "@/components/layout/nav-bar/DesktopNav";
import { useNavigationData } from "@/hooks/useNavigationData";
import useSheetManager from "@/hooks/useSheetManager";

const NavBar = () => {
  const router = useRouter();
  const user = useAuthStore((state) => state.user);
  const navRef = useRef<HTMLDivElement>(null);
  const [selectedCurrency, setSelectedCurrency] = useState("USD");

  // Custom hooks - destructure to get stable function references
  const { sheets, openSheet, closeSheet, closeAllSheets } = useSheetManager();
  const navigation = useNavigationData();
  const counts = useNavbarCounts();
  const desktopMenu = useDesktopMenu(navRef);

  const handleWishlistClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>) => {
      if (!user) {
        e.preventDefault();
        router.push("/auth/register?return_url=/profile/wishlist");
      }
    },
    [user, router],
  );

  const handleCurrencySelect = useCallback(
    (currencyCode: string) => {
      setSelectedCurrency(currencyCode);
      closeAllSheets();
    },
    [closeAllSheets],
  );

  const handleSheetChange = useCallback(
    (sheet: "menu" | "search" | "profile", open: boolean) => {
      if (open) {
        openSheet(sheet);
      } else {
        closeSheet(sheet);
      }
    },
    [openSheet, closeSheet],
  );

  // Close sheets when resizing to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        closeAllSheets();
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [closeAllSheets]);

  return (
    <nav className="fixed top-0 left-0 right-0 z-40 font-GeneralSans">
      {/* Mobile Navigation */}
      <MobileNav
        navItems={navigation.mobile}
        cartCount={counts.cart}
        user={user}
        sheets={sheets}
        onSheetChange={handleSheetChange}
        selectedCurrency={selectedCurrency}
        onCurrencySelect={handleCurrencySelect}
      />

      {/* Desktop Navigation */}
      <DesktopNav
        ref={navRef}
        navItems={navigation.desktop}
        cartCount={counts.cart}
        wishlistCount={counts.wishlist}
        activeMenu={desktopMenu.activeMenu}
        onMenuOpen={desktopMenu.openMenu}
        onMenuClose={desktopMenu.closeMenu}
        onWishlistClick={handleWishlistClick}
      />
    </nav>
  );
};

export default NavBar;
