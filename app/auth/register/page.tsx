import { Suspense } from "react";
import RegisterForm from "@/features/auth/components/forms/RegisterForm";
import LoadingState from "@/components/ui/loaders/loading-state";

const RegisterPage = () => {
  return (
    <Suspense
      fallback={
        <>
          <LoadingState />
        </>
      }
    >
      <RegisterForm />
    </Suspense>
  );
};
export default RegisterPage;
