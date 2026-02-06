import { Suspense } from "react";
import RegisterForm from "@/features/auth/components/forms/RegisterForm";

const RegisterPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <RegisterForm />
    </Suspense>
  );
};
export default RegisterPage;
