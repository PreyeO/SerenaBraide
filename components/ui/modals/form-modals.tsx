"use client";

import React, { ReactNode } from "react";
import { X } from "lucide-react";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  showVideo?: boolean; // instead of icon
  children: ReactNode;
}

const FormModal: React.FC<ModalProps> = ({
  open,
  onClose,
  title,
  showVideo,
  children,
}) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
      <div className="bg-white w-full px-6 pb-[34px] max-w-lg rounded-lg shadow-lg relative maxh-[90vh]">
        {/* Close button */}
        <div className="flex justify-end mt-2">
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-gray-200 bg-[#F5F5F5]"
          >
            <X className="w-5 h-5" color="#3B3B3B" />
          </button>
        </div>

        {/* Title + MP4 animation */}
        {(title || showVideo) && (
          <div className="flex flex-col items-center justify-center gap-2 mt-2">
            {showVideo && (
              <div className="flex justify-center ">
                <video
                  src="/success-icon.mp4"
                  autoPlay
                  loop
                  muted
                  className="w-[100px] h-[100px] "
                />
              </div>
            )}

            {title && (
              <h3 className="font-medium text-[22px] text-[#121212] text-center">
                {title}
              </h3>
            )}
          </div>
        )}

        {/* Modal content */}
        <div className="flex flex-col items-center justify-center w-full pt-[30px]">
          {children}
        </div>
      </div>
    </div>
  );
};

export default FormModal;
