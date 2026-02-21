"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";

interface LogoutModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const LogoutModal: React.FC<LogoutModalProps> = ({
  open,
  onClose,
  onConfirm,
}) => {
  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader className="space-y-4">
          <div className="flex justify-center">
            <div className="w-16 h-16 rounded-full bg-[#F5F5F5] flex items-center justify-center">
              <LogOut className="w-8 h-8 text-[#6F6E6C]" />
            </div>
          </div>
          <DialogTitle className="text-center text-xl font-semibold text-[#3B3B3B]">
            Are you sure you want to log out?
          </DialogTitle>
          <DialogDescription className="text-center text-sm text-[#6F6E6C]">
            {`You'll need to sign in again to access your dashboard.`}
          </DialogDescription>
        </DialogHeader>
        <div className="flex gap-3 mt-6">
          <Button
            variant="outline"
            onClick={onClose}
            className="flex-1 border border-[#D1D5DB] text-[#3B3B3B] hover:bg-[#F5F5F5]"
          >
            No, keep working
          </Button>
          <Button
            onClick={handleConfirm}
            className="flex-1 bg-red-600 hover:bg-red-700 text-white"
          >
            Yes, Log me out
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LogoutModal;
