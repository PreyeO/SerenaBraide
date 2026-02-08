import { NavItem, NavSection } from "@/types/general";
import { CategoryTree } from "@/features/products/product.type";
import { navItems as hardcodedNavItems } from "@/constant/data";

export const buildCategorySections = (
  categories: CategoryTree[],
): NavSection[] => {
  return categories
    .filter((cat) => cat.is_active && cat.parent === null)
    .map((category) => {
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
};

export const buildNavItems = (categorySections: NavSection[]): NavItem[] => {
  const categoryItem: NavItem = {
    title: "CATEGORIES",
    href: "/categories",
    sections: categorySections,
  };

  const filteredHardcoded = hardcodedNavItems.filter(
    (item) => item.title !== "CATEGORIES",
  );

  return [categoryItem, ...filteredHardcoded];
};
