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
      // Admin-invite emails link to /admin?token=... — hand the token off to the
      // accept-invite flow (which accepts the invite and logs the user in)
      // instead of bouncing straight to login and dropping the token.
      const inviteToken = new URLSearchParams(window.location.search).get(
        "token",
      );
      if (inviteToken) {
        router.replace(`/auth/accept-invite?token=${inviteToken}`);
        return;
      }

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
















