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
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000, // 1 minute
            gcTime: 1000 * 60 * 60 * 24, // 24 hours
            refetchOnWindowFocus: false,
            retry: 1,
          },
        },
      }),
  );
  const pathname = usePathname() ?? "";

  const pathSegments = pathname.split("/").filter(Boolean);
  const excludedSegments = ["auth", "admin", "coming-soon"];
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
