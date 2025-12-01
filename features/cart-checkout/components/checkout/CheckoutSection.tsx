"use client";
import BackNavigation from "@/components/ui/btns/back-navigation";
import CartHeader from "@/features/cart-checkout/shared/CartHeader";
import React, { useState } from "react";
import ShippingAddress from "./ShippingAddress";
import SubHeading from "@/components/ui/typography/subHeading";
import PaymentItem from "../../shared/PaymentItem";
import { paymentType } from "../data/checkout.data";
import SubmitButton from "@/components/ui/btns/submit-cta";
import AuthSpan from "@/components/ui/typography/auth-span";
import Link from "next/link";
import Receipt from "../../shared/Receipt";
import CartItem from "../../shared/CartItem";
import { ShoppingBag } from "lucide-react";
import Paragraph from "@/components/ui/typography/paragraph";
import { RadioGroup } from "@/components/ui/radio-group";
import { useRouter } from "next/navigation";

const CheckoutSection = () => {
  const router = useRouter();
  const [selectedPayment, setSelectedPayment] = useState(paymentType[0].id);

  const handleSubmit = () => {
    const payment = paymentType.find((p) => p.id === selectedPayment);
    if (!payment) return;

    router.push(payment.href!); // always routes to the correct page
  };

  return (
    <section className="pt-[152px] px-16 mt-[40px] pb-[50px] ">
      <BackNavigation href="/cart" text="Cart" />
      <CartHeader />
      <div className="flex gap-[40px] mt-[40px]">
        <div className=" flex flex-col gap-6">
          <div className="w-[700px]">
            <ShippingAddress />
          </div>
          <div className="bg-[#F6F7F8] rounded-[10px] border border-[#F5F5F5] w-[700px]  flex flex-col gap-[34px] px-[60px] py-[30px] ">
            <SubHeading
              title="Shipping Address"
              className="text-[#3B3B3B] text-base font-medium"
            />
            <RadioGroup
              value={selectedPayment}
              onValueChange={(val) => setSelectedPayment(val)}
            >
              {paymentType.map((type, index) => (
                <div key={index} className="mb-6">
                  <PaymentItem
                    src={type.src}
                    alt={type.alt}
                    className=""
                    height={type.height}
                    width={type.width}
                    detail={type.detail}
                    optionID={type.id}
                  />
                </div>
              ))}
            </RadioGroup>

            <div>
              <SubmitButton label="Continue" onClick={handleSubmit} />
              <AuthSpan className="text-sm w-[335px] mx-auto leading-[22px] pt-[10px] text-[#3B3B3B] font-normal">
                By submitting my order, I confirm I have read and
                acknowledged all
                <span className="underline font-medium ">
                  {" "}
                  <Link href="/terms_of_service"> terms </Link> and{" "}
                  <Link href="/purchase_service"> policies.</Link>
                </span>
              </AuthSpan>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-6">
          <div className="w-[572x]  py-4 px-4 bg-[#F6F7F8] rounded-[10px] border border-[#F5F5F5]">
            <div className="bg-[#3B3B3B] py-[30px] px-[32.5px] flex gap-[30px]">
              <ShoppingBag />
              <div>
                <Paragraph
                  className="text-white font-medium text-sm"
                  content="My cart - $235"
                />
                <Paragraph
                  className="text-[#9A9A98] italic font-normal text-sm"
                  content="You will earn 24 points earned from this purchase*"
                />
              </div>
            </div>
            <div className="  flex flex-col gap-4 ">
              <CartItem
                image="/cart-image-1.png"
                name="Eau du Soir"
                price="$160.00"
                metaLabel="Size: 30ml"
                className="bg-white"
                quantity={1}
                showQuantity={true}
                height={150}
                width={130}
                showRemoveButton={false}
                showQuantityBox={false}
                showRemoveEdit={false}
              />
              <CartItem
                image="/cart-image-2.png"
                name="I love Serena"
                price="$210.00"
                className="bg-white"
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
                showQuantity={false}
                height={150}
                width={130}
                showRemoveButton={false}
                showQuantityBox={false}
                showRemoveEdit={false}
              />
              <CartItem
                image="/cart-image-3.png"
                name="E-Gift Card"
                price="$510.00"
                className="bg-white"
                metaLabel="Delivery via email within few hours of purchase"
                showQuantity={false}
                height={150}
                width={130}
                showRemoveButton={false}
                showQuantityBox={false}
                showRemoveEdit={false}
              />
            </div>
          </div>
          <div className="pt-6">
            <Receipt showButton={false} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default CheckoutSection;
