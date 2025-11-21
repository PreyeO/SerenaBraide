import CustomerDashboard from "@/features/profile/components/layout/CustomerDashboard";

const CustomerLayout = ({ children }: { children: React.ReactNode }) => {
  return <CustomerDashboard>{children}</CustomerDashboard>;
};
export default CustomerLayout;
