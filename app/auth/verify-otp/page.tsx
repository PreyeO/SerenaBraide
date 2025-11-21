"use client";

import VerifyOtpForm from "@/features/auth/components/forms/VerifyOtpForm";
import { useSearchParams } from "next/navigation";

const VerifyOtpPage = () => {
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

export default VerifyOtpPage;
