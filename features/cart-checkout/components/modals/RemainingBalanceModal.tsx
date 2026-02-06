"use client";

import FormModal from "@/components/ui/modals/form-modals";
import SubHeading from "@/components/ui/typography/subHeading";
import Paragraph from "@/components/ui/typography/paragraph";
import LinkCta from "@/components/ui/btns/link-cta";

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
  giftCardBalance,
  onPayRemaining,
}: RemainingBalanceModalProps) => {
  return (
    <FormModal
      open={open}
      onClose={onClose}
      title="Partial Payment Applied"
      showVideo={true}
    >
      <div className="w-full flex flex-col gap-4">
        <div className="bg-[#F0F3F7] w-full border rounded-[10px] py-6.25 px-4 flex flex-col items-center gap-3">
          <SubHeading
            className="text-[32px] font-semibold text-[#01AD73]"
            title={`$${parseFloat(giftCardAmount).toFixed(2)}`}
          />
          <Paragraph
            className="text-[#3B3B3B] font-medium text-base"
            content="Paid with Gift Card"
          />
        </div>

        <div className="bg-[#FFF4E6] w-full border border-[#FFA500] rounded-[10px] py-4 px-4 flex flex-col gap-2">
          <Paragraph
            className="text-[#3B3B3B] font-medium text-base"
            content={`Remaining Balance: $${parseFloat(remainingAmount).toFixed(2)}`}
          />
          <Paragraph
            className="text-[#6F6E6C] font-normal text-sm"
            content="Please complete your payment using another payment method to complete your order."
          />
        </div>

        {parseFloat(giftCardBalance) > 0 && (
          <div className="bg-[#F0F3F7] w-full border rounded-[10px] py-4 px-4">
            <Paragraph
              className="text-[#3B3B3B] font-normal text-sm"
              content={`Your gift card balance: $${parseFloat(giftCardBalance).toFixed(2)}`}
            />
          </div>
        )}

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
