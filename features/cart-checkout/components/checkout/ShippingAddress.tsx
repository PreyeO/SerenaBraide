"use client";

import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import Paragraph from "@/components/ui/typography/paragraph";
import SubHeading from "@/components/ui/typography/subHeading";
import React, { useState } from "react";
import AddAddressButton from "../../shared/AddAddressButton";
import FormModal from "@/components/ui/modals/form-modals";
import AddNewAddressForm from "../forms/AddNewAddressForm";
import DeliveryInformation from "../../shared/DeliveryInfo";
import UpdateAddressForm from "../forms/UpdateAddress";

const ShippingAddress = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <div className="bg-[#F6F7F8]  rounded-[10px] border border-[#F5F5F5] w-full  flex flex-col gap-[34px] px-[60px] py-[30px] ">
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

          <div>
            <button
              className="text-base text-[#3B3B3B] font-medium underline"
              onClick={() => setIsModalOpen(true)}
            >
              Edit
            </button>
            <FormModal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
              <UpdateAddressForm />
            </FormModal>
          </div>
        </div>
        <div>
          <AddAddressButton onClick={() => setIsModalOpen(true)} />

          <FormModal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
            <AddNewAddressForm />
          </FormModal>
        </div>
      </div>

      <div>
        <DeliveryInformation />
      </div>
    </div>
  );
};

export default ShippingAddress;
