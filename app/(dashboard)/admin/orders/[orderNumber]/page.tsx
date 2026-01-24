import OrderDetailScreen from "@/features/profile/dashboard/admin-screens/OrderDetailScreen";

interface OrderDetailPageProps {
  params: {
    orderNumber: string;
  };
}

const OrderDetailPage = ({ params }: OrderDetailPageProps) => {
  return <OrderDetailScreen orderNumber={parseInt(params.orderNumber)} />;
};

export default OrderDetailPage;

