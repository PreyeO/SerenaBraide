import Paragraph from "@/components/ui/typography/paragraph";
import SubHeading from "@/components/ui/typography/subHeading";
import { Plus } from "lucide-react";
import Image from "next/image";
import React from "react";
import { LucideIcon } from "lucide-react";

interface EmptyCustomerProps {
  className: string;
  height: number;
  width: number;
  alt: string;
  src: string;
  subHeading: string;
  contentOne: string;
  contentTwo: string;
  Icon?: LucideIcon;
  useCircle: boolean;
  quantity?: string;
}

const EmptyCustomerDefault: React.FC<EmptyCustomerProps> = ({
  className,
  width,
  height,
  src,
  alt,
  subHeading,
  contentOne,
  contentTwo,
  Icon = Plus,
  useCircle = true,
  quantity,
}) => {
  return (
    <div className="w-full bg-[#F6F7F8] border border-[#F5F5F5] h-73.25 px-8.5  rounded-[10px] ">
      <div className="flex justify-between  text-[#3B3B3B] py-4.75">
        <SubHeading title={subHeading} className="text-lg font-medium" />
        <h4 className="text-base font-normal">{quantity} </h4>
      </div>

      <div className=" flex flex-col items-center justify-center">
        <div className="border border-[#D1D5DB] w-full" />
        <div className="pt-6 max-w-99 text-[#6F6E6C]   ">
          <Image
            className={`${className} mx-auto`}
            alt={alt}
            src={src}
            width={width}
            height={height}
          />
          <Paragraph
            className="font-normal text-center leading-6 text-base"
            content={contentOne}
          />
          <div className="flex items-center gap-2 pb-6 justify-center pt-1.75">
            {useCircle ? (
              <span className="rounded-full w-6 h-6 bg-[#3B3B3B] flex justify-center items-center">
                <Icon className="text-white size-5" />
              </span>
            ) : (
              <Icon className="text-[#3B3B3B] size-5" />
            )}

            <Paragraph
              className=" text-[#3B3B3B]  font-medium text-center text-lg leading-6.5"
              content={contentTwo}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmptyCustomerDefault;
