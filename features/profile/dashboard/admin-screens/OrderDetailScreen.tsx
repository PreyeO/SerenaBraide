"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useGetOrderDetails } from "@/features/profile/hooks/admin/useGetOrderDetails";
import BackNavigation from "@/components/ui/btns/back-navigation";
import SubHeading from "@/components/ui/typography/subHeading";
import { Order } from "@/features/profile/type/customers/profile.type";
import { Button } from "@/components/ui/button";
import dynamic from "next/dynamic";

const UpdateShippingStatusModal = dynamic(
  () => import("./components/UpdateShippingStatusModal"),
  { ssr: false }
);
import { Edit } from "lucide-react";
import DashboardLoader from "@/components/ui/loaders/dasboard-loader";

interface OrderDetailScreenProps {
  orderNumber: number;
}

const OrderDetailScreen = ({ orderNumber }: OrderDetailScreenProps) => {
  const router = useRouter();
  const { data: order, isLoading } = useGetOrderDetails(orderNumber);
  const [isUpdateStatusModalOpen, setIsUpdateStatusModalOpen] = useState(false);

  const getStatusBadge = (status: string) => {
    const statusConfig: Record<
      string,
      { bg: string; text: string; label: string }
    > = {
      pending: {
        bg: "bg-orange-100",
        text: "text-orange-700",
        label: "Pending",
      },
      paid: { bg: "bg-blue-100", text: "text-blue-700", label: "Paid" },
      processing: {
        bg: "bg-yellow-100",
        text: "text-yellow-700",
        label: "Processing",
      },
      shipped: {
        bg: "bg-purple-100",
        text: "text-purple-700",
        label: "Shipped",
      },
      in_transit: {
        bg: "bg-indigo-100",
        text: "text-indigo-700",
        label: "In Transit",
      },
      delivered: {
        bg: "bg-green-100",
        text: "text-green-700",
        label: "Delivered",
      },
    };

    const config = statusConfig[status.toLowerCase()] || {
      bg: "bg-gray-100",
      text: "text-gray-700",
      label: status,
    };

    return (
      <span
        className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium ${config.bg} ${config.text}`}
      >
        {config.label}
      </span>
    );
  };

  const getDefaultAddress = (customerProfile: Order["customer_profile"]) => {
    if (typeof customerProfile === "number") {
      return null;
    }
    return (
      customerProfile.addresses.find((addr) => addr.is_default) ||
      customerProfile.addresses[0]
    );
  };

  if (isLoading) {
    return <DashboardLoader />;
  }

  if (!order) {
    return (
      <section className="py-7.5">
        <BackNavigation
          href="/admin/orders"
          text="Back to Orders"
          className="mb-6"
        />
        <div className="py-12 text-center">
          <p className="text-[#6F6E6C] mb-4">Order not found.</p>
          <button
            onClick={() => router.push("/admin/orders")}
            className="text-[#3B3B3B] hover:underline"
          >
            Return to Orders
          </button>
        </div>
      </section>
    );
  }

  const defaultAddress = getDefaultAddress(order.customer_profile);

  return (
    <section className="py-7.5">
      <BackNavigation
        href="/admin/orders"
        text="Back to Orders"
        className="mb-6"
      />

      <SubHeading
        title={`Order #${order.order_number}`}
        className="text-sm text-[#3B3B3B] font-semibold pb-6"
      />

      <div className="space-y-6">
        {/* Order Summary */}
        <div className="bg-white rounded-lg border border-[#F0F0F0] p-6">
          <h3 className="text-lg font-semibold text-[#3B3B3B] mb-4">
            Order Summary
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <p className="text-xs text-[#6F6E6C] mb-1">Status</p>
              {getStatusBadge(order.status)}
            </div>
            <div>
              <p className="text-xs text-[#6F6E6C] mb-1">Subtotal</p>
              <p className="font-semibold text-[#3B3B3B]">₦{order.subtotal}</p>
            </div>
            <div>
              <p className="text-xs text-[#6F6E6C] mb-1">Shipping</p>
              <p className="font-semibold text-[#3B3B3B]">
                ₦{order.shipping_cost}
              </p>
            </div>
            <div>
              <p className="text-xs text-[#6F6E6C] mb-1">Total Amount</p>
              <p className="font-semibold text-[#3B3B3B] text-lg">
                ₦{order.total_amount}
              </p>
            </div>
          </div>
        </div>

        {/* Order Items */}
        <div className="bg-white rounded-lg border border-[#F0F0F0] p-6">
          <h3 className="text-lg font-semibold text-[#3B3B3B] mb-4">
            Order Items
          </h3>
          {order.items && order.items.length > 0 ? (
            <div className="space-y-4">
              {order.items.map((item) => {
                const primaryImage =
                  item.variant.images.find((img) => img.is_primary) ||
                  item.variant.images[0];
                return (
                  <div
                    key={item.id}
                    className="flex gap-4 p-4 border border-[#F0F0F0] rounded-lg hover:bg-[#FAFAFA] transition-colors"
                  >
                    {primaryImage && (
                      <div className="w-24 h-24 relative rounded-md overflow-hidden shrink-0">
                        <Image
                          src={primaryImage.image_url}
                          alt={item.variant.product_name}
                          fill
                          className="object-cover"
                        />
                      </div>
                    )}
                    <div className="flex-1">
                      <h4 className="font-semibold text-[#3B3B3B] mb-2">
                        {item.variant.product_name}
                      </h4>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <p className="text-xs text-[#6F6E6C] mb-1">SKU</p>
                          <p className="font-medium text-[#3B3B3B]">
                            {item.variant.sku}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-[#6F6E6C] mb-1">Size</p>
                          <p className="font-medium text-[#3B3B3B]">
                            {item.variant.size}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-[#6F6E6C] mb-1">
                            Quantity
                          </p>
                          <p className="font-medium text-[#3B3B3B]">
                            {item.quantity}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-[#6F6E6C] mb-1">Price</p>
                          <p className="font-medium text-[#3B3B3B]">
                            ₦{item.price}
                          </p>
                        </div>
                      </div>
                      <div className="mt-2">
                        <p className="text-xs text-[#6F6E6C]">
                          Subtotal:{" "}
                          <span className="font-semibold text-[#3B3B3B]">
                            ₦{item.subtotal}
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="text-[#6F6E6C]">No items in this order.</p>
          )}
        </div>

        {/* Customer Information */}
        {typeof order.customer_profile !== "number" && (
          <div className="bg-white rounded-lg border border-[#F0F0F0] p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-[#3B3B3B]">
                Shipping Information
              </h3>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsUpdateStatusModalOpen(true)}
                className="flex items-center gap-2 bg-[#3B3B3B] text-white"
              >
                <Edit className="h-4 w-4" />
                Change Shipping Status
              </Button>
            </div>
            {defaultAddress && (
              <div className="space-y-2">
                <div>
                  <p className="text-xs text-[#6F6E6C] mb-1">Address</p>
                  <p className="font-medium text-[#3B3B3B]">
                    {defaultAddress.address}
                  </p>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <p className="text-xs text-[#6F6E6C] mb-1">City</p>
                    <p className="font-medium text-[#3B3B3B]">
                      {defaultAddress.city}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-[#6F6E6C] mb-1">State</p>
                    <p className="font-medium text-[#3B3B3B]">
                      {defaultAddress.state}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-[#6F6E6C] mb-1">Zip Code</p>
                    <p className="font-medium text-[#3B3B3B]">
                      {defaultAddress.zip_code}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-[#6F6E6C] mb-1">Phone</p>
                    <p className="font-medium text-[#3B3B3B]">
                      {defaultAddress.phone_number || "N/A"}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Gift Card Information */}
        {order.purchased_gift_card && (
          <div className="bg-white rounded-lg border border-[#F0F0F0] p-6">
            <h3 className="text-lg font-semibold text-[#3B3B3B] mb-4">
              Gift Card
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <p className="text-xs text-[#6F6E6C] mb-1">Card Number</p>
                <p className="font-medium text-[#3B3B3B]">
                  {order.purchased_gift_card.card_number}
                </p>
              </div>
              <div>
                <p className="text-xs text-[#6F6E6C] mb-1">Initial Amount</p>
                <p className="font-medium text-[#3B3B3B]">
                  ₦{order.purchased_gift_card.initial_amount}
                </p>
              </div>
              <div>
                <p className="text-xs text-[#6F6E6C] mb-1">Current Balance</p>
                <p className="font-medium text-[#3B3B3B]">
                  ₦{order.purchased_gift_card.current_balance}
                </p>
              </div>
              <div>
                <p className="text-xs text-[#6F6E6C] mb-1">Status</p>
                <span
                  className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${order.purchased_gift_card.status === "active"
                      ? "bg-green-100 text-green-700"
                      : "bg-gray-100 text-gray-600"
                    }`}
                >
                  {order.purchased_gift_card.status}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Order Dates */}
        <div className="bg-white rounded-lg border border-[#F0F0F0] p-6">
          <h3 className="text-lg font-semibold text-[#3B3B3B] mb-4">
            Order Dates
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-[#6F6E6C] mb-1">Created At</p>
              <p className="font-medium text-[#3B3B3B]">
                {new Date(order.created_at).toLocaleString()}
              </p>
            </div>
            <div>
              <p className="text-xs text-[#6F6E6C] mb-1">Updated At</p>
              <p className="font-medium text-[#3B3B3B]">
                {new Date(order.updated_at).toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      </div>

      {order && (
        <UpdateShippingStatusModal
          isOpen={isUpdateStatusModalOpen}
          onClose={() => setIsUpdateStatusModalOpen(false)}
          orderNumber={order.order_number}
          currentStatus={order.status}
        />
      )}
    </section>
  );
};

export default OrderDetailScreen;
