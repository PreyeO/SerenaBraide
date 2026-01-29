import { Badge } from "@/components/ui/badge";
import ProductImage from "@/components/ui/images/product-image";
import Paragraph from "@/components/ui/typography/paragraph";
import SubHeading from "@/components/ui/typography/subHeading";
import { FulfilmentStatusProps } from "@/features/profile/type/customers/profile.type";
import React from "react";

const FulfilmentStatus: React.FC<FulfilmentStatusProps> = ({
  header,
  status,
  title,
  src,
  alt,
  color,
  icon: Icon,
  iconBg,
  price,
  quantity,
  size,
  orderDetail,
  shippingAddress,
}) => {
  // Format currency
  const formatCurrency = (amount: string | number): string => {
    const num = typeof amount === "string" ? parseFloat(amount) : amount;
    return `₦${num.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  };

  // Format date
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  // Get status with date for mobile
  const getStatusWithDate = () => {
    if (!orderDetail?.updated_at) return status;
    return `${status} on ${formatDate(orderDetail.updated_at)}`;
  };

  // Build order summary from orderDetail
  const orderSummary = orderDetail
    ? [
        {
          label: "Sub total:",
          value: formatCurrency(orderDetail.subtotal),
        },
        {
          label: "Shipping fee:",
          value: formatCurrency(orderDetail.shipping_cost),
        },
        ...(parseFloat(orderDetail.discount || "0") > 0
          ? [
              {
                label: "Discount:",
                value: `-${formatCurrency(orderDetail.discount)}`,
                isDiscount: true,
              },
            ]
          : []),
        ...(parseFloat(orderDetail.tax) > 0
          ? [
              {
                label: "Tax:",
                value: formatCurrency(orderDetail.tax),
              },
            ]
          : []),
      ]
    : [];

  return (
    <div className="space-y-4 lg:space-y-1.5">
      {/* Header */}
      <SubHeading
        title={header}
        className="text-base lg:text-lg font-medium text-[#3B3B3B]"
      />

      {/* Product / Status Card */}
      <div className="border border-[#D1D5DB] py-3 lg:py-3.75 px-3 lg:px-3.75 rounded-md">
        {/* Mobile: Status badge at top */}
        <div className="flex lg:hidden mb-3">
          <Badge
            variant="secondary"
            className="flex items-center gap-1.5 px-0 py-0 text-xs bg-transparent"
            style={{ color: color }}
          >
            <Icon className="size-4" color={iconBg} />
            <span className="whitespace-nowrap">{getStatusWithDate()}</span>
          </Badge>
        </div>

        <div className="flex justify-between">
          <div className="flex gap-2.5 lg:gap-2.5">
            <ProductImage
              src={src}
              alt={alt}
              width={102}
              height={102}
              className="w-16 h-16 lg:w-25.5 lg:h-25.5 object-cover rounded-[5px] shrink-0"
            />

            <div className="flex flex-col gap-0.5 lg:gap-1">
              <Paragraph
                content={title}
                className="text-sm font-medium text-[#3B3B3B] line-clamp-2"
              />

              <div className="flex gap-2 lg:gap-4">
                <Paragraph content={price} className="text-sm text-[#3B3B3B]" />
                <Paragraph
                  content={quantity}
                  className="text-sm text-[#3B3B3B]"
                />
              </div>

              <Paragraph content={size} className="text-sm text-[#6F6E6C]" />

              <Paragraph
                content={
                  orderDetail?.created_at
                    ? `Order date: ${formatDate(orderDetail.created_at)}`
                    : ""
                }
                className="text-sm text-[#9A9A98]"
              />
            </div>
          </div>

          {/* Desktop only: Badge on right */}
          <div className="hidden lg:block">
            <Badge
              variant="secondary"
              className="flex items-center gap-1 px-2 py-1 text-xs"
              style={{
                backgroundColor: `${color}10`,
                color: color,
              }}
            >
              <Icon className="size-4" color={iconBg} />
              <span className="whitespace-nowrap">{status}</span>
            </Badge>
          </div>
        </div>
      </div>

      {/* Payment Details */}
      {orderDetail && (
        <>
          <SubHeading
            title="Payment details"
            className="text-base lg:text-lg font-medium text-[#3B3B3B] pt-2 lg:pt-0"
          />

          <div className="border border-[#D1D5DB] py-3 lg:py-3.75 px-3 lg:px-3.75 rounded-md">
            <div className="flex flex-col w-full lg:w-[256px] space-y-1.5">
              {orderSummary.map((item, index) => (
                <div key={index} className="flex justify-between">
                  <Paragraph
                    content={item.label}
                    className="text-sm text-[#6F6E6C]"
                  />
                  <Paragraph
                    content={item.value}
                    className={`text-sm ${
                      (item as { isDiscount?: boolean }).isDiscount
                        ? "text-[#01AD73]"
                        : "text-[#3B3B3B]"
                    }`}
                  />
                </div>
              ))}

              <div className="border-t w-full my-1" />

              <div className="flex justify-between">
                <Paragraph
                  content="Total"
                  className="text-sm font-medium text-[#3B3B3B]"
                />
                <Paragraph
                  content={formatCurrency(orderDetail.total_amount)}
                  className="text-sm font-medium text-[#3B3B3B]"
                />
              </div>

              {orderDetail.updated_at && (
                <Paragraph
                  content={`Paid on ${formatDate(orderDetail.updated_at)}`}
                  className="text-xs text-[#6F6E6C] pt-1"
                />
              )}
            </div>
          </div>
        </>
      )}

      {/* Shipping */}
      <SubHeading
        title="Shipping to"
        className="text-base lg:text-lg font-medium text-[#3B3B3B] pt-2 lg:pt-0"
      />

      <div className="border border-[#D1D5DB] py-3 lg:py-3.75 px-3 lg:px-3.75 rounded-md">
        {shippingAddress ? (
          <div className="flex flex-col space-y-1">
            {/* Phone */}
            {shippingAddress.phone_number && (
              <Paragraph
                content={shippingAddress.phone_number}
                className="text-sm font-medium text-[#3B3B3B]"
              />
            )}

            <div className="pt-1">
              <Paragraph
                content={shippingAddress.address}
                className="text-sm text-[#3B3B3B]"
              />
              <Paragraph
                content={`${shippingAddress.city}, ${shippingAddress.state} ${shippingAddress.zip_code}, ${shippingAddress.country}`}
                className="text-sm text-[#3B3B3B]"
              />
            </div>
          </div>
        ) : (
          <div className="flex flex-col space-y-1">
            <Paragraph
              content="No shipping address available"
              className="text-sm text-[#6F6E6C]"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default FulfilmentStatus;
