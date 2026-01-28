// hooks/useSheetManager.ts
import { useState, useCallback } from "react";

export type SheetType = "menu" | "search" | "profile";

interface SheetState {
  menu: boolean;
  search: boolean;
  profile: boolean;
}

export function useSheetManager() {
  const [sheets, setSheets] = useState<SheetState>({
    menu: false,
    search: false,
    profile: false,
  });

  const openSheet = useCallback((type: SheetType) => {
    setSheets((prev) => {
      const newState = { menu: false, search: false, profile: false };
      newState[type] = true;
      return newState;
    });
  }, []);

  const closeSheet = useCallback((type: SheetType) => {
    setSheets((prev) => ({ ...prev, [type]: false }));
  }, []);

  const closeAllSheets = useCallback(() => {
    setSheets({ menu: false, search: false, profile: false });
  }, []);

  const toggleSheet = useCallback((type: SheetType) => {
    setSheets((prev) => ({ ...prev, [type]: !prev[type] }));
  }, []);

  return {
    sheets,
    openSheet,
    closeSheet,
    closeAllSheets,
    toggleSheet,
  };
}

export default useSheetManager;
