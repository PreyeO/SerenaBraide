"use client";

import CustomerAuthGuard from "@/features/auth/components/CustomerAuthGuard";

const PaymentLayout = ({ children }: { children: React.ReactNode }) => {
  return <CustomerAuthGuard>{children}</CustomerAuthGuard>;
};

export default PaymentLayout;

