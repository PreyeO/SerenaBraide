"use client";

import VerifyOtpForm from "@/features/auth/components/forms/VerifyOtpForm";
import { useAuthStore } from "@/features/auth/auth.store";

const VerifyOtpPage = () => {
  const user = useAuthStore((state) => state.user);

  if (!user) {
    return (
      <p className="text-center mt-20">
        No email found. Please register first.
      </p>
    );
  }

  return <VerifyOtpForm email={user.email} />;
};

export default VerifyOtpPage;
