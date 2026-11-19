"use client";

import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import NavBar from "@/components/layout/nav-bar/NavBar";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { usePathname } from "next/navigation";
import { ReactNode, useState } from "react";
import { Toaster } from "sonner";
import { LazyMotion } from "framer-motion";

// Animation engine is fetched after the page loads (see lib/motion-features.ts).
// Components must use `m.div` / `m.span` from framer-motion, not `motion.*`,
// or the full library gets bundled back into every page.
const loadMotionFeatures = () =>
  import("@/lib/motion-features").then((mod) => mod.default);

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
  const excludedSegments = ["auth", "admin", "coming-soon", "view-giftcard"];
  const isExcludedRoute = pathSegments.some((segment) =>
    excludedSegments.includes(segment),
  );

  return (
    <QueryClientProvider client={queryClient}>
      <LazyMotion features={loadMotionFeatures}>
        {!isExcludedRoute && <Header />}
        {!isExcludedRoute && <NavBar />}
        {children}
        {!isExcludedRoute && <Footer />}
      </LazyMotion>
      <Toaster />
    </QueryClientProvider>
  );
}
