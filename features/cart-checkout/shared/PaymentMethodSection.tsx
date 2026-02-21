"use client";

import React from "react";
import Link from "next/link";
import { RadioGroup } from "@/components/ui/radio-group";
import PaymentItem from "./PaymentItem";
import SubmitButton from "@/components/ui/btns/submit-cta";
import AuthSpan from "@/components/ui/typography/auth-span";
import SubHeading from "@/components/ui/typography/subHeading";
import { paymentType } from "../data/checkout.data";

interface PaymentMethodSectionProps {
  selectedPayment: string;
  onPaymentChange: (value: string) => void;
  onSubmit: () => void;
  isPending?: boolean;
  /** Optional: Override the button label */
  buttonLabel?: string;
  /** Whether to show the title header */
  showTitle?: boolean;
  /** Additional className for the container */
  className?: string;
}

/**
 * Reusable payment method selection component.
 * Displays payment options in a RadioGroup with submit button and terms.
 */
const PaymentMethodSection = ({
  selectedPayment,
  onPaymentChange,
  onSubmit,
  isPending = false,
  buttonLabel = "Pay",
  showTitle = true,
  className = "",
}: PaymentMethodSectionProps) => {
  return (
    <div className={className}>
      {showTitle && (
        <SubHeading
          title="Payment Method"
          className="text-[#3B3B3B] text-base font-medium"
        />
      )}

      <RadioGroup value={selectedPayment} onValueChange={onPaymentChange}>
        {paymentType.map((type, index) => (
          <div key={index} className="mb-6">
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

      <div>
        <SubmitButton
          label={buttonLabel}
          loadingLabel="Processing..."
          isPending={isPending}
          onClick={onSubmit}
        />
        <AuthSpan className="lg:text-sm max-w-83.75 text-xs mx-auto leading-5.5 pt-2.5 text-[#3B3B3B] font-normal">
          By placing your order, you agree to Serena Braide’s{" "}
          <span className="underline font-medium">
            <Link href="/purchase_policy">Purchase Policy.</Link>
          </span>
        </AuthSpan>
      </div>
    </div>
  );
};

export default PaymentMethodSection;
