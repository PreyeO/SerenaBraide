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
      <AlertDialogContent className="w-full h-full lg:h-auto lg:max-h-[90vh] max-w-none lg:max-w-md rounded-none lg:rounded-lg px-6 lg:px-8 py-8 lg:py-8 m-0 lg:m-4 top-0 left-0 lg:top-[50%] lg:left-[50%] translate-x-0 lg:translate-x-[-50%] translate-y-0 lg:translate-y-[-50%] flex flex-col justify-center lg:justify-start overflow-y-auto">
        <AlertDialogHeader className="flex flex-col items-center text-center px-0">
          {/* Trash Icon with circular light pink background and dark pink outline */}
          <div className="w-14 h-14 sm:w-16 sm:h-16 lg:w-20 lg:h-20 rounded-full bg-[#FEE2E2] border-2 border-[#FCA5A5] flex items-center justify-center mb-3 sm:mb-4 lg:mb-6 shrink-0">
            <Trash2 className="w-7 h-7 sm:w-8 sm:h-8 lg:w-10 lg:h-10 text-[#DC2626] stroke-[1.5]" />
          </div>

          <AlertDialogTitle className="text-lg sm:text-xl lg:text-2xl font-bold text-[#121212] mt-1 sm:mt-2 mb-2 sm:mb-2 lg:mb-3 px-2">
            {title}
          </AlertDialogTitle>

          <AlertDialogDescription className="text-[#6F6E6C] text-xs sm:text-sm lg:text-base leading-5 sm:leading-6 max-w-sm sm:max-w-md px-2">
            {description}
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter className="flex flex-col gap-2.5 sm:gap-3 mt-4 sm:mt-6 lg:mt-8 w-full px-0">
          <AlertDialogAction
            onClick={onConfirm}
            disabled={isLoading}
            className="w-full bg-[#DC2626] hover:bg-[#B91C1C] text-white rounded-full py-3.5 sm:py-4 lg:py-6 text-xs sm:text-sm lg:text-base font-medium order-1"
          >
            {isLoading ? "Deleting..." : confirmText}
          </AlertDialogAction>

          <AlertDialogCancel
            onClick={onClose}
            disabled={isLoading}
            className="w-full bg-white border border-[#D1D5DB] text-[#6F6E6C] hover:bg-[#F9FAFB] rounded-full py-3.5 sm:py-4 lg:py-6 text-xs sm:text-sm lg:text-base font-medium order-2"
          >
            {cancelText}
          </AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteConfirmationModal;
