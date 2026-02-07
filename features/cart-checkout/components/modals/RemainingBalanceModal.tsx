"use client";

import FormModal from "@/components/ui/modals/form-modals";
import SubHeading from "@/components/ui/typography/subHeading";
import Paragraph from "@/components/ui/typography/paragraph";
import LinkCta from "@/components/ui/btns/link-cta";
import { formatCurrency } from "@/features/profile/dashboard/utils/currency.utils";

interface RemainingBalanceModalProps {
  open: boolean;
  onClose: () => void;
  remainingAmount: string;
  giftCardAmount: string;
  giftCardBalance: string;
  onPayRemaining: () => void;
}

const RemainingBalanceModal = ({
  open,
  onClose,
  remainingAmount,
  giftCardAmount,
  onPayRemaining,
}: RemainingBalanceModalProps) => {
  return (
    <FormModal
      open={open}
      onClose={onClose}
      title="Partial Payment Applied"
      showVideo={true}
    >
      <div className="w-full flex flex-col lg:gap-4 gap-2.5">
        <div className="bg-[#F0F3F7] w-full border rounded-[10px] lg:py-6.25 py-4 px-4 flex flex-col items-center gap-3">
          <SubHeading
            className="lg:text-[32px] text-[22px] font-semibold text-[#01AD73]"
            title={formatCurrency(parseFloat(giftCardAmount))}
          />
          <Paragraph
            className="text-[#3B3B3B] font-medium text-base"
            content="Paid with Gift Card"
          />
        </div>

        <div className="bg-[#FFF4E6] w-full border border-[#FFA500] rounded-[10px] py-4 px-4 flex flex-col gap-2">
          <Paragraph
            className="text-[#3B3B3B] font-medium lg:text-base text-sm"
            content={`Balance: $${parseFloat(remainingAmount).toFixed(2)}`}
          />
          <Paragraph
            className="text-[#6F6E6C] font-normal lg:text-sm text-xs"
            content="Please complete your payment using another payment method to complete your order."
          />
        </div>

        <div className="flex flex-col gap-3 mt-2">
          <LinkCta
            className="w-full bg-[#3B3B3B] text-white hover:bg-[#2f2f2f]"
            label="Pay Remaining Balance"
            onClick={onPayRemaining}
          />
          <button
            onClick={onClose}
            className="w-full text-[#3B3B3B] border border-[#6F6E6C] rounded-[50px] py-3 px-4 font-medium text-sm hover:bg-gray-50"
          >
            Cancel
          </button>
        </div>
      </div>
    </FormModal>
  );
};

export default RemainingBalanceModal;
