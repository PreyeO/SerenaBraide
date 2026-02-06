"use client";

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
} from "@/components/ui/alert-dialog";
import SubHeading from "../typography/subHeading";
import Paragraph from "../typography/paragraph";
import LinkCta from "../btns/link-cta";
import Link from "next/link";

interface SuccessModalProps {
  isOpen: boolean;
  message?: string;
}

const SuccessModal = ({ isOpen, message }: SuccessModalProps) => {
  if (!isOpen) return null;

  return (
    <AlertDialog open={isOpen}>
      <AlertDialogContent className="px-7 w-full rounded-xl text-center pb-6">
        {/* GIF */}
        <div className="flex justify-center lg:mb-4 mb-2">
          <video
            src="/payment-success.mp4" // put this in your public folder
            autoPlay
            loop
            muted
            className="lg:w-37.5 w-25 h-auto rounded-md"
          />
        </div>
        <div className="flex flex-col justify-center items-center">
          <AlertDialogHeader>
            <SubHeading
              className="lg:text-[22px] text-lg text-[#121212] font-medium"
              title="Payment Successful"
            />
          </AlertDialogHeader>

          <Paragraph
            className="pt-1.5 text-[#6C6C6C] font-normal lg:text-base text-sm leading-6 mt-2"
            content={
              message ??
              "Thank you for your purchase. Your order is being processed and will be on its way soon."
            }
          />

          <div className="lg:mt-6 mt-4 flex flex-col gap-5 w-full">
            <Link href="/profile/order">
              <LinkCta
                className="bg-[#3B3B3B] w-full text-white hover:bg-[#2f2f2f]"
                label="View Order Summary"
              />
            </Link>
            <Link href="/">
              <LinkCta
                className="text-[#3B3B3B] border border-[#6F6E6C] w-full bg-white hover:bg-transparent"
                label="Continue Shopping"
              />
            </Link>
          </div>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default SuccessModal;
