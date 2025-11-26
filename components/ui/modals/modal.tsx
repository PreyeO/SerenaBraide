"use client";

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogCancel,
  AlertDialogHeader,
} from "@/components/ui/alert-dialog";
import { X } from "lucide-react";

interface ReusableModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  icon?: React.ReactNode;
}

const Modal = ({
  isOpen,
  onClose,
  title,
  children,
  icon,
}: ReusableModalProps) => {
  if (!isOpen) return null;

  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent className="p-3 w-full px-[50px] max-w-lg rounded-[20px]">
        {/* Close Button */}
        <div className="flex justify-end">
          <AlertDialogCancel
            className="border bg-[#F5F5F5] size-[30px] rounded-full flex items-center justify-center"
            onClick={onClose}
          >
            <X size={18} color="#3B3B3B" />
          </AlertDialogCancel>
        </div>

        {/* Header */}
        {(title || icon) && (
          <AlertDialogHeader>
            <div className="flex flex-col items-center justify-center gap-2 ">
              {icon && (
                <span className="w-[50px] h-[50px] bg-[#01AD731A] rounded-full flex items-center justify-center">
                  {icon}
                </span>
              )}
              {title && (
                <h3 className="font-medium text-[22px] text-[#121212] text-center">
                  {title}
                </h3>
              )}
            </div>
          </AlertDialogHeader>
        )}

        {children}
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default Modal;
