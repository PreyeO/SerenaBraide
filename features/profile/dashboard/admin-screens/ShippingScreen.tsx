"use client";

import { useState } from "react";
import SubHeading from "@/components/ui/typography/subHeading";
import ShippingTable from "./components/tables/ShippingTable";
import FormModal from "@/components/ui/modals/form-modals";
import ShippingForm from "./components/forms/ShippingForm";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useGetShippingAreas } from "../../hooks/admin/useGetShippingAreas";
import LoadingState from "@/components/ui/loaders/loading-state";

const ShippingScreen = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data, isLoading, isError } = useGetShippingAreas();

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleCreateSuccess = () => {
    handleCloseModal();
  };

  const shippingAreas = data?.results || [];

  if (isLoading) {
    return <LoadingState />;
  }

  if (isError) {
    return (
      <section className="py-7.5">
        <div className="flex justify-center items-center h-48">
          <p className="text-red-500">
            Failed to load shipping areas. Please try again.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-7.5">
      <div className="flex justify-between items-center pb-6">
        <SubHeading
          title="Shipping Management"
          className="text-sm text-[#3B3B3B] font-semibold"
        />
        <Button
          onClick={() => setIsModalOpen(true)}
          className="bg-[#3B3B3B] text-white hover:bg-[#2f2f2f] flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Add New Area
        </Button>
      </div>

      <ShippingTable
        shippingAreas={shippingAreas}
        onAddArea={() => setIsModalOpen(true)}
      />

      <FormModal
        open={isModalOpen}
        onClose={handleCloseModal}
        title="Add Shipping Area"
      >
        <ShippingForm onSuccess={handleCreateSuccess} />
      </FormModal>
    </section>
  );
};

export default ShippingScreen;
