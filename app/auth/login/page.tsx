import { Suspense } from "react";
import LoginForm from "@/features/auth/components/forms/LoginForm";
import LoadingState from "@/components/ui/loaders/loading-state";

const LoginPage = () => {
  return (
    <Suspense
      fallback={
        <>
          <LoadingState />
        </>
      }
    >
      <LoginForm />
    </Suspense>
  );
};
export default LoginPage;
