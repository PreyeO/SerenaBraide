"use client";

import React from "react";

import {
  Sidebar,
  SidebarProvider,
  SidebarInset,
  SidebarRail,
} from "@/components/ui/sidebar";
import SidebarMenu from "./SidebarMenu";
import Header from "@/components/layout/Header";
import { useAuthStore } from "@/features/auth/auth.store";

const CustomerDashboard = ({ children }: { children: React.ReactNode }) => {
  const { getRole } = useAuthStore();
  const role = getRole() ?? "customer"; // fallback

  return (
    <SidebarProvider className=" my-[190px]">
      <div className="flex min-h-screen w-full ">
        <Sidebar className=" ml-16 mb-[50px] h-full " variant="floating">
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
          <main className="mr-16  pl-[34px] ">{children}</main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default CustomerDashboard;
