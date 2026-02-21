"use client";

import LoadingState from "@/components/ui/loaders/loading-state";
import { useAuthStore } from "@/features/auth/auth.store";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface AdminAuthGuardProps {
  children: React.ReactNode;
}

const AdminAuthGuard = ({ children }: AdminAuthGuardProps) => {
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

    // Check if user is admin
    const isAdmin = user.is_superuser || user.is_admin;

    if (!isAdmin) {
      // User is logged in but not an admin - redirect to customer dashboard or home
      router.replace("/profile");
      return;
    }

    // User is authorized
    setIsAuthorized(true);
  }, [isHydrated, user, tokens, isTokenExpired, router]);

  // Show loading state while checking auth
  if (!isHydrated || !isAuthorized) {
    return <LoadingState />;
  }

  return <>{children}</>;
};

export default AdminAuthGuard;













