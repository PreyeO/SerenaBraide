import { Label } from "@/components/ui/label";
import { RadioGroupItem } from "@/components/ui/radio-group";
import Image from "next/image";
import React from "react";
import { PaymentItemProps } from "../type/checkout.type";

const PaymentItem: React.FC<PaymentItemProps> = ({
  height,
  width,
  alt,
  src,
  detail,
  className,
  optionID,
}) => {
  return (
    <div className="border border-[#D1D5DB] px-[10px] py-[14px] rounded-[10px]">
      <div className="flex items-center space-x-[10px]">
        <RadioGroupItem value={optionID} id={optionID} />
        <Label
          className="text-sm text-[#3B3B3B] font-medium flex items-center gap-2"
          htmlFor={optionID}
        >
          <Image
            className={`${className}`}
            alt={alt}
            src={src}
            width={width}
            height={height}
          />
          {detail}
        </Label>
      </div>
    </div>
  );
};

export default PaymentItem;
