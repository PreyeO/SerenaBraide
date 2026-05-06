"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import SubHeading from "@/components/ui/typography/subHeading";
import Paragraph from "@/components/ui/typography/paragraph";
import { Button } from "@/components/ui/button";
import { useCheckBalance } from "../hooks/useCheckBalance";
import { GiftCardBalanceResponse, BalanceFormValues } from "../giftcard.type";
import GiftCardForm from "./forms/GiftCardForm";
import { formatCurrency } from "@/lib/utils";

const ViewGiftCard = () => {
  const [giftCardData, setGiftCardData] =
    useState<GiftCardBalanceResponse | null>(null);

  const checkBalanceMutation = useCheckBalance({
    onSuccess: (data) => {
      setGiftCardData(data);
    },
  });

  const onSubmit = (values: BalanceFormValues) => {
    checkBalanceMutation.mutate(values);
  };

  const getCardImage = (colour: string) => {
    switch (colour?.toLowerCase()) {
      case "#000000":
        return "/giftcard-3.png";
      case "#ffffff":
        return "/giftcard-2.png";
      case "#f49670":
        return "/giftcard-4.png";
      case "#47011d":
        return "/giftcard-1.png";
      default:
        return "/giftcard-4.png";
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-12 lg:py-24 flex flex-col items-center">
      {!giftCardData ? (
        <div className="w-full max-w-md">
          <SubHeading
            title="View Your E-Gift Card"
            className="text-center text-[26px] lg:text-[40px] font-PPEditorialNew mb-4"
          />
          <Paragraph
            content="Enter your gift card details to view your card and current balance."
            className="text-center text-[#6F6E6C] mb-8"
          />
          <GiftCardForm
            onSubmit={onSubmit}
            isLoading={checkBalanceMutation.isPending}
            buttonLabel="View Gift Card"
          />
        </div>
      ) : (
        <div className="w-full flex flex-col items-center animate-in fade-in duration-700">
          <SubHeading
            title="Your E-Gift Card"
            className="text-center text-[26px] lg:text-[40px] font-PPEditorialNew mb-8"
          />

          <div className="relative w-full max-w-[600px] mb-12 shadow-2xl rounded-2xl overflow-hidden bg-white">
            <Image
              src={getCardImage(giftCardData.colour)}
              alt="Gift Card"
              width={600}
              height={375}
              className="w-full h-auto object-contain"
              priority
            />
          </div>

          <div className="bg-[#F6F7F8] rounded-2xl p-8 lg:p-12 w-full max-w-2xl border border-[#F5F5F5] flex flex-col items-center text-center">
            <div className="mb-6">
              <Paragraph
                content="Current Balance"
                className="text-[#6F6E6C] uppercase tracking-widest text-xs mb-2"
              />
              <SubHeading
                title={formatCurrency(giftCardData.balance, true)}
                className="text-[32px] lg:text-[48px] font-bold text-[#3B3B3B]"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full mb-10 pt-6 border-t border-gray-200">
              <div>
                <Paragraph
                  content="Card Number"
                  className="text-[#6F6E6C] text-xs uppercase tracking-widest mb-1"
                />
                <Paragraph
                  content={giftCardData.card_number}
                  className="text-[#3B3B3B] font-medium text-lg"
                />
              </div>
              <div>
                <Paragraph
                  content="Status"
                  className="text-[#6F6E6C] text-xs uppercase tracking-widest mb-1"
                />
                <div className="flex justify-center">
                  <span
                    className={`px-4 py-1 rounded-full text-xs font-medium ${giftCardData.status === "active" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-700"}`}
                  >
                    {giftCardData.status?.toUpperCase()}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 w-full">
              <Link href="/all-products" className="flex-1 w-full">
                <Button
                  className="w-full h-[56px] py-0 bg-[#3B3B3B] text-white hover:bg-[#2f2f2f] rounded-full text-sm font-medium border border-transparent"
                >
                  Start Shopping
                </Button>
              </Link>
              <div className="flex-1 w-full">
                <Button
                  variant="outline"
                  onClick={() => setGiftCardData(null)}
                  className="w-full h-[56px] py-0 text-[#3B3B3B] border-[#3B3B3B] rounded-full hover:bg-gray-50 text-sm font-medium"
                >
                  Check Another Card
                </Button>
              </div>
            </div>

            <Paragraph
              className="text-[#6F6E6C] font-normal text-xs mt-8"
              content="Gift card values can be applied toward any acquisition on the Serena Braide platform."
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewGiftCard;
