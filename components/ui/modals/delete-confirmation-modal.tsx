"use client";

import React from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Trash2 } from "lucide-react";

interface DeleteConfirmationModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
  isLoading?: boolean;
}

const DeleteConfirmationModal: React.FC<DeleteConfirmationModalProps> = ({
  open,
  onClose,
  onConfirm,
  title = "Delete this item?",
  description = "This action is permanent and cannot be undone.",
  confirmText = "Yes, Delete",
  cancelText = "No, keep it",
  isLoading = false,
}) => {
  return (
    <AlertDialog open={open} onOpenChange={onClose}>
      <AlertDialogContent className="max-w-md px-8 py-8">
        <AlertDialogHeader className="flex flex-col items-center text-center">
          {/* Trash Icon with circular light pink background and dark pink outline */}
          <div className="w-20 h-20 rounded-full bg-[#FEE2E2] border-2 border-[#FCA5A5] flex items-center justify-center mb-6">
            <Trash2 className="w-10 h-10 text-[#DC2626] stroke-[1.5]" />
          </div>
          
          <AlertDialogTitle className="text-2xl font-bold text-[#121212] mt-2 mb-3">
            {title}
          </AlertDialogTitle>
          
          <AlertDialogDescription className="text-[#6F6E6C] text-base leading-6 max-w-md">
            {description}
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter className="flex flex-col gap-3 sm:flex-col mt-8 w-full">
          <AlertDialogAction
            onClick={onConfirm}
            disabled={isLoading}
            className="w-full bg-[#DC2626] hover:bg-[#B91C1C] text-white rounded-full py-6 text-base font-medium"
          >
            {isLoading ? "Deleting..." : confirmText}
          </AlertDialogAction>
          
          <AlertDialogCancel
            onClick={onClose}
            disabled={isLoading}
            className="w-full bg-white border border-[#D1D5DB] text-[#6F6E6C] hover:bg-[#F9FAFB] rounded-full py-6 text-base font-medium"
          >
            {cancelText}
          </AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteConfirmationModal;

