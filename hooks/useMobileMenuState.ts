// hooks/useMobileMenuState.ts
import { useState, useCallback } from "react";

interface MenuState {
  activeItem: string | null;
  activeSection: string | null;
}

export function useMobileMenuState() {
  const [menuState, setMenuState] = useState<MenuState>({
    activeItem: null,
    activeSection: null,
  });

  const setActiveItem = useCallback((item: string | null) => {
    setMenuState((prev) => ({
      ...prev,
      activeItem: item,
      activeSection: null,
    }));
  }, []);

  const setActiveSection = useCallback((section: string | null) => {
    setMenuState((prev) => ({ ...prev, activeSection: section }));
  }, []);

  const resetMenu = useCallback(() => {
    setMenuState({ activeItem: null, activeSection: null });
  }, []);

  const goBack = useCallback(() => {
    if (menuState.activeSection) {
      setMenuState((prev) => ({ ...prev, activeSection: null }));
    } else if (menuState.activeItem) {
      setMenuState({ activeItem: null, activeSection: null });
    }
  }, [menuState.activeSection, menuState.activeItem]);

  return {
    activeItem: menuState.activeItem,
    activeSection: menuState.activeSection,
    setActiveItem,
    setActiveSection,
    resetMenu,
    goBack,
  };
}

export default useMobileMenuState;
