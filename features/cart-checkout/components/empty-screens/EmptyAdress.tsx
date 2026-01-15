import SubHeading from "@/components/ui/typography/subHeading";
import React, { useState } from "react";
import DeliveryInformation from "../../shared/DeliveryInfo";
import AddAddressButton from "../../shared/AddAddressButton";
import FormModal from "@/components/ui/modals/form-modals";
import AddNewAddressForm from "../forms/AddNewAddressForm";

const EmptyAdress = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSuccess = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="bg-[#F6F7F8] rounded-[10px] border border-[#F5F5F5] w-full flex flex-col gap-[34px] px-[60px] py-[30px]">
      <SubHeading
        title="Shipping Address"
        className="text-[#3B3B3B] text-base font-medium"
      />
      <AddAddressButton onClick={() => setIsModalOpen(true)} />

      <FormModal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <AddNewAddressForm onSuccess={handleSuccess} />
      </FormModal>
      <DeliveryInformation />
    </div>
  );
};

export default EmptyAdress;
