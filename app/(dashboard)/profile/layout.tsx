import CustomerDashboard from "@/features/profile/dashboard/layout/CustomerDashboard";

const CustomerLayout = ({ children }: { children: React.ReactNode }) => {
  return <CustomerDashboard>{children}</CustomerDashboard>;
};
export default CustomerLayout;
