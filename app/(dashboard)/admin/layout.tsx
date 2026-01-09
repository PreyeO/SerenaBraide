"use client";

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
      <AdminDashboard>{children}</AdminDashboard>
    </ThemeProvider>
  );
};

export default AdminLayout;
