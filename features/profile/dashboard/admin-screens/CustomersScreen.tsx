"use client";
import { CustomerTable } from "@/features/profile/dashboard/admin-screens/components/tables/CustomerTable";
import { Button } from "@/components/ui/button";
import SubHeading from "@/components/ui/typography/subHeading";
import { useGetCustomers } from "@/features/profile/hooks/admin/useCustomers";
import DashboardLoader from "@/components/ui/loaders/dasboard-loader";

const CustomersScreen = () => {
  const { data: customersResponse, isLoading } = useGetCustomers();

  if (isLoading) return <DashboardLoader />;

  const customers = customersResponse?.results || [];
  return (
    <section className="">
      <SubHeading
        title="Customer Management"
        className="text-sm text-[#3B3B3B] font-semibold pb-6"
      />
      <div className="py-7.5 flex flex-col gap-6 p-6">
        <div className="flex items-center justify-end">
          <div className="">
            <Button
              variant="outline"
              className="h-9 px-4 bg-gray-50 border-gray-200"
            >
              Export
            </Button>
          </div>
        </div>
        <CustomerTable data={customers} />
      </div>
    </section>
  );
};

export default CustomersScreen;
