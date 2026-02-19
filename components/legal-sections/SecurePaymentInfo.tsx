import SubHeading from "@/components/ui/typography/subHeading";
import { Check, ShieldCheck } from "lucide-react";

import React from "react";

import { securityPaymentInfo } from "@/components/legal-sections/data/legal";

const SecurePaymentInfo = ({}) => {
  return (
    <div className="w-full bg-[#F6F7F8] border border-[#F5F5F5] h-73.25 px-8.5 mt-6 rounded-2.5">
      <div className=" text-[#3B3B3B] py-4.75 flex flex-col gap-4.75">
        <div className="flex gap-2">
          <ShieldCheck className="text-black size-5.5" />
          <SubHeading
            title="Serena Braide protects your payment information"
            className="text-lg font-medium"
          />
        </div>

        <div className="">
          {securityPaymentInfo.map((info, index) => (
            <ul key={index} className="flex gap-2">
              <Check className="text-[#01AD73] size-5.5" />
              <li>{info.info}</li>
            </ul>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SecurePaymentInfo;
