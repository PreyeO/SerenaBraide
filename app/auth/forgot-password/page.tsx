import { Suspense } from "react";
import ForgotPasswordForm from "@/features/auth/components/forms/ForgetPasswordForm";

const ForgotPasswordPage = () => {
  return (
    <Suspense fallback={<div className="flex items-center justify-center min-h-screen">Loading...</div>}>
      <ForgotPasswordForm />
    </Suspense>
  );
};
export default ForgotPasswordPage;
