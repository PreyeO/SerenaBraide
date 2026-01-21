import { create } from "zustand";
import { GiftCardPurchaseResponse } from "./giftcard.type";

interface GiftCardState {
  selectedAmount: number | null;
  selectedDesign: string | null;
  giftCardData: GiftCardPurchaseResponse | null;
  setSelectedAmount: (amount: number | null) => void;
  setSelectedDesign: (design: string | null) => void;
  setGiftCardData: (data: GiftCardPurchaseResponse | null) => void;
  reset: () => void;
}

export const useGiftCardStore = create<GiftCardState>((set) => ({
  selectedAmount: null,
  selectedDesign: null,
  giftCardData: null,
  setSelectedAmount: (amount) => set({ selectedAmount: amount }),
  setSelectedDesign: (design) => set({ selectedDesign: design }),
  setGiftCardData: (data) => set({ giftCardData: data }),
  reset: () =>
    set({ selectedAmount: null, selectedDesign: null, giftCardData: null }),
}));
