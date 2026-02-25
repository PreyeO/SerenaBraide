// components/navbar/mobile/MobileProfileSheet.tsx
import Link from "next/link";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { LogOut, User as UserIcon } from "lucide-react";
import { useAuthStore } from "@/features/auth/auth.store";
import InitialsAvatar from "@/components/ui/InitialsAvatar";

interface MobileProfileSheetProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  user: unknown;
  onLinkClick: (e: React.MouseEvent<HTMLAnchorElement>, href: string) => void;
  onLogin: () => void;
  onRegister: () => void;
  onLogout: () => void;
  isLoggingOut?: boolean;
}

export const MobileProfileSheet = ({
  isOpen,
  onOpenChange,
  user,
  onLinkClick,
  onLogin,
  onRegister,
  onLogout,
  isLoggingOut = false,
}: MobileProfileSheetProps) => {
  const authUser = useAuthStore((state) => state.user);

  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetTrigger asChild>
        <button className="relative w-6 h-6 p-0 m-0 bg-transparent">
          {authUser ? (
            <InitialsAvatar
              firstName={authUser.first_name}
              lastName={authUser.last_name}
              fallback={authUser.email}
              size="sm"
              className="cursor-pointer bg-white text-[#3B3B3B]"
            />
          ) : (
            <Avatar className="size-6 bg-[#F5F5F5]">
              <AvatarFallback>
                <UserIcon className="size-3.5 text-[#6F6E6C]" />
              </AvatarFallback>
            </Avatar>
          )}
        </button>
      </SheetTrigger>

      <SheetContent side="left" className="px-6 py-6 w-full max-w-xs top-12">
        <ul className="space-y-4 my-6 text-sm text-[#3B3B3B] font-normal">
          <li>
            <Link href="/profile" onClick={(e) => onLinkClick(e, "/profile")}>
              My Account
            </Link>
          </li>
          <div className="border border-[#F0F0F0] w-full shrink-0 my-2.5" />
          <li>
            <Link
              href="/profile/orders"
              onClick={(e) => onLinkClick(e, "/profile/orders")}
            >
              My Orders
            </Link>
          </li>
          <div className="border border-[#F0F0F0] w-full shrink-0 my-2.5" />
          <li>
            <Link
              href="/profile/wishlist"
              onClick={(e) => onLinkClick(e, "/profile/wishlist")}
            >
              Wishlist
            </Link>
          </li>
          <div className="border border-[#F0F0F0] w-full shrink-0 my-2.5" />
          <li>Ratings & Reviews</li>
        </ul>

        {user ? (
          <button
            onClick={onLogout}
            disabled={isLoggingOut}
            className="w-full bg-[#3B3B3B] text-white py-2 rounded-full disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            <LogOut className="size-4" />
            {isLoggingOut ? "Logging out..." : "Logout"}
          </button>
        ) : (
          <div className="space-y-3">
            <button
              onClick={onLogin}
              className="w-full bg-[#3B3B3B] text-white py-2 rounded-full"
            >
              Login
            </button>
            <button
              onClick={onRegister}
              className="w-full border border-[#3B3B3B] py-2 rounded-full"
            >
              Join Us
            </button>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};
