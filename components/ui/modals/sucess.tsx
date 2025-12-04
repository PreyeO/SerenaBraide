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

const SuccessModal = ({ isOpen }: SuccessModalProps) => {
  if (!isOpen) return null;

  return (
    <AlertDialog open={isOpen}>
      <AlertDialogContent className="px-[28px] w-full rounded-xl text-center pb-6">
        {/* GIF */}
        <div className="flex justify-center mb-4">
          <video
            src="/payment-success.mp4" // put this in your public folder
            autoPlay
            loop
            muted
            className="w-[150px] h-auto rounded-md"
          />
        </div>
        <div className="flex flex-col justify-center items-center">
          <AlertDialogHeader>
            <SubHeading
              className="text-[22px] text-[#121212] font-medium"
              title="Payment Successful"
            />
          </AlertDialogHeader>

          <Paragraph
            className="pt-[6px] text-[#6C6C6C] font-normal text-base leading-6 mt-2"
            content="Thank you for your purchase. Your order is being processed and will be on its way soon."
          />
          <span className=" mt-4 bg-[#F5F5F5] px-[5px] py-[5px] rounded-[5px] text-[12px] font-normal text-[#6F6E6C]">
            Order #SB39460
          </span>

          <div className="mt-6 flex flex-col gap-5 w-full">
            <Link href="">
              <LinkCta
                className="bg-[#3B3B3B] w-full text-white hover:bg-[#2f2f2f]"
                label="View Order Summary"
              />
            </Link>
            <Link href="/">
              <LinkCta
                className="text-[#3B3B3B] border border-[#6F6E6C] w-full bg-white"
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
