"use client";

import CustomerAuthGuard from "@/features/auth/components/CustomerAuthGuard";

const GiftCardCheckoutLayout = ({ children }: { children: React.ReactNode }) => {
  return <CustomerAuthGuard>{children}</CustomerAuthGuard>;
};

export default GiftCardCheckoutLayout;


