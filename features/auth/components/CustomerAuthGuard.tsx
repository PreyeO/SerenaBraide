"use client";

import LoadingState from "@/components/ui/loaders/loading-state";
import { useAuthStore } from "@/features/auth/auth.store";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface CustomerAuthGuardProps {
  children: React.ReactNode;
}

const CustomerAuthGuard = ({ children }: CustomerAuthGuardProps) => {
  const router = useRouter();
  const { user, tokens, isHydrated, isTokenExpired } = useAuthStore();
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    // Wait for hydration to complete before checking auth
    if (!isHydrated) return;

    // Check if user is logged in
    const hasValidToken = tokens?.access && !isTokenExpired();
    const isLoggedIn = !!user && hasValidToken;

    if (!isLoggedIn) {
      // Redirect to login with return URL
      const currentPath = window.location.pathname;
      router.replace(
        `/auth/login?return_url=${encodeURIComponent(currentPath)}`,
      );
      return;
    }

    // User is authorized (any logged-in user can access customer routes)
    setIsAuthorized(true);
  }, [isHydrated, user, tokens, isTokenExpired, router]);

  // Show loading state while checking auth
  if (!isHydrated || !isAuthorized) {
    return <LoadingState />;
  }

  return <>{children}</>;
};

export default CustomerAuthGuard;










