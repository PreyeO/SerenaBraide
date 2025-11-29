"use client";

import BackNavigation from "@/components/ui/btns/back-navigation";
import SubmitButton from "@/components/ui/btns/submit-cta";
import ProductImage from "@/components/ui/images/product-image";
import Paragraph from "@/components/ui/typography/paragraph";

const EmptyCart = () => {
  return (
    <section className="pt-[152px] px-16">
      {/* Back Navigation */}

      <BackNavigation href="/" text="Back to Home page" />
      <div className="pt-[178px] max-w-[400px] mb-[208px] flex flex-col items-center justify-center mx-auto">
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
        <SubmitButton label="Start shopping" className="" />
      </div>
      <div className="border" />
    </section>
  );
};

export default EmptyCart;
