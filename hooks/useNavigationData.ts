// hooks/useNavigationData.ts
import { useMemo } from "react";
import { useGetCategoriesTree } from "@/features/products/hooks/useGetCategoriesTree";
import { CategoryTree } from "@/features/products/product.type";
import { NavItem, NavSection } from "@/types/general";
import { navItems as hardcodedNavItems } from "@/constant/data";

export function useNavigationData() {
  const { data: categories = [] } = useGetCategoriesTree();

  const navigationData = useMemo(() => {
    // Build category sections
    const categorySections: NavSection[] = categories
      .filter((cat: CategoryTree) => cat.is_active && cat.parent === null)
      .map((category: CategoryTree) => {
        const activeChildren = (category.children || []).filter(
          (child: CategoryTree) => child.is_active,
        );

        return {
          heading: category.name,
          items: activeChildren.map((child: CategoryTree) => ({
            name: child.name,
            href: `/categories/${category.slug}/${child.slug}`,
          })),
        };
      });

    // Build desktop nav items
    const desktopNavItems: NavItem[] = hardcodedNavItems.map((item) => {
      if (item.title === "CATEGORIES") {
        return {
          ...item,
          sections: categorySections,
        };
      }
      return item;
    });

    // Build mobile nav items
    const mobileNavItems: NavItem[] = hardcodedNavItems.map((item) => {
      if (item.title === "CATEGORIES") {
        return {
          ...item,
          sections: categorySections,
        };
      }
      return item;
    });

    return {
      desktop: desktopNavItems,
      mobile: mobileNavItems,
      categorySections,
    };
  }, [categories]);

  return navigationData;
}

// Also export as default for compatibility
export default useNavigationData;
