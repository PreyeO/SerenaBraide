"use client";

import FulfilmentStatus from "../shared/FulfilmentStatus";
import { useGetAddresses } from "@/features/cart-checkout/hooks/useGetAddresses";
import LoadingState from "@/components/ui/loaders/loading-state";
import { FulfilmentType } from "@/features/profile/type/customers/profile.type";
import { BadgeCheckIcon, BookDown, CalendarClock } from "lucide-react";
import { useOrderDetail } from "@/features/cart-checkout/hooks/useOrderDetail";
import { formatCurrency } from "@/lib/utils";

interface FulfilmentDetailsProps {
  statusType: FulfilmentType;
  orderNumber: number | null;
}

const FulfilmentDetails = ({
  statusType,
  orderNumber,
}: FulfilmentDetailsProps) => {
  const { data: orderDetail, isLoading: isLoadingOrder } =
    useOrderDetail(orderNumber);
  const { data: addresses, isLoading: isLoadingAddresses } = useGetAddresses();

  if (isLoadingOrder || isLoadingAddresses) {
    return <LoadingState />;
  }

  if (!orderDetail || !orderNumber) {
    return (
      <div className="text-center py-12 text-[#6F6E6C]">
        <p className="text-sm sm:text-base">Order not found.</p>
      </div>
    );
  }

  // Get default address or first address
  const shippingAddress =
    addresses?.find((addr) => addr.is_default) || addresses?.[0];

  // Get status config
  const getStatusConfig = () => {
    switch (statusType) {
      case "DELIVERED":
        return {
          icon: BadgeCheckIcon,
          iconBg: "#01AD73",
          color: "#01AD73",
          status: "Delivered",
        };
      case "PROCESSING":
        return {
          icon: CalendarClock,
          iconBg: "#D97705",
          color: "#D97705",
          status: "Processing",
        };
      case "IN_TRANSIT":
        return {
          icon: BookDown,
          iconBg: "#2F88FF",
          color: "#2F88FF",
          status: "In Transit",
        };
    }
  };

  const statusConfig = getStatusConfig();

  // Check if this is a gift card order (no items but has purchased_gift_card)
  const isGiftCardOrder =
    orderDetail.items.length === 0 && orderDetail.purchased_gift_card;

  if (isGiftCardOrder) {
    const giftCard = orderDetail.purchased_gift_card!;
    return (
      <div className="space-y-6">
        <FulfilmentStatus
          statusType={statusType}
          header="Gift Card Order Details"
          status={statusConfig.status}
          title="Gift Card"
          src=""
          alt="Gift Card"
          color={statusConfig.color}
          icon={statusConfig.icon}
          iconBg={statusConfig.iconBg}
          price={formatCurrency(giftCard.initial_amount)}
          quantity="X1"
          size="Digital"
          orderDetail={orderDetail}
          shippingAddress={undefined} // Gift cards don't have shipping
          isGiftCard={true}
          giftCardNumber={giftCard.card_number}
          giftCardStatus={giftCard.status}
        />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {orderDetail.items.map((item) => {
        // Get primary image
        const primaryImage =
          item.variant.images.find((img) => img.is_primary) ||
          item.variant.images[0];

        return (
          <FulfilmentStatus
            key={item.id}
            statusType={statusType}
            header="Order details"
            status={statusConfig.status}
            title={item.variant.product_name}
            src={primaryImage?.image_url || ""}
            alt={primaryImage?.alt_text || "product image"}
            color={statusConfig.color}
            icon={statusConfig.icon}
            iconBg={statusConfig.iconBg}
            price={formatCurrency(item.price)}
            quantity={`X${item.quantity}`}
            size={item.variant.size || "N/A"}
            orderDetail={orderDetail}
            shippingAddress={shippingAddress}
          />
        );
      })}
    </div>
  );
};

export default FulfilmentDetails;

