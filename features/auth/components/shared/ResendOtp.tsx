"use client";

import { useState, useEffect } from "react";
import { useResendOtp } from "@/features/auth/hooks/useResendOtp";

interface ResendOtpProps {
  email: string;
}

const ResendOtp = ({ email }: ResendOtpProps) => {
  const { mutate: resend, isPending: isResending } = useResendOtp();
  const [resendTimer, setResendTimer] = useState(0);

  useEffect(() => {
    const storedTimestamp = sessionStorage.getItem("otp-resend-time");
    if (storedTimestamp) {
      const remaining = Math.floor(
        (Number(storedTimestamp) - Date.now()) / 1000
      );
      if (remaining > 0) setResendTimer(remaining);
      else sessionStorage.removeItem("otp-resend-time");
    }
  }, []);

  useEffect(() => {
    if (resendTimer === 0) return;

    const interval = setInterval(() => {
      setResendTimer((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          sessionStorage.removeItem("otp-resend-time");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [resendTimer]);

  const startResendCountdown = () => {
    const duration = 22; // seconds
    setResendTimer(duration);
    sessionStorage.setItem(
      "otp-resend-time",
      (Date.now() + duration * 1000).toString()
    );
  };

  const handleResend = () => {
    if (resendTimer === 0) {
      resend(email, { onSuccess: () => startResendCountdown() });
    }
  };

  return (
    <div className="flex flex-col justify-center gap-[6px] items-center">
      <span className="text-sm text-[#6F6E6C] font-normal">
        {`Didn't`} receive the code?{" "}
        <button
          type="button"
          onClick={handleResend}
          disabled={resendTimer > 0 || isResending}
          className={`underline font-medium text-[#3B3B3B] bg-transparent p-0 border-0 ${
            resendTimer > 0 ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
          }`}
        >
          {isResending ? "Resending..." : "Resend OTP"}
        </button>
      </span>

      {resendTimer > 0 && (
        <p className="font-normal text-sm text-[#6F6E6C]">
          You can request a new OTP in{" "}
          <span className="text-[#3B3B3B]">{resendTimer}</span> seconds.
        </p>
      )}
    </div>
  );
};

export default ResendOtp;
