"use client";

import React, { useState } from "react";
import EmptyCustomerDefault from "../shared/empty/EmptyCustomerDefault";
import FormModal from "@/components/ui/modals/form-modals";
import AddNewAddressForm from "@/features/cart-checkout/components/forms/AddNewAddressForm";
import { useAuthStore } from "@/features/auth/auth.store";
import LoadingState from "@/components/ui/loaders/loading-state";
import { Plus } from "lucide-react";

const EmptyShipping = () => {
  const user = useAuthStore((state) => state.user);
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (!user) {
    return <LoadingState />;
  }

  const handleSuccess = () => {
    setIsModalOpen(false);
  };

  const handleAddClick = () => {
    setIsModalOpen(true);
  };

  return (
    <section className="">
      <div onClick={handleAddClick} className="cursor-pointer">
        <EmptyCustomerDefault
          src="/empty-location-icon.png"
          alt="icon of a maps"
          width={153.33}
          height={100}
          className=""
          subHeading="Default Address"
          contentOne="No saved address. Add address to make checkout faster and smoother."
          contentTwo="Add shipping address"
          useCircle
          Icon={Plus}
        />
      </div>

      <FormModal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <AddNewAddressForm onSuccess={handleSuccess} />
      </FormModal>
    </section>
  );
};

export default EmptyShipping;
