"use client";

import { useGetOrders } from "@/features/profile/hooks/admin/useGetOrders";
import OrdersTable from "./components/tables/OrdersTable";
import SubHeading from "@/components/ui/typography/subHeading";
import DashboardLoader from "@/components/ui/loaders/dasboard-loader";

const OrdersScreen = () => {
  const { data: ordersData, isLoading } = useGetOrders();

  if (isLoading) return <DashboardLoader />;

  return (
    <section className="py-7.5">
      <SubHeading
        title="All Orders"
        className="text-sm text-[#3B3B3B] font-semibold pb-6"
      />

      <OrdersTable orders={ordersData?.results || []} />
    </section>
  );
};

export default OrdersScreen;











