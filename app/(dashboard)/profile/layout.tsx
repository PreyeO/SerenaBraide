"use client";

import CustomerAuthGuard from "@/features/auth/components/CustomerAuthGuard";
import CustomerDashboard from "@/features/profile/dashboard/layout/CustomerDashboard";

const CustomerLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <CustomerAuthGuard>
      <CustomerDashboard>{children}</CustomerDashboard>
    </CustomerAuthGuard>
  );
};

export default CustomerLayout;
