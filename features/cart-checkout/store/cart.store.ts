// features/cart-checkout/store/cart.store.ts
import { create } from "zustand";
import { CartItem } from "../type/cart.type";

interface CartState {
  items: CartItem[];
  totalQuantity: number;

  setItems: (items: CartItem[]) => void;
  addItem: (item: CartItem) => void;
  updateItem: (payload: { id: number; quantity: number }) => void;
  removeItem: (itemId: number) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartState>((set, get) => ({
  items: [],
  totalQuantity: 0,

  /**
   * Sync entire cart from backend
   * (React Query → Zustand)
   */
  setItems: (items) =>
    set({
      items,
      totalQuantity: items.reduce((sum, i) => sum + i.quantity, 0),
    }),

  /**
   * Optimistic add/update from add-to-cart
   * Backend response should replace this via setItems
   */
  addItem: (item) => {
    const existing = get().items.find((i) => i.variant.id === item.variant.id);

    const updatedItems = existing
      ? get().items.map((i) => (i.variant.id === item.variant.id ? item : i))
      : [...get().items, item];

    set({
      items: updatedItems,
      totalQuantity: updatedItems.reduce((sum, i) => sum + i.quantity, 0),
    });
  },

  /**
   * Optimistic quantity update
   */
  updateItem: ({ id, quantity }) => {
    const updatedItems = get().items.map((i) =>
      i.id === id ? { ...i, quantity } : i
    );

    set({
      items: updatedItems,
      totalQuantity: updatedItems.reduce((sum, i) => sum + i.quantity, 0),
    });
  },

  /**
   * Optimistic remove
   */
  removeItem: (itemId) => {
    const updatedItems = get().items.filter((i) => i.id !== itemId);

    set({
      items: updatedItems,
      totalQuantity: updatedItems.reduce((sum, i) => sum + i.quantity, 0),
    });
  },

  /**
   * Used on logout / checkout success
   */
  clearCart: () => set({ items: [], totalQuantity: 0 }),
}));
