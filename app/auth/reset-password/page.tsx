import { Suspense } from "react";
import ResetPasswordForm from "@/features/auth/components/forms/ResetPasswordForm";

const ResetPasswordPage = () => {
  return (
    <Suspense fallback={<div className="flex items-center justify-center min-h-screen">Loading...</div>}>
      <ResetPasswordForm />
    </Suspense>
  );
};
export default ResetPasswordPage;
