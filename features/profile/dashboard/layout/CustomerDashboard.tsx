"use client";

import React from "react";

import {
  Sidebar,
  SidebarProvider,
  SidebarInset,
} from "@/components/ui/sidebar";

import { useAuthStore } from "@/features/auth/auth.store";
import SidebarMenu from "./SidebarMenu";

const CustomerDashboard = ({ children }: { children: React.ReactNode }) => {
  const { getRole } = useAuthStore();
  const role = getRole() ?? "customer"; // fallback

  return (
    <SidebarProvider className="mt-32.5 mb-12.5 lg:mb-0 lg:mt-0 lg:my-47.5">
      <div className="flex min-h-screen w-full">
        {/* Sidebar - hidden on mobile, shown on lg and above */}
        <Sidebar
          className="hidden md:block lg:ml-16 ml-1 mb-12.5 h-full"
          variant="floating"
        >
          <SidebarMenu
            role={role}
            activeBg="bg-[#3B3B3B] "
            activeText="text-[#F5F5F5]"
            hoverBg="hover:bg-[#3B3B3B]"
            hoverText="hover:text-[#F5F5F5]"
            textColor="text-[#6F6E6C]"
          />
        </Sidebar>

        <SidebarInset className="">
          {/* <Header /> */}
          <main className="px-4 md:px-0 lg:mr-16 lg:pl-8.5">{children}</main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default CustomerDashboard;
