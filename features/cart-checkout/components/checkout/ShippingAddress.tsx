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
import { useGetAddresses } from "../../hooks/useGetAddresses";
import EmptyAdress from "../empty-screens/EmptyAdress";
import LoadingState from "@/components/ui/loaders/loading-state";

const ShippingAddress = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState<number | null>(null);
  const { data: addresses, isLoading } = useGetAddresses();

  const handleAddSuccess = () => {
    setIsAddModalOpen(false);
  };

  const handleEditSuccess = () => {
    setIsEditModalOpen(false);
    setSelectedAddress(null);
  };

  const handleEditClick = (addressId: number) => {
    setSelectedAddress(addressId);
    setIsEditModalOpen(true);
  };

  if (isLoading) {
    return (
      <div className="bg-[#F6F7F8] rounded-[10px] border border-[#F5F5F5] w-full flex flex-col gap-8.5 px-15 py-7.5">
        <LoadingState />
      </div>
    );
  }

  if (!addresses || addresses.length === 0) {
    return <EmptyAdress />;
  }

  const addressToEdit = selectedAddress
    ? addresses.find((addr) => addr.id === selectedAddress)
    : null;

  return (
    <div className="bg-[#F6F7F8] rounded-[10px] border border-[#F5F5F5] w-full flex flex-col gap-8.5 lg:px-15 px-4 lg:py-7.5 py-4">
      <SubHeading
        title="Shipping Address"
        className="text-[#3B3B3B] text-sm lg:text-base font-medium"
      />
      <div className="flex flex-col gap-4">
        <RadioGroup
          defaultValue={
            addresses.find((addr) => addr.is_default)?.id.toString() ||
            addresses[0].id.toString()
          }
        >
          {addresses.map((address) => (
            <div
              key={address.id}
              className="flex justify-between items-start pb-4 border-b border-[#F5F5F5] last:border-0"
            >
              <div className="flex space-x-2 max-w-57.25">
                <RadioGroupItem
                  value={address.id.toString()}
                  id={`address-${address.id}`}
                />
                <div>
                  <Label
                    className="text-sm text-[#3B3B3B] font-medium"
                    htmlFor={`address-${address.id}`}
                  >
                    {address.is_default ? "Default" : "Address"}
                  </Label>
                  <Paragraph
                    className="text-[#6F6E6C] font-normal text-sm pt-2.5 leading-5.5"
                    content={`${address.address}, ${address.city}, ${address.state} ${address.zip_code}, ${address.country}`}
                  />
                </div>
              </div>
              <div>
                <button
                  className="text-base text-[#3B3B3B] font-medium underline"
                  onClick={() => handleEditClick(address.id)}
                >
                  Edit
                </button>
              </div>
            </div>
          ))}
        </RadioGroup>
        <div>
          <AddAddressButton onClick={() => setIsAddModalOpen(true)} />
        </div>
      </div>

      <FormModal open={isAddModalOpen} onClose={() => setIsAddModalOpen(false)}>
        <AddNewAddressForm onSuccess={handleAddSuccess} />
      </FormModal>

      {addressToEdit && (
        <FormModal
          open={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
        >
          <UpdateAddressForm
            address={addressToEdit}
            onSuccess={handleEditSuccess}
          />
        </FormModal>
      )}

      <div>
        <DeliveryInformation />
      </div>
    </div>
  );
};

export default ShippingAddress;
