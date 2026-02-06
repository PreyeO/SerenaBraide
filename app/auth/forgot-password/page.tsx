import { Suspense } from "react";
import ForgotPasswordForm from "@/features/auth/components/forms/ForgetPasswordForm";
import LoadingState from "@/components/ui/loaders/loading-state";

const ForgotPasswordPage = () => {
  return (
    <Suspense
      fallback={
        <>
          <LoadingState />
        </>
      }
    >
      <ForgotPasswordForm />
    </Suspense>
  );
};
export default ForgotPasswordPage;
