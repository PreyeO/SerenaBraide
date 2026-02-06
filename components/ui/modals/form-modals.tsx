"use client";

import React, { ReactNode } from "react";
import { X } from "lucide-react";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  showVideo?: boolean; // instead of icon
  children: ReactNode;
  className?: string;
}

const FormModal: React.FC<ModalProps> = ({
  open,
  onClose,
  title,
  showVideo,
  children,
  className,
}) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4 lg:p-0 ">
      <div className="lg:max-w-2xl max-w-81.75  bg-white w-full h-full lg:h-auto lg:max-h-[90vh] px-4 lg:px-6 pb-6 lg:pb-8.5 rounded-lg shadow-lg relative overflow-y-auto">
        {/* Close button */}
        <div className="flex justify-end mt-2 lg:mt-2 sticky top-0 bg-white pt-2 pb-2 z-10">
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-gray-200 bg-[#F5F5F5]"
          >
            <X className="w-5 h-5" color="#3B3B3B" />
          </button>
        </div>

        {/* Title + MP4 animation */}
        {(title || showVideo) && (
          <div
            className={`${className} flex flex-col items-center justify-center gap-2 mt-2 lg:mt-2`}
          >
            {showVideo && (
              <div className="flex justify-center">
                <video
                  src="/success-icon.mp4"
                  autoPlay
                  loop
                  muted
                  className="w-20 h-20 lg:w-25 lg:h-25"
                />
              </div>
            )}

            {title && (
              <h3 className="font-medium text-lg lg:text-[22px] text-[#121212] text-center">
                {title}
              </h3>
            )}
          </div>
        )}

        {/* Modal content */}
        <div className="flex flex-col items-center justify-center w-full pt-4 lg:pt-7.5">
          {children}
        </div>
      </div>
    </div>
  );
};

export default FormModal;
