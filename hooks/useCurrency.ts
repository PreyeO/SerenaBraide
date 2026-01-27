import { useState } from "react";

export const useCurrency = () => {
  const [selectedCurrency, setSelectedCurrency] = useState(() => {
    // Load from localStorage if available
    if (typeof window !== "undefined") {
      return localStorage.getItem("selectedCurrency") || "USD";
    }
    return "USD";
  });

  const handleCurrencySelect = (
    currencyCode: string,
    onComplete?: () => void,
  ) => {
    setSelectedCurrency(currencyCode);
    localStorage.setItem("selectedCurrency", currencyCode);
    onComplete?.();
  };

  return {
    selectedCurrency,
    handleCurrencySelect,
  };
};
