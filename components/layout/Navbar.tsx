"use client";

import { useState, useEffect, useRef } from "react";
import { Heart, Search, Menu, ArrowLeft, ShoppingCart, ChevronRight, X } from "lucide-react";
import SubHeading from "../ui/typography/subHeading";
import Link from "next/link";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Logo from "../ui/logo";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import ProfileDropdown from "../ui/profile-dropdown";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "../ui/dropdown-menu";
import ProductImage from "../ui/images/product-image";
import { navItems as hardcodedNavItems, currencies } from "@/constant/data";
import Image from "next/image";
import { useGetCategoriesTree } from "@/features/products/hooks/useGetCategoriesTree";
import { NavItem, NavSection } from "@/types/general";
import { CategoryTree } from "@/features/products/product.type";
import { useCart } from "@/features/cart-checkout/hooks/useCart";
import { useWishlist } from "@/features/profile/hooks/customer/useWishlist";
import { useAuthStore } from "@/features/auth/auth.store";
import { useRouter } from "next/navigation";

const NavBar = () => {
  const router = useRouter();
  const user = useAuthStore((state) => state.user);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const navRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const [selectedCurrency, setSelectedCurrency] = useState(currencies[0]);

  const [mobileActiveItem, setMobileActiveItem] = useState<string | null>(null);
  const [mobileActiveSection, setMobileActiveSection] = useState<string | null>(
    null,
  );
  const [sheetOpen, setSheetOpen] = useState(false);
  const [avatarSheetOpen, setAvatarSheetOpen] = useState(false);
  const { data } = useCart();
  const { data: wishlistData } = useWishlist();

  const totalQuantity =
    data?.items?.reduce((sum, i) => sum + i.quantity, 0) ?? 0;
  const wishlistCount = wishlistData?.count ?? 0;

  const handleWishlistClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!user) {
      e.preventDefault();
      router.push("/auth/register?return_url=/profile/wishlist");
    }
  };

  const { data: categories = [] } = useGetCategoriesTree();

  // Build dynamic category sections from the tree API
  // Each parent category becomes a column, children become items
  const categorySections: NavSection[] = categories
    .filter((cat: CategoryTree) => cat.is_active && cat.parent === null) // Only show root categories
    .map((category: CategoryTree) => {
      // Get active children for this category
      const activeChildren = (category.children || []).filter(
        (child: CategoryTree) => child.is_active,
      );

      return {
        heading: category.name,
        items: [
          // Add children as items
          ...activeChildren.map((child: CategoryTree) => ({
            name: child.name,
            href: `/categories/${category.slug}/${child.slug}`,
          })),
        ],
      };
    });

  // Merge dynamic categories with other hardcoded nav items
  const navItems: NavItem[] = [
    {
      title: "CATEGORIES",
      href: "/categories",
      sections: categorySections,
    },
    ...hardcodedNavItems.filter((item) => item.title !== "CATEGORIES"),
  ];

  const currentItem = navItems.find((item) => item.title === mobileActiveItem);
  const currentSection = currentItem?.sections.find(
    (sec) => sec.heading === mobileActiveSection,
  );

  const resetMobileMenu = () => {
    setMobileActiveItem(null);
    setMobileActiveSection(null);
    setSheetOpen(false);
  };

  // Close desktop submenu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setActiveMenu(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Close sheets on resize to desktop
  useEffect(() => {
    const handleResize = () => {
      const isDesktop = window.innerWidth >= 1024;
      if (isDesktop && sheetOpen) {
        setSheetOpen(false);
        resetMobileMenu();
      }
      if (isDesktop && avatarSheetOpen) {
        setAvatarSheetOpen(false);
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [sheetOpen, avatarSheetOpen]);

  const handleAvatarLinkClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    e.preventDefault();
    setAvatarSheetOpen(false);

    setTimeout(() => {
      router.push(href);
    }, 150);
  };

  return (
    <nav className="fixed top-12.5 left-0 right-0 z-40 font-GeneralSans">
      {/* ======= MOBILE NAV (md and below) ======= */}
      <div className="lg:hidden px-4 py-3 flex items-center justify-between bg-black/30 backdrop-blur-lg rounded-full h-17.5 mx-4 mt-4 mb-4">
        {/* Left - Menu Icon and Search in one div */}
        <div className="flex items-center gap-4 flex-1">
          <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
            <SheetTrigger className="text-white p-1">
              <Menu className="size-6" />
            </SheetTrigger>
            <SheetContent side="left" className="p-0 w-full max-w-xs z-[100] flex flex-col">
              {/* Header */}
              <button 
                onClick={() => setSheetOpen(false)}
                className="flex items-center gap-2 px-4 py-4 border-b border-gray-100 w-full text-left"
              >
                <X className="size-4 text-gray-800" />
                <span className="text-sm font-medium text-gray-800">Menu</span>
              </button>

              {/* Menu Content */}
              <div className="flex-1 overflow-y-auto">
                {mobileActiveItem && mobileActiveSection ? (
                  <div className="px-4 py-4">
                    <button
                      className="mb-4 text-sm text-gray-500 flex items-center gap-1"
                      onClick={() => setMobileActiveSection(null)}
                    >
                      <ArrowLeft className="size-4" />
                      Back to {mobileActiveItem}
                    </button>
                    <h4 className="text-xs font-medium text-gray-800 uppercase tracking-wide mb-4">
                      {mobileActiveSection}
                    </h4>
                    <ul className="space-y-1">
                      {currentSection?.items.map((link) => (
                        <li key={link.name}>
                          <Link 
                            href={link.href} 
                            onClick={resetMobileMenu}
                            className="flex items-center justify-between py-3 text-sm text-gray-700 hover:text-gray-900"
                          >
                            {link.name}
                            <ChevronRight className="size-4 text-gray-400" />
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : mobileActiveItem ? (
                  <div className="px-4 py-4">
                    <button
                      className="mb-4 text-sm text-gray-500 flex items-center gap-1"
                      onClick={() => setMobileActiveItem(null)}
                    >
                      <ArrowLeft className="size-4" />
                      Back to Menu
                    </button>
                    <h4 className="text-xs font-medium text-gray-800 uppercase tracking-wide mb-4">
                      {mobileActiveItem}
                    </h4>
                    <ul className="space-y-1">
                      {currentItem?.sections.map((section) => (
                        <li key={section.heading}>
                          <button
                            onClick={() => setMobileActiveSection(section.heading)}
                            className="flex items-center justify-between w-full py-3 text-sm text-gray-700 hover:text-gray-900"
                          >
                            {section.heading}
                            <ChevronRight className="size-4 text-gray-400" />
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : (
                  <div className="px-4 py-4">
                    {/* Main Nav Items */}
                    <ul className="space-y-1">
                      {navItems.map((item) => (
                        <li key={item.title}>
                          {item.sections.length > 0 ? (
                            <button
                              onClick={() => setMobileActiveItem(item.title)}
                              className="flex items-center justify-between w-full py-3 text-xs font-medium text-gray-800 uppercase tracking-wide hover:text-gray-900"
                            >
                              {item.title}
                              <ChevronRight className="size-4 text-gray-400" />
                            </button>
                          ) : (
                            <Link 
                              href={item.href} 
                              onClick={resetMobileMenu}
                              className="flex items-center justify-between w-full py-3 text-xs font-medium text-gray-800 uppercase tracking-wide hover:text-gray-900"
                            >
                              {item.title}
                              <ChevronRight className="size-4 text-gray-400" />
                            </Link>
                          )}
                        </li>
                      ))}
                    </ul>

                    {/* Divider */}
                    <div className="border-t border-gray-100 my-4" />

                    {/* Contact Us */}
                    <Link 
                      href="/contact" 
                      onClick={resetMobileMenu}
                      className="flex items-center justify-between w-full py-3 text-xs font-medium text-gray-800 uppercase tracking-wide hover:text-gray-900"
                    >
                      CONTACT US
                      <ChevronRight className="size-4 text-gray-400" />
                    </Link>

                    {/* Currency Selector */}
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <button className="flex items-center gap-2 py-3 text-xs font-medium text-gray-800 w-full">
                          {selectedCurrency?.src && (
                            <Image
                              src={selectedCurrency.src}
                              alt={selectedCurrency.name}
                              className="rounded-full"
                              width={18}
                              height={18}
                            />
                          )}
                          <span>{selectedCurrency.name}</span>
                        </button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="bg-white text-black cursor-pointer">
                        {currencies.map((currency) => (
                          <DropdownMenuItem
                            key={currency.name}
                            onClick={() => setSelectedCurrency(currency)}
                          >
                            <div className="flex items-center gap-2">
                              {currency.src && (
                                <Image
                                  src={currency.src}
                                  alt={currency.name}
                                  width={18}
                                  height={18}
                                  className="rounded-full"
                                />
                              )}
                              <span>{currency.name}</span>
                            </div>
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                )}
              </div>
            </SheetContent>
          </Sheet>
          <Search className="text-white size-5 cursor-pointer" />
        </div>

        {/* Center - Logo */}
        <div className="flex-1 flex justify-center">
          <Link href="/">
            <Logo width={100} height={40} />
          </Link>
        </div>

        {/* Right - Cart and Avatar */}
        <div className="flex items-center gap-3 flex-1 justify-end">
          <div className="relative">
            <Link href="/cart">
              <ShoppingCart className="text-white size-5 cursor-pointer" />
            </Link>
            {totalQuantity > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {totalQuantity}
              </span>
            )}
          </div>
          <div className="border-l border-white/20 h-6" />
          {/* Mobile Avatar Sheet */}
          <Sheet open={avatarSheetOpen} onOpenChange={setAvatarSheetOpen}>
            <SheetTrigger asChild>
              <button className="relative w-6 h-6 p-0 m-0 border-0 bg-transparent shrink-0 flex items-center justify-center">
                <Avatar className="size-6 bg-[#F5F5F5] text-black font-normal text-base cursor-pointer shrink-0">
                  <AvatarImage
                    src="https://github.com/shadcn.png"
                    alt="@shadcn"
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </button>
            </SheetTrigger>

            <SheetContent
              side="right"
              className="px-6 py-6 w-full max-w-xs top-10"
            >
              <SubHeading
                className="font-medium text-sm text-[#3B3B3B]"
                title={user ? "My Account" : "Account"}
              />

              <div className="flex flex-col mt-6">
                <ul className="space-y-4">
                  {user ? (
                    <>
                      <li className="text-sm font-normal text-[#6F6E6C] transition-colors duration-200 hover:text-[#3B3B3B]">
                        <Link
                          href="/profile"
                          onClick={(e) => handleAvatarLinkClick(e, "/profile")}
                          className="flex justify-between items-center"
                        >
                          My Account
                          <ChevronRight color="#3B3B3B" size={18} />
                        </Link>
                      </li>
                      <li className="text-sm font-normal text-[#6F6E6C] transition-colors duration-200 hover:text-[#3B3B3B]">
                        <Link
                          href="/profile/orders"
                          onClick={(e) =>
                            handleAvatarLinkClick(e, "/profile/orders")
                          }
                          className="flex justify-between items-center"
                        >
                          My Orders
                          <ChevronRight color="#3B3B3B" size={18} />
                        </Link>
                      </li>
                      <li className="text-sm font-normal text-[#6F6E6C] transition-colors duration-200 hover:text-[#3B3B3B]">
                        <Link
                          href="/profile/wishlist"
                          onClick={(e) =>
                            handleAvatarLinkClick(e, "/profile/wishlist")
                          }
                          className="flex justify-between items-center"
                        >
                          Wishlist
                          <ChevronRight color="#3B3B3B" size={18} />
                        </Link>
                      </li>
                      <li className="text-sm font-normal text-[#6F6E6C] transition-colors duration-200 hover:text-[#3B3B3B]">
                        <Link
                          href="/profile/ratings"
                          onClick={(e) =>
                            handleAvatarLinkClick(e, "/profile/ratings")
                          }
                          className="flex justify-between items-center"
                        >
                          Ratings & Reviews
                          <ChevronRight color="#3B3B3B" size={18} />
                        </Link>
                      </li>
                      <li className="text-sm font-normal text-[#6F6E6C] transition-colors duration-200 hover:text-[#3B3B3B]">
                        <div className="flex justify-between items-center">
                          <div>
                            <div className="text-sm font-medium text-[#3B3B3B]">
                              Loyalty Point
                            </div>
                            <div className="text-xs text-[#6F6E6C]">
                              You have 0 points = $0.00
                            </div>
                          </div>
                          <ChevronRight color="#3B3B3B" size={18} />
                        </div>
                      </li>
                    </>
                  ) : (
                    <>
                      <li>
                        <Link
                          href="/auth/login"
                          onClick={(e) =>
                            handleAvatarLinkClick(e, "/auth/login")
                          }
                          className="w-full bg-black text-white py-3 px-4 rounded-full text-sm font-medium text-center block"
                        >
                          Login
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/auth/register"
                          onClick={(e) =>
                            handleAvatarLinkClick(e, "/auth/register")
                          }
                          className="w-full bg-white border border-[#E5E5E5] text-black py-3 px-4 rounded-full text-sm font-medium text-center block"
                        >
                          Join Us
                        </Link>
                      </li>
                    </>
                  )}
                </ul>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {/* ======= DESKTOP NAV (lg and above) ======= */}
      <div
        ref={navRef}
        className={`hidden lg:block transition-all duration-300 pt-12.5 ${
          activeMenu ? "bg-white h-117.5" : "h-25"
        }`}
        onMouseLeave={() => setActiveMenu(null)}
      >
        <div className="bg-black/30 backdrop-blur-lg rounded-full h-17.5 my-4 mx-16 px-6 flex items-center justify-between">
          {/* Left - Nav Items */}
          <div className="flex gap-6 items-center">
            {navItems.map((item) => (
              <div key={item.title} className="relative">
                <button
                  onClick={() => setActiveMenu(item.title)}
                  className={`text-sm font-medium text-white rounded-full transition-colors duration-300 ${
                    activeMenu === item.title
                      ? "bg-black px-3 py-1 text-white"
                      : ""
                  }`}
                >
                  {item.title}
                </button>
              </div>
            ))}
          </div>

          {/* Center - Logo */}
          <div className="absolute left-1/2 -translate-x-1/2">
            <Link href="/">
              <Logo width={100} height={40} />
            </Link>
          </div>

          {/* Right - Icons */}
          <div className="flex gap-4 items-center">
            <Search className="text-white size-5 cursor-pointer" />
            <div className="relative">
              <Link href="/profile/wishlist" onClick={handleWishlistClick}>
                <Heart className="text-white size-5 cursor-pointer" />
              </Link>
              {wishlistCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </div>
            <div className="py-3.25 px-4.25 flex items-center gap-4.25 bg-[#3B3B3B] rounded-[50px] shrink-0 h-fit">
              <div className="relative shrink-0 h-5 flex items-center">
                <Link href="/cart">
                  <ShoppingCart className="text-white size-5" />
                </Link>

                {totalQuantity > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {totalQuantity}
                  </span>
                )}
              </div>
              <div className="border border-[#6F6E6C99] h-5 shrink-0" />
              <DropdownMenu onOpenChange={setOpen}>
                <DropdownMenuTrigger asChild>
                  <button className="relative w-6 h-6 p-0 m-0 border-0 bg-transparent shrink-0 flex items-center justify-center overflow-visible">
                    {open && (
                      <ProductImage
                        width={26}
                        height={18}
                        alt="pentagon-icon"
                        src="/pentagon-icon.svg"
                        className="absolute top-12 left-1/2 -translate-x-1/2 z-200 pointer-events-none"
                      />
                    )}

                    <Avatar className="size-6 bg-[#F5F5F5] text-black font-normal text-base cursor-pointer shrink-0">
                      <AvatarImage
                        src="https://github.com/shadcn.png"
                        alt="@shadcn"
                      />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                  </button>
                </DropdownMenuTrigger>

                <ProfileDropdown />
              </DropdownMenu>
            </div>
          </div>
        </div>

        {/* Dropdown Panel */}
        {activeMenu && (
          <div className="w-full px-16 pt-8 flex gap-52 h-100 bg-white transition-all duration-300">
            {navItems
              .find((item) => item.title === activeMenu)
              ?.sections.map((section) => (
                <div key={section.heading} className="min-w-37.5">
                  {section.image && (
                    <ProductImage
                      width={190}
                      height={100}
                      alt="section-image"
                      src={section.image}
                      className="mb-6"
                    />
                  )}
                  <h4 className="text-[#3B3B3B] font-medium text-base mb-2">
                    {section.heading}
                  </h4>
                  <ul className="space-y-1 text-sm font-normal">
                    {section.items.map((link) => (
                      <li key={link.name} className="mb-2.5">
                        <Link href={link.href} className="block">
                          {link.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
