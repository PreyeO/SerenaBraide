import { MenuItem, SidebarItem } from "@/features/profile/type/profile.general";
import {
  BookUser,
  MessageSquareMore,
  User,
  Gift,
  Heart,
  Star,
  SlidersHorizontal,
  House,
  Users,
  ShoppingBag,
  Package,
  UserCheck,
} from "lucide-react";

export const customerRoutes: SidebarItem[] = [
  { title: "My Account", href: "/profile", icon: User },
  { title: "My Orders", href: "/profile/order", icon: Gift },
  { title: "Wishlist", href: "/profile/wishlist", icon: Heart },
  {
    title: "Shipping Address",
    href: "/profile/shipping-detail",
    icon: BookUser,
  },

  { title: "Ratings & Reviews", href: "/profile/review", icon: Star },
  {
    title: "Account Settings",
    href: "/profile/profile-setting",
    icon: SlidersHorizontal,
  },
];

export const adminRoutes: SidebarItem[] = [
  {
    title: "Home",
    href: "/admin",
    icon: House,
  },
  {
    title: "Products",
    href: "/admin/products",
    icon: Package,
  },

  {
    title: "Orders",
    href: "/admin/orders",
    icon: ShoppingBag,
  },
  {
    title: "Customers",
    href: "/admin/customers",
    icon: UserCheck,
  },
  {
    title: "Staff",
    href: "/admin/staff",
    icon: Users,
  },

  {
    title: "User Reviews",
    href: "/admin/review",
    icon: MessageSquareMore,
  },
];

export const profileRoutes: MenuItem[] = [
  {
    title: "My Account",
    href: "/profile",
  },
  {
    title: "My Orders",
    href: "/profile/order",
  },

  {
    title: "Wishlist",
    href: "/profile/wishlist",
  },
  {
    title: "Ratings & Reviews",
    href: "/profile/review",
  },
];
