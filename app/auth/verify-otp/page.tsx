"use client";

import { Suspense } from "react";
import VerifyOtpForm from "@/features/auth/components/forms/VerifyOtpForm";
import { useSearchParams } from "next/navigation";
import LoadingState from "@/components/ui/loaders/loading-state";

const VerifyOtpContent = () => {
  const searchParams = useSearchParams();
  const email = searchParams.get("email");

  if (!email) {
    return (
      <p className="text-center mt-20">
        No email found. Please register first.
      </p>
    );
  }

  return <VerifyOtpForm email={email} />;
};

const VerifyOtpPage = () => {
  return (
    <Suspense
      fallback={
        <>
          <LoadingState />
        </>
      }
    >
      <VerifyOtpContent />
    </Suspense>
  );
};

export default VerifyOtpPage;
