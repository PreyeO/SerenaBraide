// components/navbar/shared/NavCartButton.tsx
import Link from "next/link";
import { ShoppingCart } from "lucide-react";

interface NavCartButtonProps {
  count: number;
  className?: string;
}

const NavCartButton = ({ count, className = "" }: NavCartButtonProps) => {
  return (
    <div className={`relative ${className}`}>
      <Link href="/cart">
        <ShoppingCart className="text-white size-5 cursor-pointer" />
      </Link>

      {count > 0 && (
        <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
          {count}
        </span>
      )}
    </div>
  );
};
export default NavCartButton;
