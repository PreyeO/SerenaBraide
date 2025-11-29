import UnderlineLink from "@/components/ui/btns/underline-cta";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import Paragraph from "@/components/ui/typography/paragraph";
import SubHeading from "@/components/ui/typography/subHeading";
import { Plus } from "lucide-react";
import React from "react";

const ShippingAddress = () => {
  return (
    <div className="bg-[#F6F7F8] h-[518] rounded-[10px] border border-[#F5F5F5] w-full  flex flex-col gap-[34px] px-[60px] py-[30px] ">
      <SubHeading
        title="Shipping Address"
        className="text-[#3B3B3B] text-base font-medium"
      />
      <div>
        <div className="flex justify-between items-center">
          <RadioGroup defaultValue="option-one">
            <div className="flex  space-x-2 max-w-[229px] ">
              <RadioGroupItem value="option-one" id="option-one" />
              <div className="">
                <Label
                  className="text-sm text-[#3B3B3B] font-medium"
                  htmlFor="r2"
                >
                  Home
                </Label>
                <Paragraph
                  className="text-[#6F6E6C] font-normal text-sm pt-[10px] leading-[22px]"
                  content="Sophia AbdulCity of Westminster, England 30000 City of Westminster, England 08132802414"
                />
              </div>
            </div>
          </RadioGroup>
          <UnderlineLink
            href="/"
            className="text-base text-[#3B3B3B] font-medium"
            text="Edit"
          />
        </div>
        <div className=" flex space-x-[10px] pt-4">
          <span className="rounded-full w-[22px] h-[22px] bg-[#3B3B3B] flex justify-center items-center">
            <Plus className="text-white size-5" strokeWidth={2} />
          </span>
          <Paragraph
            className=" text-[#3B3B3B] underline cursor-pointer  font-medium text-center text-sm"
            content="Add a new shipping address"
          />
        </div>
      </div>
      <div>
        <h4 className="text-[#3B3B3B] font-medium text-sm  ">
          Delivery Information:
        </h4>

        <div className="mt-[10px] border border-[#D1D5DB] rounded-[10px] text-sm leading-[22px] font-normal px-[12.5px] py-[10px]">
          <p>
            <span className="font-medium">Standard Shipping:</span> Arrives
            within 2–4 business days. <br />
            Orders placed after 10 PM on Friday or during the weekend will be
            processed on Monday, excluding public holidays.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ShippingAddress;
