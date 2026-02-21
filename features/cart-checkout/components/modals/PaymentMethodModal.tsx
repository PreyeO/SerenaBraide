"use client";

import GeneralModal from "@/components/ui/modals/general-modal";
import { RadioGroup } from "@/components/ui/radio-group";
import PaymentItem from "../../shared/PaymentItem";
import SubmitButton from "@/components/ui/btns/submit-cta";
import AuthSpan from "@/components/ui/typography/auth-span";
import Link from "next/link";
import { paymentType } from "../../data/checkout.data";
import { formatCurrency } from "@/lib/utils";

interface PaymentMethodModalProps {
  open: boolean;
  onClose: () => void;
  selectedPayment: string;
  onPaymentChange: (value: string) => void;
  onSubmit: () => void;
  isPending: boolean;
  totalPrice: number;
}

const PaymentMethodModal = ({
  open,
  onClose,
  selectedPayment,
  onPaymentChange,
  onSubmit,
  isPending,
  totalPrice,
}: PaymentMethodModalProps) => {
  return (
    <GeneralModal open={open} onClose={onClose} title="Payment Method">
      <div className="flex flex-col gap-6 py-4">
        <RadioGroup value={selectedPayment} onValueChange={onPaymentChange}>
          {paymentType.map((type, index) => (
            <div key={index} className="mb-4">
              <PaymentItem
                src={type.src}
                alt={type.alt}
                height={type.height}
                width={type.width}
                detail={type.detail}
                optionID={type.id}
              />
            </div>
          ))}
        </RadioGroup>

        <div className="pt-4">
          <SubmitButton
            label={`Pay ${formatCurrency(totalPrice)}`}
            loadingLabel="Processing..."
            isPending={isPending}
            onClick={onSubmit}
          />
          <AuthSpan className="text-xs lg:text-sm w-full mx-auto leading-5.5 pt-2.5 text-[#3B3B3B] font-normal text-center">
            By placing your order, you agree to Serena Braide’s{" "}
            <span className="underline font-medium">
              <Link href="/purchase_policy">Purchase Policy.</Link>
            </span>
          </AuthSpan>
        </div>
      </div>
    </GeneralModal>
  );
};

export default PaymentMethodModal;
