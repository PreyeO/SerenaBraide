import BackNavigation from "@/components/ui/btns/back-navigation";
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
          width={576}
          height={576}
          className="object-cover"
          priority
        />
      </div>

      {/* Right Side Form/Content */}
      <div className="flex flex-col w-full pt-16 bg-white flex-1">
        <div className="items-center justify-between flex lg:px-15.5 px-6 ">
          <Image
            alt="logo image"
            src="/auth-logo.svg"
            height={40}
            width={107.59}
            className="lg:max-w-[107.59px] max-w-[75.31px]"
          />

          <BackNavigation href="/" text="Home Page" className="" />
        </div>
        <div className="lg:max-w-138 flex mx-auto flex-1 pt-12.5 px-6 ">
          {children}
        </div>
      </div>
    </main>
  );
}
