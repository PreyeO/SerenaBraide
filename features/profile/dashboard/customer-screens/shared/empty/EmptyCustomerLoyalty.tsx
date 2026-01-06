import Paragraph from "@/components/ui/typography/paragraph";
import SubHeading from "@/components/ui/typography/subHeading";
import { Info } from "lucide-react";

import React from "react";

interface EmptyCustomerProps {
  subHeading: string;
  contentOne: string;
}

const EmptyCustomerLoyalty: React.FC<EmptyCustomerProps> = ({
  subHeading,
  contentOne,
}) => {
  return (
    <div className="w-full bg-[#F6F7F8] border border-[#F5F5F5] h-73.25 px-8.5  rounded-[10px] ">
      <SubHeading
        title={subHeading}
        className="text-lg font-medium text-[#3B3B3B] py-4.75"
      />
      <div className=" flex flex-col items-center justify-center ">
        <div className="border border-[#D1D5DB] w-full" />
        <div className="mt-6 w-full text-[#3B3B3B] bg-[#F0F3F7] h-30 flex gap-1.75 items-center justify-center  ">
          <Paragraph
            className="font-normal text-center text-[22px] text-[#3B3B3B]"
            content={contentOne}
          />
          <Info className="text-[#3B3B3B] size-[16]" />
        </div>
      </div>
    </div>
  );
};

export default EmptyCustomerLoyalty;
