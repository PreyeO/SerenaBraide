import OrdersProductCard from "./OrdersProductCard";
import OrdersTabCard from "./OrdersTabCard";
import OrdersSearchFilter from "./OrdersSearchFilter";
import OrderSkeleton from "./OrderSkeleton";
import { OrderInfo } from "@/features/profile/type/customers/profile.type";
import EmptyOrders from "../empty-screens/EmptyOrders";
import { useOrderFiltering } from "@/features/profile/hooks/customer/useOrderFiltering";

interface OrdersListProps {
  orders: OrderInfo[];
  activeTab: string;
  searchQuery: string;
  filterValue: string;
  onTabChange: (value: string) => void;
  onSearchChange: (value: string) => void;
  onFilterChange: (value: string) => void;
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
  filterValue,
  onTabChange,
  onSearchChange,
  onFilterChange,
  showTabs = true,
  showSearchFilter = true,
  tabs,
  orderDetail = "View Details",
  isLoading = false,
}) => {
  const { filteredOrders, isFiltering } = useOrderFiltering({
    orders,
    filterValue,
  });

  const displayLoading = isLoading || isFiltering;

  return (
    <section className="flex flex-col gap-4 lg:gap-6">
      {showTabs ? (
        <OrdersTabCard
          activeTab={activeTab}
          onTabChange={onTabChange}
          searchQuery={searchQuery}
          onSearchChange={onSearchChange}
          filterValue={filterValue}
          onFilterChange={onFilterChange}
          tabs={tabs}
        />
      ) : showSearchFilter !== false ? (
        <OrdersSearchFilter
          searchQuery={searchQuery}
          onSearchChange={onSearchChange}
          filterValue={filterValue}
          onFilterChange={onFilterChange}
        />
      ) : null}

      <div className="flex flex-col gap-4 lg:gap-6">
        {displayLoading ? (
          <>
            <OrderSkeleton />
            <OrderSkeleton />
          </>
        ) : orders.length === 0 ? (
          // Show EmptyOrders when there are no orders at all
          <EmptyOrders />
        ) : filteredOrders.length > 0 ? (
          <div className="space-y-4 lg:space-y-6">
            {filteredOrders.map((order, index) => (
              <div
                key={`${order.orderNumber}-${index}`}
                className="opacity-0 animate-[fadeIn_0.3s_ease-in-out_forwards]"
                style={{ animationDelay: `${Math.min(index * 50, 300)}ms` }}
              >
                <OrdersProductCard order={order} orderDetail={orderDetail} />
              </div>
            ))}
          </div>
        ) : (
          // Show this message when orders exist but filters result in no matches
          <div className="text-center py-12 text-[#6F6E6C]">
            <p className="text-sm lg:text-base">
              No orders found matching your criteria.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default OrdersList;
