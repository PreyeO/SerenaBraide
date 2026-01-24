"use client";

import React, { useState } from "react";
import { useGetAddresses } from "@/features/cart-checkout/hooks/useGetAddresses";
import { useDeleteAddress } from "@/features/cart-checkout/hooks/useDeleteAddress";
import { useAuthStore } from "@/features/auth/auth.store";
import AddressCard from "@/features/cart-checkout/shared/AddressCard";
import FormModal from "@/components/ui/modals/form-modals";
import DeleteConfirmationModal from "@/components/ui/modals/delete-confirmation-modal";
import AddNewAddressForm from "@/features/cart-checkout/components/forms/AddNewAddressForm";
import UpdateAddressForm from "@/features/cart-checkout/components/forms/UpdateAddress";
import { Address } from "@/features/cart-checkout/type/checkout.type";
import EmptyShipping from "./empty-screens/EmptyShipping";
import SubHeading from "@/components/ui/typography/subHeading";
import LoadingState from "@/components/ui/loaders/loading-state";
import OverviewCard from "./shared/OverviewCard";
import { Plus } from "lucide-react";
import Paragraph from "@/components/ui/typography/paragraph";
import DashboardLoader from "@/components/ui/loaders/dasboard-loader";

const Shipping = () => {
  const user = useAuthStore((state) => state.user);
  const { data: addresses, isLoading } = useGetAddresses();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);
  const [addressToDelete, setAddressToDelete] = useState<number | null>(null);

  const deleteAddressMutation = useDeleteAddress({
    onSuccess: () => {
      setIsDeleteModalOpen(false);
      setAddressToDelete(null);
    },
  });

  if (!user) {
    return <LoadingState />;
  }

  const handleAddSuccess = () => {
    setIsAddModalOpen(false);
  };

  const handleEditSuccess = () => {
    setIsEditModalOpen(false);
    setSelectedAddress(null);
  };

  const handleEdit = (address: Address) => {
    setSelectedAddress(address);
    setIsEditModalOpen(true);
  };

  const handleDelete = (addressId: number) => {
    setAddressToDelete(addressId);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (addressToDelete !== null) {
      deleteAddressMutation.mutate(addressToDelete);
    }
  };

  if (isLoading) {
    return <DashboardLoader />;
  }

  if (!addresses || addresses.length === 0) {
    return <EmptyShipping />;
  }

  return (
    <section className="flex flex-col gap-6">
      <OverviewCard subHeading="Default Address">
        <div className="flex flex-col pt-4 cursor-pointer items-center justify-center mx-auto">
          <span className="rounded-full w-5.5 h-5.5 bg-[#3B3B3B] flex justify-center  items-center">
            <Plus className="text-white size-5" strokeWidth={2} />
          </span>
          <span onClick={() => setIsAddModalOpen(true)}>
            <Paragraph
              className="text-[#3B3B3B]  cursor-pointer font-medium text-center text-lg"
              content="Add a new shipping address"
            />
          </span>
        </div>
      </OverviewCard>
      <div className="bg-[#F6F7F8] rounded-[10px] border border-[#F5F5F5] w-full flex flex-col gap-8.5 px-15 py-7.5">
        <SubHeading
          title="Shipping Address"
          className="text-[#3B3B3B] text-base font-medium"
        />

        {addresses.map((address) => (
          <AddressCard
            key={address.id}
            address={address}
            onEdit={handleEdit}
            onDelete={handleDelete}
            variant="shipping"
          />
        ))}
      </div>

      <FormModal open={isAddModalOpen} onClose={() => setIsAddModalOpen(false)}>
        <AddNewAddressForm onSuccess={handleAddSuccess} />
      </FormModal>

      {selectedAddress && (
        <FormModal
          open={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
        >
          <UpdateAddressForm
            address={selectedAddress}
            onSuccess={handleEditSuccess}
          />
        </FormModal>
      )}

      <DeleteConfirmationModal
        open={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setAddressToDelete(null);
        }}
        onConfirm={handleConfirmDelete}
        title="Delete this address?"
        description="This action is permanent and cannot be undone."
        confirmText="Yes, Delete this address"
        cancelText="No, keep it"
        isLoading={deleteAddressMutation.isPending}
      />
    </section>
  );
};

export default Shipping;
