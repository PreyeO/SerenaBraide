import { useState } from "react";
import { Address } from "../type/checkout.type";

interface UseAddressModalsResult {
  isAddModalOpen: boolean;
  isEditModalOpen: boolean;
  selectedAddress: Address | null;
  handleAddClick: () => void;
  handleAddSuccess: () => void;
  handleEditClick: (address: Address) => void;
  handleEditSuccess: () => void;
  closeAddModal: () => void;
  closeEditModal: () => void;
}

export function useAddressModals(): UseAddressModalsResult {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);

  const handleAddClick = () => setIsAddModalOpen(true);
  const handleAddSuccess = () => setIsAddModalOpen(false);
  const closeAddModal = () => setIsAddModalOpen(false);

  const handleEditClick = (address: Address) => {
    setSelectedAddress(address);
    setIsEditModalOpen(true);
  };
  const handleEditSuccess = () => {
    setIsEditModalOpen(false);
    setSelectedAddress(null);
  };
  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setSelectedAddress(null);
  };

  return {
    isAddModalOpen,
    isEditModalOpen,
    selectedAddress,
    handleAddClick,
    handleAddSuccess,
    handleEditClick,
    handleEditSuccess,
    closeAddModal,
    closeEditModal,
  };
}
