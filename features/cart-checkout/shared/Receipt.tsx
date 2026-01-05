"use client";

import { Input } from "@/components/ui/input";
import LinkCta from "@/components/ui/btns/link-cta";
import Link from "next/link";

interface ReceiptProps {
  totalItems: number;
  totalPrice: number;
  showButton?: boolean;
}

const Receipt = ({
  totalItems,
  totalPrice,
  showButton = true,
}: ReceiptProps) => {
  return (
    <div className="bg-[#F6F7F8] rounded-[10px] border border-[#F5F5F5] w-full text-sm font-normal flex flex-col px-[86px] py-[50px] gap-6">
      {/* Cart Summary */}
      <div className="flex justify-between">
        <h5 className="font-medium">Items</h5>
        <h5>{totalItems}</h5>
      </div>

      <div className="flex justify-between">
        <h5 className="font-medium">Subtotal</h5>
        <h5>${totalPrice.toFixed(2)}</h5>
      </div>

      {/* Promo Code */}
      <div>
        <Input
          type="text"
          className="rounded-[50px] border border-[#D1D5DB] py-[14px] px-5"
          placeholder="Promotional code"
        />

        <p className="text-[#3B3B3B] font-normal pt-4">
          You have <span className="font-medium">0 Loyalty points = $0.00</span>
        </p>
      </div>

      {/* Total */}
      <div className="flex font-medium justify-between pb-[40px]">
        <h5>Total</h5>
        <h5>${totalPrice.toFixed(2)}</h5>
      </div>

      {showButton && (
        <>
          <Link href="/checkout">
            <LinkCta label="Proceed to checkout" className="w-full" />
          </Link>

          <p className="text-sm font-normal text-center text-[#6F6E6C] italic pt-[10px]">
            You will earn {totalItems * 2} points from this purchase
          </p>
        </>
      )}
    </div>
  );
};

export default Receipt;
