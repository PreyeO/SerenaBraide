// components/navbar/desktop/DesktopProfileMenu.tsx
import { useState } from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import ProfileDropdown from "@/components/ui/profile-dropdown";
import ProductImage from "@/components/ui/images/product-image";
import { useAuthStore } from "@/features/auth/auth.store";
import InitialsAvatar from "@/components/ui/InitialsAvatar";
import { User } from "lucide-react";

export const DesktopProfileMenu = () => {
  const [open, setOpen] = useState(false);
  const user = useAuthStore((state) => state.user);

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

          {user ? (
            <InitialsAvatar
              firstName={user.first_name}
              lastName={user.last_name}
              fallback={user.email}
              size="sm"
              className="cursor-pointer bg-white text-[#3B3B3B]"
            />
          ) : (
            <Avatar className="size-6 bg-[#F5F5F5] text-black font-normal text-base cursor-pointer shrink-0">
              <AvatarFallback>
                <User className="size-3.5 text-[#6F6E6C]" />
              </AvatarFallback>
            </Avatar>
          )}
        </button>
      </DropdownMenuTrigger>

      <ProfileDropdown />
    </DropdownMenu>
  );
};
