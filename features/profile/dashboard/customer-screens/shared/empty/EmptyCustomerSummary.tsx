import Paragraph from "@/components/ui/typography/paragraph";
import SubHeading from "@/components/ui/typography/subHeading";
import Image from "next/image";
import React from "react";
import InitialsAvatar from "@/components/ui/InitialsAvatar";

interface EmptyCustomerProps {
  subHeadingOne: string;
  subHeadingTwo: string;
  contentOne: string;
  contentTwo: string;
  subHeadingThree: string;
  firstName?: string;
  lastName?: string;
}

const EmptyCustomerSummary: React.FC<EmptyCustomerProps> = ({
  subHeadingOne,
  subHeadingTwo,
  subHeadingThree,
  contentOne,
  contentTwo,
  firstName,
  lastName,
}) => {
  return (
    <div className="w-full bg-[#F6F7F8] border border-[#F5F5F5] py-3 lg:py-4.75 px-4 lg:px-8.5 rounded-[10px]">
      <SubHeading
        title={subHeadingOne}
        className="text-base sm:text-lg font-medium text-[#3B3B3B] py-3 sm:py-4.75"
      />

      <div className="flex flex-col items-center justify-center">
        <div className="border border-[#D1D5DB] w-full" />

        <div className="flex flex-col sm:flex-row sm:justify-between pt-3 sm:pt-4.75 w-full gap-3 sm:gap-0">
          {/* LEFT SIDE */}
          <div className="flex gap-3 sm:gap-4">
            {/* Avatar */}
            <InitialsAvatar
              firstName={firstName}
              lastName={lastName}
              fallback="SB"
              size="lg"
              className="text-white bg-[#47011d] hidden md:flex"
            />
            <InitialsAvatar
              firstName={firstName}
              lastName={lastName}
              fallback="SB"
              size="md"
              className="text-white bg-[#47011d] md:hidden  "
            />
            {/* User name + content */}
            <div className="min-w-0 flex-1">
              <SubHeading
                title={subHeadingTwo}
                className="text-base sm:text-lg font-semibold font-PPEditorialNew text-[#3B3B3B] wrap-break-word"
              />
              <Paragraph
                className="font-normal leading-5 sm:leading-6 text-sm sm:text-base"
                content={contentOne}
              />
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="max-w-full sm:max-w-52.25 flex justify-end sm:justify-center items-start gap-1 sm:gap-1.5 text-[#3B3B3B] shrink-0">
            <SubHeading
              title={subHeadingThree}
              className="text-sm sm:text-base font-normal"
            />

            <div className="flex gap-1 sm:gap-1.5 items-center">
              <SubHeading
                title={contentTwo}
                className="font-medium text-sm sm:text-base wrap-break-word"
              />
              <Image
                className="mx-auto shrink-0 w-5 h-5 sm:w-6 sm:h-6"
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
