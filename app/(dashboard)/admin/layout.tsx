import AdminDashboard from "@/features/profile/dashboard/layout/AdminDashboard";

const CustomerLayout = ({ children }: { children: React.ReactNode }) => {
  return <AdminDashboard>{children}</AdminDashboard>;
};
export default CustomerLayout;
