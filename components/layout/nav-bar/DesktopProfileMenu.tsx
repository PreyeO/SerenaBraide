// components/navbar/desktop/DesktopProfileMenu.tsx
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import ProfileDropdown from "@/components/ui/profile-dropdown";
import ProductImage from "@/components/ui/images/product-image";

export const DesktopProfileMenu = () => {
  const [open, setOpen] = useState(false);

  return (
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
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </button>
      </DropdownMenuTrigger>

      <ProfileDropdown />
    </DropdownMenu>
  );
};
