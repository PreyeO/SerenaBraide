"use client";

import { useState } from "react";
import SubHeading from "@/components/ui/typography/subHeading";
import StaffTable from "./components/tables/StaffTable";
import FormModal from "@/components/ui/modals/form-modals";
import StaffForm from "./components/forms/StaffForm";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useGetStaff } from "../../hooks/admin/useGetStaff";
import LoadingState from "@/components/ui/loaders/loading-state";

const StaffScreen = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data, isLoading, isError } = useGetStaff();

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleInviteSuccess = () => {
    handleCloseModal();
  };

  const staff = data?.results || [];

  if (isLoading) {
    return <LoadingState />;
  }

  if (isError) {
    return (
      <section className="py-7.5">
        <div className="flex justify-center items-center h-48">
          <p className="text-red-500">
            Failed to load staff. Please try again.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-7.5">
      <div className="flex justify-between items-center pb-6">
        <SubHeading
          title="Staff Management"
          className="text-sm text-[#3B3B3B] font-semibold"
        />
        <Button
          onClick={() => setIsModalOpen(true)}
          className="bg-[#3B3B3B] text-white hover:bg-[#2f2f2f] flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Invite Staff
        </Button>
      </div>

      <StaffTable staff={staff} onInviteStaff={() => setIsModalOpen(true)} />

      <FormModal
        open={isModalOpen}
        onClose={handleCloseModal}
        title="Invite New Staff"
      >
        <StaffForm onSuccess={handleInviteSuccess} />
      </FormModal>
    </section>
  );
};

export default StaffScreen;
