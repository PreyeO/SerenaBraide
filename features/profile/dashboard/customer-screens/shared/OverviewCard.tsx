import SubHeading from "@/components/ui/typography/subHeading";

import React, { ReactNode } from "react";

interface OverviewCardProps {
  subHeading: string;

  children?: ReactNode;
}

const OverviewCard: React.FC<OverviewCardProps> = ({
  children,
  subHeading,
}) => {
  return (
    <div className="w-full bg-[#F6F7F8] border border-[#F5F5F5] h-73.25 px-8.5  rounded-[10px] ">
      <div className="flex justify-between  text-[#3B3B3B] py-4.75">
        <SubHeading title={subHeading} className="text-lg font-medium" />
      </div>

      <div className=" flex flex-col">
        <div className="border border-[#D1D5DB] w-full" />
        <div className="pt-6 max-w-99 text-[#6F6E6C]   ">{children}</div>
      </div>
    </div>
  );
};

export default OverviewCard;
