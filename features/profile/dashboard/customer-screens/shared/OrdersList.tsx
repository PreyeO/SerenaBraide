import OrdersProductCard from "./OrdersProductCard";
import OrdersTabCard from "./OrdersTabCard";
import OrdersSearchFilter from "./OrdersSearchFilter";
import OrderSkeleton from "./OrderSkeleton";
import { OrderInfo } from "@/features/profile/type/customers/profile.type";
import EmptyOrders from "../empty-screens/EmptyOrders";

interface OrdersListProps {
  orders: OrderInfo[];
  activeTab: string;
  searchQuery: string;
  onTabChange: (value: string) => void;
  onSearchChange: (value: string) => void;
  showTabs?: boolean;
  showSearchFilter?: boolean;
  tabs?: Array<{ value: string; label: string }>;
  orderDetail?: string;
  isLoading?: boolean;
}

const OrdersList: React.FC<OrdersListProps> = ({
  orders,
  activeTab,
  searchQuery,
  onTabChange,
  onSearchChange,
  showTabs = true,
  showSearchFilter = true,
  tabs,
  orderDetail = "View Details",
  isLoading = false,
}) => {
  return (
    <section className="flex flex-col gap-4 lg:gap-6">
      {showTabs ? (
        <OrdersTabCard
          activeTab={activeTab}
          onTabChange={onTabChange}
          searchQuery={searchQuery}
          onSearchChange={onSearchChange}
          tabs={tabs}
        />
      ) : showSearchFilter !== false ? (
        <OrdersSearchFilter
          searchQuery={searchQuery}
          onSearchChange={onSearchChange}
        />
      ) : null}

      <div className="flex flex-col gap-4 lg:gap-6">
        {isLoading ? (
          <>
            <OrderSkeleton />
            <OrderSkeleton />
          </>
        ) : orders.length === 0 ? (
          <EmptyOrders />
        ) : (
          <div className="space-y-4 lg:space-y-6">
            {orders.map((order, index) => (
              <div
                key={`${order.orderNumber}-${index}`}
                className="opacity-0 animate-[fadeIn_0.3s_ease-in-out_forwards]"
                style={{ animationDelay: `${Math.min(index * 50, 300)}ms` }}
              >
                <OrdersProductCard order={order} orderDetail={orderDetail} />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default OrdersList;

