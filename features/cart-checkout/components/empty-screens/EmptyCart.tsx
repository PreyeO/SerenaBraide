"use client";

import BackNavigation from "@/components/ui/btns/back-navigation";
import LinkCta from "@/components/ui/btns/link-cta";
import ProductImage from "@/components/ui/images/product-image";
import Paragraph from "@/components/ui/typography/paragraph";
import Link from "next/link";

const EmptyCart = () => {
  return (
    <section className="pt-[152px] px-16">
      <BackNavigation href="/" text="Back to Home page" />
      <div className="pt-[178px] w-[400px] mb-[208px] flex flex-col items-center justify-center mx-auto">
        <ProductImage
          alt="empty shopping basket"
          src="/empty-cart-icon.png"
          width={150}
          height={150}
          className=""
        />
        <Paragraph
          className="text-[#3B3B3B] font-medium text-lg pb-[34px] "
          content="Your cart is empty"
        />
        <Link href="/" className="w-full">
          <LinkCta
            className="bg-[#3B3B3B] w-full text-white hover:bg-[#2f2f2f]"
            label="Start Shopping"
          />
        </Link>
      </div>
      <div className="border" />
    </section>
  );
};

export default EmptyCart;
