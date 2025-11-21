import SubHeading from "@/components/ui/typography/subHeading";
import { Check, ShieldCheck } from "lucide-react";

import React from "react";

import { securityPaymentInfo } from "@/components/legal-sections/data/legal";

const SecurePaymentInfo = ({}) => {
  return (
    <div className="w-full bg-[#F6F7F8] border border-[#F5F5F5] h-[293px] px-[34px] mt-6 rounded-[10px]">
      <div className=" text-[#3B3B3B] py-[19px] flex flex-col gap-[10px]">
        <div className="flex gap-2">
          <ShieldCheck className="text-black size-[22px]" />
          <SubHeading
            title="Serena Braide protects your payment information"
            className="text-lg font-medium"
          />
        </div>

        <div className="">
          {securityPaymentInfo.map((info, index) => (
            <ul key={index} className="flex gap-2">
              <Check className="text-[#01AD73] size-[22px]" />
              <li>{info.info}</li>
            </ul>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SecurePaymentInfo;
