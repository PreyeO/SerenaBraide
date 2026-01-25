"use client";

import { Suspense } from "react";
import VerifyOtpForm from "@/features/auth/components/forms/VerifyOtpForm";
import { useSearchParams } from "next/navigation";

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
    <Suspense fallback={<div className="flex items-center justify-center min-h-screen">Loading...</div>}>
      <VerifyOtpContent />
    </Suspense>
  );
};

export default VerifyOtpPage;
