"use client";

import BackNavigation from "@/components/ui/btns/back-navigation";
import LinkCta from "@/components/ui/btns/link-cta";
import Paragraph from "@/components/ui/typography/paragraph";
import Image from "next/image";
import Link from "next/link";

const EmptyCart = () => {
  return (
    <section className="min-h-screen lg:pt-38 pt-30 px-6 lg:px-16 flex flex-col">
      <BackNavigation href="/" text="Back to Home page" />

      {/* Centered content */}
      <div className="flex flex-1 items-center justify-center">
        <div className="max-w-100 w-full flex flex-col items-center text-center">
          <Image
            alt="empty shopping basket"
            src="/empty-cart-icon.png"
            width={150}
            height={150}
          />

          <Paragraph
            className="text-[#3B3B3B] font-medium text-lg mt-6 mb-8"
            content="Your cart is empty"
          />

          <Link href="/" className="w-full">
            <LinkCta
              className="bg-[#3B3B3B] w-full text-white hover:bg-[#2f2f2f]"
              label="Start Shopping"
            />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default EmptyCart;
