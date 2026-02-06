import { Suspense } from "react";
import ResetPasswordForm from "@/features/auth/components/forms/ResetPasswordForm";
import LoadingState from "@/components/ui/loaders/loading-state";

const ResetPasswordPage = () => {
  return (
    <Suspense
      fallback={
        <>
          <LoadingState />
        </>
      }
    >
      <ResetPasswordForm />
    </Suspense>
  );
};
export default ResetPasswordPage;
