"use client";

import { Suspense, useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAcceptAdminInvite } from "@/features/auth/hooks/useAcceptAdminInvite";

const Spinner = () => (
  <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-[#3B3B3B]" />
);

const AcceptInviteContent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const hasAccepted = useRef(false);

  // On success the hook sets auth + redirects to /admin. `isError` lets us show
  // a recoverable state; the axios interceptor surfaces the backend's message.
  const { mutate, isError } = useAcceptAdminInvite();

  useEffect(() => {
    if (hasAccepted.current || !token) return;
    hasAccepted.current = true;
    mutate(token);
  }, [token, mutate]);

  if (!token) {
    return (
      <div className="mx-auto w-full max-w-md text-center">
        <h1 className="text-lg font-medium text-[#3B3B3B]">
          Invalid invitation link
        </h1>
        <p className="mt-2 text-sm text-[#6F6E6C]">
          This link is missing its token. Please use the button in your
          invitation email, or ask an admin to resend the invite.
        </p>
        <button
          onClick={() => router.replace("/auth/login")}
          className="mt-6 rounded-full bg-[#3B3B3B] px-8 py-3 text-sm text-white transition-colors hover:bg-[#2f2f2f]"
        >
          Go to login
        </button>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="mx-auto w-full max-w-md text-center">
        <h1 className="text-lg font-medium text-[#3B3B3B]">
          We couldn&apos;t accept this invitation
        </h1>
        <p className="mt-2 text-sm text-[#6F6E6C]">
          The link may have expired or already been used. Please ask an admin to
          resend your invitation.
        </p>
        <button
          onClick={() => router.replace("/auth/login")}
          className="mt-6 rounded-full bg-[#3B3B3B] px-8 py-3 text-sm text-white transition-colors hover:bg-[#2f2f2f]"
        >
          Go to login
        </button>
      </div>
    );
  }

  // Pending: acceptance in flight. On success the hook redirects to /admin.
  return (
    <div className="mx-auto flex w-full max-w-md flex-col items-center gap-4 text-center">
      <Spinner />
      <p className="text-sm text-[#6F6E6C]">Accepting your invitation…</p>
    </div>
  );
};

const AcceptInvitePage = () => {
  return (
    <Suspense
      fallback={
        <div className="mx-auto flex w-full max-w-md justify-center">
          <Spinner />
        </div>
      }
    >
      <AcceptInviteContent />
    </Suspense>
  );
};

export default AcceptInvitePage;
