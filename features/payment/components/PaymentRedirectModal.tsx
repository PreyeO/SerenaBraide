"use client";

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
} from "@/components/ui/alert-dialog";
import SubHeading from "@/components/ui/typography/subHeading";
import Paragraph from "@/components/ui/typography/paragraph";
import LinkCta from "@/components/ui/btns/link-cta";
import Link from "next/link";
import { PaymentResponse } from "../payment.type";

interface PaymentRedirectModalProps {
  isOpen: boolean;
  paymentData: PaymentResponse | null;
  onClose: () => void;
}

const PaymentRedirectModal = ({
  isOpen,
  paymentData,
  onClose,
}: PaymentRedirectModalProps) => {
  if (!isOpen || !paymentData) return null;

  const isVerified = paymentData.redirect_verified === true;

  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent className="px-7 w-full rounded-xl text-center pb-6">
        {isVerified ? (
          <>
            {/* Success GIF */}
            <div className="flex justify-center mb-4">
              <video
                src="/payment-success.mp4"
                autoPlay
                loop
                muted
                className="w-37.5 h-auto rounded-md"
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
                className="pt-1.5 text-[#6C6C6C] font-normal text-base leading-6 mt-2"
                content="Thank you for your purchase. Your order is being processed and will be on its way soon."
              />
              <span className="mt-4 bg-[#F5F5F5] px-1.3 py-1.5 rounded-[5px] text-[12px] font-normal text-[#6F6E6C]">
                Order #{paymentData.order}
              </span>

              <div className="mt-6 flex flex-col gap-5 w-full">
                <Link href={`/profile/orders`}>
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
          </>
        ) : (
          <>
            {/* Error/Failed State */}
            <div className="flex justify-center mb-4">
              <div className="w-20 h-20 rounded-full bg-red-100 flex items-center justify-center">
                <svg
                  className="w-10 h-10 text-red-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </div>
            </div>
            <div className="flex flex-col justify-center items-center">
              <AlertDialogHeader>
                <SubHeading
                  className="text-[22px] text-[#121212] font-medium"
                  title="Payment Verification Failed"
                />
              </AlertDialogHeader>

              <Paragraph
                className="pt-1.5 text-[#6C6C6C] font-normal text-base leading-6 mt-2"
                content="We couldn't verify your payment. Please contact support if you've already made the payment, or try again."
              />

              <div className="mt-6 flex flex-col gap-5 w-full">
                <Link href="/checkout">
                  <LinkCta
                    className="bg-[#3B3B3B] w-full text-white hover:bg-[#2f2f2f]"
                    label="Try Again"
                  />
                </Link>
                <Link href="/">
                  <LinkCta
                    className="text-[#3B3B3B] border border-[#6F6E6C] w-full bg-white"
                    label="Back to Home"
                  />
                </Link>
              </div>
            </div>
          </>
        )}
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default PaymentRedirectModal;

