"use client";

import SubHeading from "@/components/ui/typography/subHeading";
import { useState } from "react";
import Paragraph from "@/components/ui/typography/paragraph";
import FormModal from "@/components/ui/modals/form-modals";
import LinkCta from "@/components/ui/btns/link-cta";
import { useCheckBalance } from "../../hooks/useCheckBalance";
import {
  GiftCardBalanceResponse,
  BalanceFormValues,
} from "../../giftcard.type";
import GiftCardForm from "./GiftCardForm";
import Link from "next/link";

const BalanceForm = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [balanceData, setBalanceData] =
    useState<GiftCardBalanceResponse | null>(null);

  const checkBalanceMutation = useCheckBalance({
    onSuccess: (balance) => {
      setBalanceData(balance);
      setIsModalOpen(true);
    },
  });

  const onSubmit = (data: BalanceFormValues) => {
    checkBalanceMutation.mutate({
      card_number: data.card_number,
      pin: data.pin,
    });
  };

  return (
    <>
      <GiftCardForm
        onSubmit={onSubmit}
        isLoading={checkBalanceMutation.isPending}
        buttonLabel="Verify Balance"
        showHelpText={true}
      />

      <FormModal
        open={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setBalanceData(null);
        }}
        title="Your Current Balance"
        showVideo={true}
      >
        {balanceData && (
          <div className="bg-[#F0F3F7] w-full  lg:my-7.5 border rounded-[10px] px-2.5 lg:py-6.25 flex flex-col items-center">
            <SubHeading
              className="lg:text-[40px] text-[26px] font-semibold"
              title={`${balanceData.currency} ${balanceData.balance.toLocaleString(
                "en-US",
                {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                },
              )}`}
            />
            <h3 className="font-medium text-[#6F6E6C] lg:text-[22px] text-base pt-2.5 pb-4">
              Available balance
            </h3>

            <Paragraph
              className="text-[#3B3B3B] leading-6 font-normal text-base  italic"
              content="This value can be applied toward any Serena Braide acquisition"
            />
            {balanceData.status && (
              <Paragraph
                className="text-[#3B3B3B] font-normal text-sm pt-2"
                content={`Status: ${balanceData.status}`}
              />
            )}
          </div>
        )}

        <Link href="/all-products" className="pt-2.5">
          <LinkCta
            className="w-full bg-[#3B3B3B] text-white hover:bg-[#2f2f2f] "
            label="Continue shopping"
          />
        </Link>
        <Paragraph
          className="text-[#3B3B3B] font-normal lg:text-sm text-xs pt-2.5"
          content="Gift card value remains valid for 12 months from the date of acquisition"
        />
      </FormModal>
    </>
  );
};

export default BalanceForm;
