import UnderlineLink from "@/components/ui/btns/underline-cta";
import ProductImage from "@/components/ui/images/product-image";
import { CornerUpLeft } from "lucide-react";
import Image from "next/image";

interface AuthLayoutProps {
  children: React.ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <main className="flex items-stretch">
      <div className="hidden md:flex max-w-xl shrink-0">
        <Image
          src="/auth-image.png"
          alt="Silhouette spraying perfume"
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Right Side Form/Content */}
      <div className="flex flex-col w-full pt-16 bg-white flex-1">
        <div className="items-center justify-between flex px-15.5">
          <ProductImage
            alt="logo image"
            src="/auth-logo.svg"
            height={40}
            width={107.59}
            className=""
          />
          <div className="flex text-[#6F6E6C] items-center gap-0.75">
            <CornerUpLeft className="size-4.5 text-[#6F6E6C]" />
            <UnderlineLink href="/" text="Home Page" className="text-sm" />
          </div>
        </div>
        <div className="max-w-138 flex mx-auto flex-1 pb-16">{children}</div>
      </div>
    </main>
  );
}
