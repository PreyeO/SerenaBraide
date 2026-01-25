import { Suspense } from "react";
import LoginForm from "@/features/auth/components/forms/LoginForm";

const AdminLoginPage = () => {
  return (
    <Suspense fallback={<div className="flex items-center justify-center min-h-screen">Loading...</div>}>
      <LoginForm />
    </Suspense>
  );
};
export default AdminLoginPage;
