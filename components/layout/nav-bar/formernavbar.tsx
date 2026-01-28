// "use client";

// import { useState, useEffect, useRef } from "react";
// import {
//   Heart,
//   Search,
//   Menu,
//   ShoppingCart,
//   ChevronRight,
//   ChevronLeft,
// } from "lucide-react";
// import Link from "next/link";
// import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
// import Logo from "../../ui/logo";
// import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";
// import ProfileDropdown from "../../ui/profile-dropdown";
// import { DropdownMenu, DropdownMenuTrigger } from "../../ui/dropdown-menu";
// import ProductImage from "../../ui/images/product-image";
// import {
//   currencyNavItem,
//   dummySearchItems,
//   navItems as hardcodedNavItems,
// } from "@/constant/data";
// import { useGetCategoriesTree } from "@/features/products/hooks/useGetCategoriesTree";
// import { NavItem, NavSection } from "@/types/general";
// import { CategoryTree } from "@/features/products/product.type";
// import { useCart } from "@/features/cart-checkout/hooks/useCart";
// import { useWishlist } from "@/features/profile/hooks/customer/useWishlist";
// import { useAuthStore } from "@/features/auth/auth.store";
// import { useRouter } from "next/navigation";
// import SubHeading from "../../ui/typography/subHeading";
// import { Input } from "../../ui/input";

// const NavBar = () => {
//   const router = useRouter();
//   const user = useAuthStore((state) => state.user);
//   const [activeMenu, setActiveMenu] = useState<string | null>(null);
//   const navRef = useRef<HTMLDivElement>(null);
//   const [open, setOpen] = useState(false);
//   const [sheetOpen, setSheetOpen] = useState(false);
//   const [avatarSheetOpen, setAvatarSheetOpen] = useState(false);
//   const [searchSheetOpen, setSearchSheetOpen] = useState(false);
//   const [selectedCurrency, setSelectedCurrency] = useState("USD");

//   const [mobileActiveItem, setMobileActiveItem] = useState<string | null>(null);
//   const [mobileActiveSection, setMobileActiveSection] = useState<string | null>(
//     null,
//   );
//   const { data } = useCart();
//   const { data: wishlistData } = useWishlist();

//   const totalQuantity =
//     data?.items?.reduce((sum, i) => sum + i.quantity, 0) ?? 0;
//   const wishlistCount = wishlistData?.count ?? 0;

//   const handleWishlistClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
//     if (!user) {
//       e.preventDefault();
//       router.push("/auth/register?return_url=/profile/wishlist");
//     }
//   };
//   const handleCurrencySelect = (currencyCode: string) => {
//     setSelectedCurrency(currencyCode);
//     setSheetOpen(false);
//     resetMobileMenu();
//     // You can also save to localStorage or a global state here
//     // localStorage.setItem('selectedCurrency', currencyCode);
//   };

//   const { data: categories = [] } = useGetCategoriesTree();

//   // Build dynamic category sections from the tree API
//   // Each parent category becomes a column, children become items
//   const categorySections: NavSection[] = categories
//     .filter((cat: CategoryTree) => cat.is_active && cat.parent === null) // Only show root categories
//     .map((category: CategoryTree) => {
//       // Get active children for this category
//       const activeChildren = (category.children || []).filter(
//         (child: CategoryTree) => child.is_active,
//       );

//       return {
//         heading: category.name,
//         items: [
//           // Add children as items
//           ...activeChildren.map((child: CategoryTree) => ({
//             name: child.name,
//             href: `/categories/${category.slug}/${child.slug}`,
//           })),
//         ],
//       };
//     });

//   // Merge dynamic categories with other hardcoded nav items
//   // DESKTOP: Exclude currency from nav items
//   const desktopNavItems: NavItem[] = [
//     {
//       title: "CATEGORIES",
//       href: "/categories",
//       sections: categorySections,
//     },
//     ...hardcodedNavItems.filter((item) => item.title !== "CATEGORIES"),
//   ];

//   // MOBILE: Include currency in nav items (but without sections since we handle it separately)
//   const mobileNavItems: NavItem[] = [
//     {
//       title: "CATEGORIES",
//       href: "/categories",
//       sections: categorySections,
//     },
//     ...hardcodedNavItems.filter((item) => item.title !== "CATEGORIES"),
//   ];

//   const currentItem = mobileNavItems.find(
//     (item) => item.title === mobileActiveItem,
//   );
//   const currentSection = currentItem?.sections.find(
//     (sec) => sec.heading === mobileActiveSection,
//   );

//   const resetMobileMenu = () => {
//     setMobileActiveItem(null);
//     setMobileActiveSection(null);
//   };

//   const handleLinkClick = (
//     e: React.MouseEvent<HTMLAnchorElement>,
//     href: string,
//   ) => {
//     e.preventDefault();
//     // Close sheet first
//     setSheetOpen(false);

//     // Navigate after sheet starts closing
//     setTimeout(() => {
//       router.push(href);
//       // Reset menu state after navigation
//       setTimeout(() => {
//         resetMobileMenu();
//       }, 100);
//     }, 150);
//   };

//   // Reset menu state when sheet is fully closed
//   useEffect(() => {
//     if (!sheetOpen) {
//       resetMobileMenu();
//     }
//   }, [sheetOpen]);

//   // Close sheet when resizing to desktop view
//   useEffect(() => {
//     const handleResize = () => {
//       const isDesktop = window.innerWidth >= 1024; // lg breakpoint
//       if (isDesktop && sheetOpen) {
//         setSheetOpen(false);
//         resetMobileMenu();
//       }
//     };

//     // Check on mount
//     handleResize();

//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, [sheetOpen]);

//   // Close desktop submenu when clicking outside
//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       if (navRef.current && !navRef.current.contains(event.target as Node)) {
//         setActiveMenu(null);
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, []);

//   return (
//     <nav className="fixed top-0 left-0 right-0 z-40 font-GeneralSans">
//       {/* ======= MOBILE NAV ======= */}
//       <div className="lg:hidden  mx-6 mt-15 px-3.25 py-2 flex items-center justify-between bg-black/30 backdrop-blur-lg rounded-full ">
//         <div className="flex gap-2.5 items-center">
//           <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
//             <SheetTrigger className="text-white">
//               <Menu className="size-6" />
//             </SheetTrigger>
//             <SheetContent
//               side="left"
//               className="px-6 py-6 w-full max-w-xs top-12"
//             >
//               <SubHeading
//                 className=" font-medium text-sm text-[#3B3B3B]"
//                 title="Menu"
//               />

//               <div className="relative overflow-hidden">
//                 {/* Main Menu Level */}
//                 <div
//                   className={`transition-all duration-300 ease-in-out ${
//                     mobileActiveItem
//                       ? "opacity-0 -translate-x-full absolute inset-0"
//                       : "opacity-100 translate-x-0"
//                   }`}
//                 >
//                   <div className="flex flex-col">
//                     <ul className="space-y-3 my-6">
//                       {mobileNavItems.map((item) => (
//                         <li
//                           key={item.title}
//                           className="text-sm font-normal text-[#6F6E6C] transition-colors duration-200 hover:text-[#3B3B3B]"
//                         >
//                           {item.sections.length > 0 ? (
//                             <button
//                               onClick={() => setMobileActiveItem(item.title)}
//                               className="text-left w-full flex justify-between items-center"
//                             >
//                               {item.title}
//                               <ChevronRight color="#3B3B3B" size={18} />
//                             </button>
//                           ) : (
//                             <Link
//                               href={item.href}
//                               onClick={(e) => handleLinkClick(e, item.href)}
//                               className="flex justify-between items-center"
//                             >
//                               {item.title}
//                               <ChevronRight color="#3B3B3B" size={18} />
//                             </Link>
//                           )}
//                         </li>
//                       ))}
//                     </ul>
//                     <div className="border border-[#F0F0F0] w-full shrink-0 my-6" />
//                     <ul className="flex flex-col text-sm font-normal text-[#6F6E6C] space-y-3">
//                       <li className="flex justify-between w-full items-center transition-colors duration-200 hover:text-[#3B3B3B] cursor-pointer">
//                         <Link
//                           href="/contact-us"
//                           onClick={(e) => handleLinkClick(e, "/contact-us")}
//                           className="flex justify-between items-center w-full"
//                         >
//                           CONTACT US
//                           <ChevronRight color="#3B3B3B" size={18} />
//                         </Link>
//                       </li>
//                       <li className="flex justify-between w-full items-center transition-colors duration-200 hover:text-[#3B3B3B] cursor-pointer">
//                         <button
//                           onClick={() => setMobileActiveItem("CURRENCY")}
//                           className="text-left w-full flex justify-between items-center"
//                         >
//                           <span className="flex items-center gap-2">
//                             CURRENCY
//                             <span className="text-xs text-[#3B3B3B]">
//                               ({selectedCurrency})
//                             </span>
//                           </span>
//                           <ChevronRight color="#3B3B3B" size={18} />
//                         </button>
//                       </li>
//                     </ul>
//                   </div>
//                 </div>

//                 {/* Section Menu Level */}
//                 <div
//                   className={`transition-all duration-300 ease-in-out ${
//                     mobileActiveItem && !mobileActiveSection
//                       ? "opacity-100 translate-x-0"
//                       : "opacity-0 translate-x-full absolute inset-0"
//                   }`}
//                 >
//                   {mobileActiveItem && !mobileActiveSection && (
//                     <>
//                       <button
//                         className="mb-4 text-sm text-gray-500 flex items-center gap-1.25 transition-colors duration-200 hover:text-[#3B3B3B]"
//                         onClick={() => setMobileActiveItem(null)}
//                       >
//                         <ChevronLeft className="size-6" />
//                         <h2 className="text-sm font-medium text-[#3B3B3B]">
//                           {mobileActiveItem}
//                         </h2>
//                       </button>

//                       {/* Currency Selection (no sections, direct list) */}
//                       {mobileActiveItem === "CURRENCY" ? (
//                         <ul className="space-y-3 my-6">
//                           {currencyNavItem.sections[0]?.items.map(
//                             (currency) => (
//                               <li
//                                 key={currency.name}
//                                 className="text-sm font-normal text-[#6F6E6C] transition-colors duration-200 hover:text-[#3B3B3B]"
//                               >
//                                 <button
//                                   onClick={() =>
//                                     handleCurrencySelect(currency.name)
//                                   }
//                                   className="flex items-center gap-3 w-full"
//                                 >
//                                   {currency.icon && (
//                                     <ProductImage
//                                       src={currency.icon}
//                                       width={24}
//                                       height={16}
//                                       alt={currency.name}
//                                       className="rounded"
//                                     />
//                                   )}
//                                   <span className="flex-1 text-left">
//                                     {currency.name}
//                                   </span>
//                                   {selectedCurrency === currency.name && (
//                                     <span className="text-green-600">✓</span>
//                                   )}
//                                 </button>
//                               </li>
//                             ),
//                           )}
//                         </ul>
//                       ) : (
//                         <ul className="space-y-3">
//                           {currentItem?.sections.map((section) => (
//                             <li
//                               key={section.heading}
//                               className="text-sm font-normal text-[#6F6E6C] transition-colors duration-200 hover:text-[#3B3B3B]"
//                             >
//                               <button
//                                 onClick={() =>
//                                   setMobileActiveSection(section.heading)
//                                 }
//                                 className="text-left w-full flex justify-between items-center"
//                               >
//                                 {section.heading}
//                                 <ChevronRight color="#3B3B3B" size={18} />
//                               </button>
//                             </li>
//                           ))}
//                         </ul>
//                       )}
//                     </>
//                   )}
//                 </div>

//                 {/* Item Menu Level */}
//                 <div
//                   className={`transition-all duration-300 ease-in-out ${
//                     mobileActiveSection
//                       ? "opacity-100 translate-x-0"
//                       : "opacity-0 translate-x-full absolute inset-0"
//                   }`}
//                 >
//                   {mobileActiveSection && (
//                     <>
//                       <button
//                         className="mb-4 text-sm text-gray-500 flex items-center gap-1.25 transition-colors duration-200 hover:text-[#3B3B3B]"
//                         onClick={() => setMobileActiveSection(null)}
//                       >
//                         <ChevronLeft className="size-6" />
//                         <h2 className="text-sm font-medium text-[#3B3B3B]">
//                           {mobileActiveSection}
//                         </h2>
//                       </button>

//                       <ul className="space-y-2 my-6">
//                         {currentSection?.items.map((link) => (
//                           <li
//                             key={link.name}
//                             className="text-sm font-normal text-[#6F6E6C] transition-colors duration-200 hover:text-[#3B3B3B]"
//                           >
//                             <Link
//                               href={link.href}
//                               onClick={(e) => handleLinkClick(e, link.href)}
//                               className="flex justify-between items-center"
//                             >
//                               {link.name}
//                               <ChevronRight color="#3B3B3B" size={18} />
//                             </Link>
//                           </li>
//                         ))}
//                       </ul>
//                     </>
//                   )}
//                 </div>
//               </div>
//             </SheetContent>
//           </Sheet>

//           {/* ✅ SEARCH SHEET */}
//           <Sheet open={searchSheetOpen} onOpenChange={setSearchSheetOpen}>
//             <SheetTrigger asChild>
//               <button className="text-white">
//                 <Search className="size-6" />
//               </button>
//             </SheetTrigger>

//             <SheetContent
//               side="left"
//               className=" py-6 w-full max-w-xs top-12"
//               showClose={false}
//             >
//               {/* Search input */}
//               <div className="flex items-center gap-2 mb-6 bg-[#F5F5F5] py-4.5 px-6">
//                 <ChevronLeft
//                   className="cursor-pointer"
//                   onClick={() => setSearchSheetOpen(false)}
//                 />
//                 <Input
//                   placeholder="What are you looking for"
//                   className="w-full border rounded-full px-4 py-4 text-sm outline-none"
//                 />
//               </div>

//               {/* Recently searched */}
//               <div className="mb-6 px-6">
//                 <SubHeading
//                   className="text-base text-[#6F6E6C] font-normal mb-6"
//                   title="RECENTLY SEARCHED"
//                 />
//                 <ul className="flex flex-col gap-4">
//                   {dummySearchItems.map((item, idx) => (
//                     <li
//                       key={idx}
//                       className="flex gap-3 items-center text-[#363438] text-sm font-normal"
//                     >
//                       <ProductImage
//                         src={item.image}
//                         width={41}
//                         height={41}
//                         alt={item.name}
//                         className="rounded"
//                       />
//                       <div className="flex flex-col gap-0.75">
//                         {item.name}
//                         <span className="text-[#6F6E6C] text-xs">
//                           {item.price}
//                         </span>
//                       </div>
//                     </li>
//                   ))}
//                 </ul>
//               </div>

//               {/* Trending */}
//               <div className="px-6">
//                 <SubHeading
//                   className=" text-[#6F6E6C] text-base font-normal mb-6"
//                   title="TRENDING NOW"
//                 />
//                 <ul className="space-y-4">
//                   {dummySearchItems.map((item, idx) => (
//                     <li
//                       key={idx}
//                       className="flex gap-3 items-center text-[#363438] text-sm font-normal"
//                     >
//                       <ProductImage
//                         src={item.image}
//                         width={48}
//                         height={48}
//                         alt={item.name}
//                         className="rounded"
//                       />
//                       <div className="flex flex-col gap-0.75">
//                         {item.name}
//                         <span className="text-[#6F6E6C] text-xs">
//                           {item.price}
//                         </span>
//                       </div>
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             </SheetContent>
//           </Sheet>
//         </div>

//         <Link href="/">
//           <Logo width={80.69} height={30} />
//         </Link>
//         <div className="flex gap-2.5">
//           <div className="relative">
//             <Link href="/cart">
//               <ShoppingCart className="text-white size-5" />
//             </Link>

//             {totalQuantity > 0 && (
//               <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
//                 {totalQuantity}
//               </span>
//             )}
//           </div>

//           {/* ✅ MOBILE AVATAR SHEET (REPLACES DROPDOWN ONLY ON MOBILE) */}
//           <Sheet open={avatarSheetOpen} onOpenChange={setAvatarSheetOpen}>
//             <SheetTrigger asChild>
//               <button className="relative w-6 h-6 p-0 m-0 bg-transparent">
//                 <Avatar className="size-6 bg-[#F5F5F5]">
//                   <AvatarImage src="https://github.com/shadcn.png" />
//                   <AvatarFallback>CN</AvatarFallback>
//                 </Avatar>
//               </button>
//             </SheetTrigger>

//             <SheetContent
//               side="left"
//               className="px-6 py-6 w-full max-w-xs top-12"
//             >
//               <ul className="space-y-4 my-6 text-sm text-[#3B3B3B] font-normal">
//                 <li>
//                   <Link
//                     href="/profile"
//                     onClick={(e) => handleLinkClick(e, "/profile")}
//                   >
//                     My Account
//                   </Link>
//                 </li>
//                 <div className="border border-[#F0F0F0] w-full shrink-0 my-2.5" />
//                 <li>
//                   <Link
//                     href="/profile/orders"
//                     onClick={(e) => handleLinkClick(e, "/profile/orders")}
//                   >
//                     My Orders
//                   </Link>
//                 </li>
//                 <div className="border border-[#F0F0F0] w-full shrink-0 my-2.5" />
//                 <li>
//                   <Link
//                     href="/profile/wishlist"
//                     onClick={(e) => handleLinkClick(e, "/profile/wishlist")}
//                   >
//                     Wishlist
//                   </Link>
//                 </li>
//                 <div className="border border-[#F0F0F0] w-full shrink-0 my-2.5" />
//                 <li>Ratings & Reviews</li>
//               </ul>

//               <div className="bg-[#F5F5F5] p-3 rounded-lg text-sm mb-6">
//                 <p className="font-medium text-[#3B3B3B]">Loyalty Point</p>
//                 <p className="text-xs text-[#6F6E6C]">
//                   You have 0 points = $0.00
//                 </p>
//               </div>

//               {!user && (
//                 <div className="space-y-3">
//                   <button
//                     onClick={() => router.push("/auth/login")}
//                     className="w-full bg-[#3B3B3B] text-white py-2 rounded-full"
//                   >
//                     Login
//                   </button>
//                   <button
//                     onClick={() => router.push("/auth/register")}
//                     className="w-full border border-[#3B3B3B] py-2 rounded-full"
//                   >
//                     Join Us
//                   </button>
//                 </div>
//               )}
//             </SheetContent>
//           </Sheet>
//         </div>
//       </div>

//       {/* ======= DESKTOP NAV ======= */}
//       <div
//         ref={navRef}
//         className={`hidden lg:block transition-all duration-300 pt-12.5 ${
//           activeMenu ? "bg-white h-117.5" : "h-25"
//         }`}
//         onMouseLeave={() => setActiveMenu(null)}
//       >
//         <div className="bg-black/30 backdrop-blur-lg rounded-full h-17.5 my-4 mx-16 px-6 flex items-center justify-between">
//           {/* Left - Nav Items */}
//           <div className="flex gap-6 items-center xl:w-136 ">
//             {desktopNavItems.map((item) => (
//               <div key={item.title} className="relative">
//                 <button
//                   onClick={() => setActiveMenu(item.title)}
//                   className={`text-sm font-medium text-white rounded-full transition-colors duration-300 ${
//                     activeMenu === item.title
//                       ? "bg-black px-3 py-1 text-white"
//                       : ""
//                   }`}
//                 >
//                   {item.title}
//                 </button>
//               </div>
//             ))}
//           </div>

//           {/* Center - Logo */}
//           <div className="">
//             <Link href="/">
//               <Logo width={100} height={40} />
//             </Link>
//           </div>

//           {/* Right - Icons */}
//           <div className="flex gap-4 items-center justify-end xl:w-136 max-w-136 ">
//             <Search className="text-white size-6 cursor-pointer" />
//             <div className="relative">
//               <Link href="/profile/wishlist" onClick={handleWishlistClick}>
//                 <Heart className="text-white size-5 cursor-pointer" />
//               </Link>
//               {wishlistCount > 0 && (
//                 <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
//                   {wishlistCount}
//                 </span>
//               )}
//             </div>
//             <div className="py-3.25 px-4.25 flex items-center gap-4.25 bg-[#3B3B3B] rounded-[50px] shrink-0 h-fit">
//               <div className="relative shrink-0 h-5 flex items-center">
//                 <Link href="/cart">
//                   <ShoppingCart className="text-white size-5" />
//                 </Link>

//                 {totalQuantity > 0 && (
//                   <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
//                     {totalQuantity}
//                   </span>
//                 )}
//               </div>
//               <div className="border border-[#6F6E6C99] h-5 shrink-0" />
//               <DropdownMenu onOpenChange={setOpen}>
//                 <DropdownMenuTrigger asChild>
//                   <button className="relative w-6 h-6 p-0 m-0 border-0 bg-transparent shrink-0 flex items-center justify-center overflow-visible">
//                     {open && (
//                       <ProductImage
//                         width={26}
//                         height={18}
//                         alt="pentagon-icon"
//                         src="/pentagon-icon.svg"
//                         className="absolute top-12 left-1/2 -translate-x-1/2 z-200 pointer-events-none"
//                       />
//                     )}

//                     <Avatar className="size-6 bg-[#F5F5F5] text-black font-normal text-base cursor-pointer shrink-0">
//                       <AvatarImage
//                         src="https://github.com/shadcn.png"
//                         alt="@shadcn"
//                       />
//                       <AvatarFallback>CN</AvatarFallback>
//                     </Avatar>
//                   </button>
//                 </DropdownMenuTrigger>

//                 <ProfileDropdown />
//               </DropdownMenu>
//             </div>
//           </div>
//         </div>

//         {/* Dropdown Panel */}
//         {activeMenu && (
//           <div className="w-full px-16 pt-8 flex gap-52 h-100 bg-white transition-all duration-300">
//             {desktopNavItems
//               .find((item) => item.title === activeMenu)
//               ?.sections.map((section) => (
//                 <div key={section.heading} className="min-w-37.5">
//                   {section.image && (
//                     <ProductImage
//                       width={190}
//                       height={100}
//                       alt="section-image"
//                       src={section.image}
//                       className="mb-6"
//                     />
//                   )}
//                   <h4 className="text-[#3B3B3B] font-medium text-base mb-2">
//                     {section.heading}
//                   </h4>
//                   <ul className="space-y-1 text-sm font-normal">
//                     {section.items.map((link) => (
//                       <li key={link.name} className="mb-2.5">
//                         <Link href={link.href} className="block">
//                           {link.name}
//                         </Link>
//                       </li>
//                     ))}
//                   </ul>
//                 </div>
//               ))}
//           </div>
//         )}
//       </div>
//     </nav>
//   );
// };

// export default NavBar;
