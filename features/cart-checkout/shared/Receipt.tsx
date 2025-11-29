// import SubmitButton from "@/components/ui/btns/submit-cta";
import { Input } from "@/components/ui/input";
import Paragraph from "@/components/ui/typography/paragraph";
import React from "react";
import { cartReceipt } from "../components/data/cart.data";
import LinkCta from "@/components/ui/btns/link-cta";
import Link from "next/link";

interface ReceiptProps {
  showButton?: boolean;
}

const Receipt = ({ showButton = true }: ReceiptProps) => {
  return (
    <div className="bg-[#F6F7F8]  rounded-[10px] border border-[#F5F5F5] w-full text-sm font-normal flex flex-col px-[86px] py-[50px] gap-6">
      {cartReceipt.map((receipt, index) => (
        <div key={index} className="flex justify-between">
          <h5 className="pb-4 font-medium">{receipt.title}</h5>
          <h5>{receipt.item}</h5>
        </div>
      ))}

      <div>
        <Input
          type="text"
          className="rounded-[50px] border border-[#D1D5DB] py-[14px] px-5"
          placeholder="promotional code"
        />

        <Paragraph className="text-black font-medium text-base" content="" />

        <p className="text-[#3B3B3B] font-normal pt-4">
          You have <span className="font-medium">0 Loyalty points = $0.00</span>
        </p>
      </div>

      <div className="flex font-medium justify-between pb-[40px]">
        <h5>Total</h5>
        <h5>$600.00</h5>
      </div>

      {showButton && (
        <>
          {/* <SubmitButton
            label="Proceed to checkout"
            loadingLabel="Checking out"
            
          /> */}
          <Link href="/checkout">
            <LinkCta label="Proceed to checkout" className="w-full" />
          </Link>
          <p className="text-sm font-normal text-center text-[#6F6E6C] italic pt-[10px]">
            You will earn 24 points earned from this purchase
          </p>
        </>
      )}
    </div>
  );
};

export default Receipt;
