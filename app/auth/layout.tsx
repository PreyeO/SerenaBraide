import UnderlineLink from "@/components/ui/btns/underline-cta";
import ProductImage from "@/components/ui/images/product-image";
import { CornerUpLeft } from "lucide-react";

interface AuthLayoutProps {
  children: React.ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <main className="min-h-screen flex">
      <div className="hidden md:flex  max-w-[576px]  ">
        <ProductImage
          src="/auth-image.png"
          alt="Silhouette spraying perfume"
          width={576}
          height={728}
          className=" h-full "
        />
      </div>

      {/* Right Side Form/Content */}
      <div className="flex flex-col w-full  pt-16 bg-white ">
        <div className="items-center justify-between flex px-[62px]">
          <ProductImage
            alt="logo image"
            src="/auth-logo.svg"
            height={40}
            width={107.59}
            className=""
          />
          <div className="flex text-[#6F6E6C] items-center gap-[3px]">
            <CornerUpLeft className="size-[18px] text-[#6F6E6C]" />
            <UnderlineLink href="/" text="Home Page" className="text-sm" />
          </div>
        </div>
        <div className="max-w-[552px] flex mx-auto">{children}</div>
      </div>
    </main>
  );
}
