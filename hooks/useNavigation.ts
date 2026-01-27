import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

export const useNavigation = () => {
  const router = useRouter();
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [avatarSheetOpen, setAvatarSheetOpen] = useState(false);
  const [searchSheetOpen, setSearchSheetOpen] = useState(false);
  const [mobileActiveItem, setMobileActiveItem] = useState<string | null>(null);
  const [mobileActiveSection, setMobileActiveSection] = useState<string | null>(
    null,
  );
  const navRef = useRef<HTMLDivElement>(null);

  const resetMobileMenu = () => {
    setMobileActiveItem(null);
    setMobileActiveSection(null);
  };

  const handleLinkClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    e.preventDefault();
    setSheetOpen(false);

    setTimeout(() => {
      router.push(href);
      setTimeout(() => {
        resetMobileMenu();
      }, 100);
    }, 150);
  };

  // Reset menu state when sheet is fully closed
  useEffect(() => {
    if (!sheetOpen) {
      resetMobileMenu();
    }
  }, [sheetOpen]);

  // Close sheet when resizing to desktop view
  useEffect(() => {
    const handleResize = () => {
      const isDesktop = window.innerWidth >= 1024;
      if (isDesktop && sheetOpen) {
        setSheetOpen(false);
        resetMobileMenu();
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [sheetOpen]);

  // Close desktop submenu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setActiveMenu(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return {
    activeMenu,
    setActiveMenu,
    sheetOpen,
    setSheetOpen,
    avatarSheetOpen,
    setAvatarSheetOpen,
    searchSheetOpen,
    setSearchSheetOpen,
    mobileActiveItem,
    setMobileActiveItem,
    mobileActiveSection,
    setMobileActiveSection,
    navRef,
    resetMobileMenu,
    handleLinkClick,
  };
};
