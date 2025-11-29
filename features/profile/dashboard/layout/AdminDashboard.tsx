"use client";

import React from "react";

import {
  Sidebar,
  SidebarProvider,
  SidebarInset,
  SidebarRail,
} from "@/components/ui/sidebar";
import { useAuthStore } from "@/features/auth/auth.store";
import Header from "./Header";
import SidebarMenu from "./SidebarMenu";

const AdminDashboard = ({ children }: { children: React.ReactNode }) => {
  const { getRole } = useAuthStore();
  const role = getRole() ?? "admin"; // fallback

  return (
    <SidebarProvider className="">
      <div className="flex min-h-screen w-full">
        <Sidebar className="fixed inset-y-0 ">
          {role && (
            <SidebarMenu
              role={role}
              activeBg="bg-sidebar-accent"
              activeText="text-text-sidebar-accent-foreground "
            />
          )}
          <SidebarRail />
        </Sidebar>

        <SidebarInset>
          <Header />
          <main className="p-6 bg-[#F8F8F8]">{children}</main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default AdminDashboard;
