// hooks/useDesktopMenu.ts
import { useState, useCallback, useEffect, RefObject } from "react";

export function useDesktopMenu(navRef: RefObject<HTMLDivElement | null>) {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  const closeMenu = useCallback(() => {
    setActiveMenu(null);
  }, []);

  const openMenu = useCallback((menu: string) => {
    setActiveMenu(menu);
  }, []);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        closeMenu();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [navRef, closeMenu]);

  return {
    activeMenu,
    openMenu,
    closeMenu,
  };
}

export default useDesktopMenu;
