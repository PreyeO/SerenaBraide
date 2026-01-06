import Paragraph from "@/components/ui/typography/paragraph";
import SubHeading from "@/components/ui/typography/subHeading";
import { Plus } from "lucide-react";
import Image from "next/image";
import React from "react";

interface EmptyCustomerProps {
  subHeadingOne: string;
  subHeadingTwo: string;
  contentOne: string;
  contentTwo: string;
  subHeadingThree: string;
}

const EmptyCustomerSummary: React.FC<EmptyCustomerProps> = ({
  subHeadingOne,
  subHeadingTwo,
  subHeadingThree,
  contentOne,
  contentTwo,
}) => {
  return (
    <div className="w-full bg-[#F6F7F8] border border-[#F5F5F5] py-4.75 px-8.5  rounded-[10px]">
      <SubHeading
        title={subHeadingOne}
        className="text-lg font-medium text-[#3B3B3B] py-4.75"
      />

      <div className="flex flex-col items-center justify-center">
        <div className="border border-[#D1D5DB] w-full" />

        <div className="flex justify-between pt-4.75 w-full">
          {/* LEFT SIDE */}
          <div className="flex gap-4">
            {/* Avatar + Plus Icon */}
            <div className="relative w-17 h-17">
              <div className="rounded-full w-full h-full bg-[#6F6E6C]" />

              {/* Plus icon positioned bottom-right */}
              <div className="absolute bottom-0 right-0 w-6 h-6 bg-[#2F88FF] rounded-full flex items-center justify-center border border-white">
                <Plus className="text-white size-4" />
              </div>
            </div>

            {/* User name + content */}
            <div>
              <SubHeading
                title={subHeadingTwo}
                className="text-lg font-semibold text-[#3B3B3B]"
              />
              <Paragraph
                className="font-normal leading-6 text-base"
                content={contentOne}
              />
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="max-w-52.25 flex justify-center items-start gap-1.5 text-[#3B3B3B]">
            <SubHeading
              title={subHeadingThree}
              className="text-base font-normal"
            />

            <div className="flex gap-1.5 items-center">
              <SubHeading
                title={contentTwo}
                className="font-medium text-base"
              />
              <Image
                className="mx-auto"
                alt="country flag"
                src="/country-flag.svg"
                width={24}
                height={24}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmptyCustomerSummary;
