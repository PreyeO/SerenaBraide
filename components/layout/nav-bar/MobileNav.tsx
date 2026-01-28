// components/navbar/mobile/MobileNav.tsx
import { useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Logo from "@/components/ui/logo";
import { MobileMenuSheet } from "./MobileMenuSheet";
import { MobileSearchSheet } from "./MobileSearchSheet";
import { MobileProfileSheet } from "./MobileProfileSheet";
import { NavItem } from "@/types/general";
import NavCartButton from "./NavCartButton";

interface MobileNavProps {
  navItems: NavItem[];
  cartCount: number;
  user: unknown;
  sheets: {
    menu: boolean;
    search: boolean;
    profile: boolean;
  };
  onSheetChange: (sheet: "menu" | "search" | "profile", open: boolean) => void;
  selectedCurrency: string;
  onCurrencySelect: (currency: string) => void;
}

export const MobileNav = ({
  navItems,
  cartCount,
  user,
  sheets,
  onSheetChange,
  selectedCurrency,
  onCurrencySelect,
}: MobileNavProps) => {
  const router = useRouter();

  const handleLinkClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      e.preventDefault();
      onSheetChange("profile", false);

      setTimeout(() => {
        router.push(href);
      }, 150);
    },
    [onSheetChange, router],
  );

  const handleLogin = useCallback(() => {
    onSheetChange("profile", false);
    router.push("/auth/login");
  }, [onSheetChange, router]);

  const handleRegister = useCallback(() => {
    onSheetChange("profile", false);
    router.push("/auth/register");
  }, [onSheetChange, router]);

  return (
    <div className="lg:hidden mx-6 mt-17 px-3.25 py-2 flex items-center justify-between bg-black/30 backdrop-blur-lg rounded-full">
      <div className="flex gap-2.5 items-center">
        <MobileMenuSheet
          isOpen={sheets.menu}
          onOpenChange={(open) => onSheetChange("menu", open)}
          navItems={navItems}
          selectedCurrency={selectedCurrency}
          onCurrencySelect={onCurrencySelect}
        />

        <MobileSearchSheet
          isOpen={sheets.search}
          onOpenChange={(open) => onSheetChange("search", open)}
        />
      </div>

      <Link href="/">
        <Logo width={80.69} height={30} />
      </Link>

      <div className="flex gap-2.5">
        <NavCartButton count={cartCount} />

        <MobileProfileSheet
          isOpen={sheets.profile}
          onOpenChange={(open) => onSheetChange("profile", open)}
          user={user}
          onLinkClick={handleLinkClick}
          onLogin={handleLogin}
          onRegister={handleRegister}
        />
      </div>
    </div>
  );
};
