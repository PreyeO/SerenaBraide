import BackNavigation from "@/components/ui/btns/back-navigation";
import React from "react";
import CartHeader from "../../shared/CartHeader";
import CartItem from "../../shared/CartItem";
import Receipt from "../../shared/Receipt";

const CartSection = () => {
  return (
    <section className="pt-[152px] px-16 mb-[100px]">
      <BackNavigation href="/" text="Back to Home page" />
      <CartHeader />
      <div className="flex gap-[40px] mt-[40px]">
        <div className="flex flex-col gap-6 w-[700px] ">
          <CartItem
            image="/cart-image-1.png"
            name="Eau du Soir"
            price="$160.00"
            metaLabel="Size: 30ml"
            quantity={1}
            showQuantity={true}
            height={150}
            width={150}
            className="bg-[#F6F7F8]"
          />
          <CartItem
            image="/cart-image-2.png"
            name="I love Serena"
            price="$210.00"
            height={150}
            width={150}
            className="bg-[#F6F7F8]"
            metaLabel={
              <span className="flex items-center gap-2">
                Color:
                <span
                  className="w-4 h-4 rounded-full border"
                  style={{ backgroundColor: "#BE4856" }}
                ></span>
                Red rose
              </span>
            }
            quantity={1}
            showQuantity={true}
          />
          <CartItem
            image="/cart-image-3.png"
            name="E-Gift Card"
            price="$510.00"
            metaLabel="Delivery via email within few hours of purchase"
            showQuantity={false}
            height={150}
            width={150}
            className="bg-[#F6F7F8]"
          />
        </div>
        <div className="w-[572px] ">
          <Receipt showButton={true} />
        </div>
      </div>
    </section>
  );
};

export default CartSection;
