// components/navbar/mobile/MobileMenuSheet.tsx
import { useCallback } from "react";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import SubHeading from "@/components/ui/typography/subHeading";
import { MobileMenuLevel } from "./MobileMenuLevel";
import { NavItem } from "@/types/general";
import { useMobileMenuState } from "@/hooks/useMobileMenuState";
import { useRouter } from "next/navigation";

interface MobileMenuSheetProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  navItems: NavItem[];
}

export const MobileMenuSheet = ({
  isOpen,
  onOpenChange,
  navItems,
}: MobileMenuSheetProps) => {
  const router = useRouter();
  const menu = useMobileMenuState();

  const currentItem = navItems.find((item) => item.title === menu.activeItem);
  const currentSection = currentItem?.sections.find(
    (sec) => sec.heading === menu.activeSection,
  );

  const handleLinkClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      e.preventDefault();
      onOpenChange(false);

      setTimeout(() => {
        router.push(href);
        setTimeout(() => {
          menu.resetMenu();
        }, 100);
      }, 150);
    },
    [onOpenChange, router, menu],
  );


  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetTrigger className="text-white">
        <Menu className="size-6" />
      </SheetTrigger>
      <SheetContent side="left" className="px-6 py-6 w-full max-w-xs top-12">
        <SubHeading
          className="font-medium text-sm text-[#3B3B3B]"
          title="Menu"
        />

        <MobileMenuLevel
          activeItem={menu.activeItem}
          activeSection={menu.activeSection}
          currentItem={currentItem}
          currentSection={currentSection}
          onItemClick={menu.setActiveItem}
          onSectionClick={menu.setActiveSection}
          onBack={menu.goBack}
          onLinkClick={handleLinkClick}
          navItems={navItems}
        />
      </SheetContent>
    </Sheet>
  );
};
