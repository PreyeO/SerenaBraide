import BackNavigation from "@/components/ui/btns/back-navigation";
import React from "react";
import CartHeader from "./CartHeader";
import SingleCartItem from "./SingleCartItem";

const CartSection = () => {
  return (
    <section className="pt-[152px] px-16">
      <BackNavigation href="/" text="Back to Home page" />
      <CartHeader />
      <div className="flex gap-[40px] w-full ">
        <SingleCartItem />
        <div className="] bg-[#F6F7F8] w-[572px]"> hello</div>
      </div>
    </section>
  );
};

export default CartSection;
