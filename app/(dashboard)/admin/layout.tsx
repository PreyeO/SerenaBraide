"use client";

import AdminAuthGuard from "@/features/auth/components/AdminAuthGuard";
import AdminDashboard from "@/features/profile/dashboard/layout/AdminDashboard";
import { ThemeProvider } from "@/features/profile/dashboard/layout/theme-provider";

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="light"
      enableSystem
      disableTransitionOnChange
    >
      <AdminAuthGuard>
        <AdminDashboard>{children}</AdminDashboard>
      </AdminAuthGuard>
    </ThemeProvider>
  );
};

export default AdminLayout;
