"use client";

import { useGetOrders } from "@/features/profile/hooks/admin/useGetOrders";
import OrdersTable from "./components/tables/OrdersTable";
import SubHeading from "@/components/ui/typography/subHeading";

const OrdersScreen = () => {
  const { data: ordersData, isLoading } = useGetOrders();

  if (isLoading) return <p className="py-12 text-center text-[#6F6E6C]">Loading orders...</p>;

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


