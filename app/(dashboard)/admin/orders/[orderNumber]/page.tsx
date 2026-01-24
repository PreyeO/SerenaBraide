import OrderDetailScreen from "@/features/profile/dashboard/admin-screens/OrderDetailScreen";

interface OrderDetailPageProps {
  params: Promise<{
    orderNumber: string;
  }>;
}

const OrderDetailPage = async ({ params }: OrderDetailPageProps) => {
  const { orderNumber } = await params;
  return <OrderDetailScreen orderNumber={parseInt(orderNumber)} />;
};

export default OrderDetailPage;
