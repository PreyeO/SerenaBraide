"use client";

import { useState, useEffect, useRef } from "react";
import { Heart, ShoppingCart, Search, Menu, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { navItems } from "@/constant/data";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Logo from "../ui/logo";

const NavBar = () => {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const navRef = useRef<HTMLDivElement>(null);

  const [mobileActiveItem, setMobileActiveItem] = useState<string | null>(null);
  const [mobileActiveSection, setMobileActiveSection] = useState<string | null>(
    null
  );

  const currentItem = navItems.find((item) => item.title === mobileActiveItem);
  const currentSection = currentItem?.sections.find(
    (sec) => sec.heading === mobileActiveSection
  );

  const resetMobileMenu = () => {
    setMobileActiveItem(null);
    setMobileActiveSection(null);
  };

  // Desktop submenu close
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

  return (
    <nav className="fixed top-0 left-0 right-0 z-40 font-GeneralSans">
      {/* ======= MOBILE NAV ======= */}
      <div className="md:hidden px-4 py-2 flex items-center justify-between bg-black">
        <Sheet>
          <SheetTrigger className="text-white">
            <Menu className="size-6" />
          </SheetTrigger>
          <SheetContent side="left" className="p-4 w-full max-w-xs">
            {/* Mobile Menu: 3 Levels */}
            {mobileActiveItem && mobileActiveSection ? (
              <>
                <button
                  className="mb-4 text-sm text-gray-500 flex items-center gap-1"
                  onClick={() => setMobileActiveSection(null)}
                >
                  <ArrowLeft className="size-4" />
                  Back to {mobileActiveItem}
                </button>
                <h4 className="text-lg font-semibold mb-2">
                  {mobileActiveSection}
                </h4>
                <ul className="space-y-2">
                  {currentSection?.items.map((link) => (
                    <li key={link.name}>
                      <Link href={link.href} onClick={resetMobileMenu}>
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </>
            ) : mobileActiveItem ? (
              <>
                <button
                  className="mb-4 text-sm text-gray-500 flex items-center gap-1"
                  onClick={() => setMobileActiveItem(null)}
                >
                  <ArrowLeft className="size-4" />
                  Back to Menu
                </button>
                <h4 className="text-lg font-semibold mb-2">
                  {mobileActiveItem}
                </h4>
                <ul className="space-y-3">
                  {currentItem?.sections.map((section) => (
                    <li key={section.heading}>
                      <button
                        onClick={() => setMobileActiveSection(section.heading)}
                        className="text-left w-full"
                      >
                        {section.heading}
                      </button>
                    </li>
                  ))}
                </ul>
              </>
            ) : (
              <ul className="space-y-3">
                {navItems.map((item) => (
                  <li key={item.title}>
                    {item.sections.length > 0 ? (
                      <button
                        onClick={() => setMobileActiveItem(item.title)}
                        className="text-left w-full"
                      >
                        {item.title}
                      </button>
                    ) : (
                      <Link href={item.href} onClick={resetMobileMenu}>
                        {item.title}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </SheetContent>
        </Sheet>

        <Link href="/">
          <Logo width={100} height={40} />
        </Link>
        <div className="flex gap-4">
          <Search className="text-white size-5" />
          <Heart className="text-white size-5" />
          <ShoppingCart className="text-white size-5" />
        </div>
      </div>

      {/* ======= DESKTOP NAV ======= */}
      <div
        ref={navRef}
        className={`hidden md:block transition-all duration-300 pt-[50px] ${
          activeMenu ? "bg-white h-[470px]" : "h-[100px]"
        }`}
        onMouseLeave={() => setActiveMenu(null)}
      >
        <div className="bg-black/30 backdrop-blur-lg rounded-full h-[70px] my-4 mx-16 px-6 flex items-center justify-between">
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
              {" "}
              <Logo width={100} height={40} />
            </Link>
          </div>

          {/* Right - Icons */}
          <div className="flex gap-4 items-center">
            <Search className="text-white size-5 cursor-pointer" />
            <Heart className="text-white size-5 cursor-pointer" />
            <ShoppingCart className="text-white size-5 cursor-pointer" />
          </div>
        </div>

        {/* Dropdown Panel */}
        {activeMenu && (
          <div className="w-full px-16 pt-8 flex gap-[100px] h-[400px] bg-white transition-all duration-300">
            {navItems
              .find((item) => item.title === activeMenu)
              ?.sections.map((section) => (
                <div key={section.heading} className="min-w-[150px]">
                  <h4 className="text-[#3B3B3B] font-medium text-base mb-2">
                    {section.heading}
                  </h4>
                  <ul className="space-y-1 text-sm font-normal">
                    {section.items.map((link) => (
                      <li key={link.name} className="mb-[10px]">
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
