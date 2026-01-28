import { contactSchema } from "@/lib/schemas/schema";
import z from "zod";

export type FooterItem =
  | { name: string; href: string }
  | { name: string; src: string; width: number };

export type FooterSection = {
  heading: string;
  items: FooterItem[];
};

export type NavSection = {
  heading: string;
  image?: string; // optional
  items: { name: string; href: string; icon?: string }[];
};

export type NavItem = {
  title: string;
  href: string;
  sections: NavSection[];
};
export type ContactFormValues = z.infer<typeof contactSchema>;

export interface NavigationState {
  activeMenu: string | null;
  setActiveMenu: (menu: string | null) => void;
  sheetOpen: boolean;
  setSheetOpen: (open: boolean) => void;
  // ... other navigation state
}

export interface CurrencyState {
  selectedCurrency: string;
  handleCurrencySelect: (currency: string, onComplete?: () => void) => void;
}
// types/user.ts

export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  // ... whatever your auth store returns
}
