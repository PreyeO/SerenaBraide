import { create } from "zustand";
import { persist } from "zustand/middleware";
import { User, UserTokens } from "@/features/auth/auth.type";

interface AuthState {
  user: User | null;
  tokens: UserTokens | null;
  isHydrated: boolean;
  setAuth: (data: { user: User; tokens: UserTokens }) => void;
  clearAuth: () => void;
  setHydrated: (state: boolean) => void;
  isTokenExpired: () => boolean;
  getRole: () => "admin" | "customer" | null;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      tokens: null,
      isHydrated: false,

      setAuth: (data) => set({ user: data.user, tokens: data.tokens }),
      clearAuth: () => set({ user: null, tokens: null }),
      setHydrated: (state) => set({ isHydrated: state }),

      isTokenExpired: () => {
        const tokens = get().tokens;
        if (!tokens) return true;

        try {
          const [, payloadBase64] = tokens.access.split(".");
          const payload = JSON.parse(atob(payloadBase64));
          return Date.now() >= payload.exp * 1000;
        } catch {
          return true;
        }
      },

      getRole: () => {
        const user = get().user;
        if (!user) return null;
        if (user.is_superuser || user.is_admin) return "admin";
        if (user.is_customer) return "customer";
        return null;
      },
    }),

    {
      name: "auth-storage",
      partialize: (state) => ({
        user: state.user,
        tokens: state.tokens,
      }),
      onRehydrateStorage: () => (state) => {
        state?.setHydrated(true);
      },
    }
  )
);
