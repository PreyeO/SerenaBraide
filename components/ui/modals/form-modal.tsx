"use client";

import { useState } from "react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogCancel,
  AlertDialogHeader,
} from "@/components/ui/alert-dialog";
import RecipientForm from "@/features/gift-card/components/forms/RecipientForm";
import { X } from "lucide-react";

interface FormModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const FormModal = ({ isOpen, onClose }: FormModalProps) => {
  if (!isOpen) return null;

  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent className="p-3 w-full px-[50px] max-w-lg rounded-[20px] ">
        <div className="flex justify-end">
          <AlertDialogCancel
            className="border bg-[#F5F5F5] size-[30px] rounded-full flex items-center justify-center"
            onClick={onClose}
          >
            <X size={18} color="#3B3B3B" />
          </AlertDialogCancel>
        </div>
        <AlertDialogHeader>
          {" "}
          <h3 className="font-medium text-[22px] text-[#121212] text-center">
            Add gift card recipient details
          </h3>
        </AlertDialogHeader>

        <RecipientForm closeModal={onClose} />
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default FormModal;
