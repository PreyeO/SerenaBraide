// components/navbar/shared/NavWishlistButton.tsx
import Link from "next/link";
import { Heart } from "lucide-react";

interface NavWishlistButtonProps {
  count: number;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
  className?: string;
}

export const NavWishlistButton = ({
  count,
  onClick,
  className = "",
}: NavWishlistButtonProps) => {
  return (
    <div className={`relative ${className}`}>
      <Link href="/profile/wishlist" onClick={onClick}>
        <Heart className="text-white size-5 cursor-pointer" />
      </Link>

      {count > 0 && (
        <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
          {count}
        </span>
      )}
    </div>
  );
};
