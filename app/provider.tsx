"use client";

import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import NavBar from "@/components/layout/nav-bar/NavBar";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { usePathname } from "next/navigation";
import { ReactNode, useState } from "react";
import { Toaster } from "sonner";

export default function ReactQueryProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [queryClient] = useState(() => new QueryClient());
  const pathname = usePathname() ?? "";

  const pathSegments = pathname.split("/").filter(Boolean);
  const excludedSegments = ["auth", "admin"];
  const isExcludedRoute = pathSegments.some((segment) =>
    excludedSegments.includes(segment),
  );

  return (
    <QueryClientProvider client={queryClient}>
      {!isExcludedRoute && <Header />}
      {!isExcludedRoute && <NavBar />}
      {children}
      {!isExcludedRoute && <Footer />}
      <Toaster />
    </QueryClientProvider>
  );
}
