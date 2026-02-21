"use client";

import CustomerAuthGuard from "@/features/auth/components/CustomerAuthGuard";

const CheckoutLayout = ({ children }: { children: React.ReactNode }) => {
  return <CustomerAuthGuard>{children}</CustomerAuthGuard>;
};

export default CheckoutLayout;














