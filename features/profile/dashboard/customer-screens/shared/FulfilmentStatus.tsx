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
    <div className="space-y-1.5">
      {/* Header */}
      <SubHeading
        title={header}
        className="text-lg font-medium text-[#3B3B3B]"
      />

      {/* Product / Status Card */}
      <div className="border border-[#D1D5DB] py-3.75 px-3.75 flex justify-between rounded-md">
        <div className="flex gap-2.5">
          <ProductImage
            src={src}
            alt={alt}
            width={102}
            height={102}
            className="object-cover rounded-[5px] shrink-0"
          />

          <div className="flex flex-col gap-1">
            <Paragraph
              content={title}
              className="text-sm font-medium text-[#3B3B3B]"
            />

            <div className="flex gap-4 ">
              <Paragraph content={price} className="text-sm text-[#3B3B3B]" />
              <Paragraph
                content={quantity}
                className="text-sm text-[#3B3B3B]"
              />
            </div>

            <Paragraph content={size} className="text-sm text-[#6F6E6C]" />

            <Paragraph content={status} className="text-sm text-[#9A9A98]" />
          </div>
        </div>
        <div>
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

      {/* Payment Details */}
      {orderDetail && (
        <>
          <SubHeading
            title="Payment details"
            className="text-lg font-medium text-[#3B3B3B]"
          />

          <div className="border border-[#D1D5DB] py-3.75 px-3.75 rounded-md">
            <div className="flex flex-col w-[256px] space-y-1.5">
              {orderSummary.map((item, index) => (
                <div key={index} className="flex justify-between">
                  <Paragraph
                    content={item.label}
                    className="text-sm text-[#6F6E6C]"
                  />
                  <Paragraph
                    content={item.value}
                    className="text-sm text-[#3B3B3B]"
                  />
                </div>
              ))}

              <div className="border w-full mt-1" />

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
                  className="text-xs text-[#6F6E6C]"
                />
              )}
            </div>
          </div>
        </>
      )}

      {/* ✅ Shipping (ALWAYS shown, including IN_TRANSIT) */}
      <SubHeading
        title="Shipping to"
        className="text-lg font-medium text-[#3B3B3B]"
      />

      <div className="border border-[#D1D5DB] py-3.75 px-3.75 rounded-md">
        {shippingAddress ? (
          <div className="flex flex-col space-y-1">
            <Paragraph
              content={shippingAddress.address}
              className="text-sm font-medium text-[#3B3B3B]"
            />
            <Paragraph
              content={`${shippingAddress.city}, ${shippingAddress.state} ${shippingAddress.zip_code}`}
              className="text-sm text-[#3B3B3B]"
            />
            <Paragraph
              content={shippingAddress.country}
              className="text-sm text-[#3B3B3B]"
            />
            {shippingAddress.phone_number && (
              <Paragraph
                content={`Phone: ${shippingAddress.phone_number}`}
                className="text-sm text-[#3B3B3B]"
              />
            )}
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
