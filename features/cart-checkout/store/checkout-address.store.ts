import { create } from "zustand";

interface CheckoutAddressState {
  /** The saved address (id as string, matching the radio value) the customer
   *  picked on checkout. Shared between the address radio group and the pay
   *  action, which PATCHes it onto the order before payment. */
  selectedAddressId: string | null;
  setSelectedAddressId: (id: string | null) => void;
}

export const useCheckoutAddressStore = create<CheckoutAddressState>((set) => ({
  selectedAddressId: null,
  setSelectedAddressId: (id) => set({ selectedAddressId: id }),
}));
