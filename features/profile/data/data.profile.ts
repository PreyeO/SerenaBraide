import { BadgeCheckIcon, BookDown, CalendarClock } from "lucide-react";
import {
  FulfilmentStatusProps,
  OrderInfo,
} from "../type/customers/profile.type";

export const orderInfo: OrderInfo[] = [
  {
    title: "Delivered on Mar 30, 2025",
    statusType: "DELIVERED",
    color: "#01AD73",
    orderNumber: "Order #SB39460 Copy",
    productName: "Night-gale autumn fragrance",
    src: "/order-image-1.png",
    alt: "product image",
    price: "NGN3,278.63",
    size: "50ML",
    quantity: "X1",
    date: "Order date: Mar 27, 2025",
    total: "Total: NGN7,045.75",
    extraInfo: "Shipping fee included",
    icon: BadgeCheckIcon,
    iconBg: "#01AD73",
    OrderAction1: "Buy this again",
    orderAction2: "Leave a review",
  },
  {
    title: "Processing",
    statusType: "PROCESSING",
    color: "#D97705",
    orderNumber: "Order #SB39460 Copy",
    productName: "Night-gale autumn fragrance",
    src: "/order-image-2.png",
    alt: "product image",
    price: "NGN3,278.63",
    size: "50ML",
    quantity: "X1",
    date: "Order date: Mar 27, 2025",
    total: "Total: NGN7,045.75",
    extraInfo: "Shipping fee included",
    icon: CalendarClock,
    iconBg: "#D97705",
    OrderAction1: "Buy this again",
    orderAction2: "Cancel Order",
  },
  {
    title: "In Transit",
    statusType: "IN_TRANSIT",
    color: "#2F88FF",
    orderNumber: "Order #SB39460 Copy",
    productName: "Night-gale autumn fragrance",
    src: "/order-image-3.png",
    alt: "product image",
    price: "NGN3,278.63",
    size: "50ML",
    quantity: "X1",
    date: "Mar 27, 2025",
    total: "Total: NGN7,045.75",
    extraInfo: "Shipping fee included",
    icon: BookDown,
    iconBg: "#2F88FF",
    OrderAction1: "Track",
    orderAction2: "Buy this again",
  },
];

export const fulfilmentDetails: FulfilmentStatusProps[] = [
  {
    header: "Order details",
    statusType: "DELIVERED",
    status: "Delivered on Mar 30, 2025",
    title: "Night-gale autumn fragrance",
    color: "#01AD73",

    src: "/order-image-1.png",
    alt: "product image",
    price: "NGN3,278.63",
    size: "50ML",
    quantity: "X1",

    icon: BadgeCheckIcon,
    iconBg: "#01AD73",
  },
  {
    header: "Order details",
    statusType: "PROCESSING",
    status: "Processing",
    title: "Night-gale autumn fragrance",
    color: "#D97705",

    src: "/order-image-2.png",
    alt: "product image",
    price: "NGN3,278.63",
    size: "50ML",
    quantity: "X1",

    // total: "Total: NGN7,045.75",

    icon: CalendarClock,
    iconBg: "#D97705",
  },
  {
    header: "Order details",
    statusType: "IN_TRANSIT",
    status: "In Transit",
    title: "Kenny Clerk",
    color: "#2F88FF",

    src: "/order-image-3.png",
    alt: "product image",
    price: "NGN3,278.63",
    size: "50ML",
    quantity: "X1",

    // total: "Total: NGN7,045.75",

    icon: BookDown,
    iconBg: "#2F88FF",
  },
];

export const orderSummary = [
  {
    label: "Sub total:",
    value: "₦7,045.75",
  },
  {
    label: "Shipping fee:",
    value: "₦600",
  },
  {
    label: "Discount:",
    value: "-₦223",
    isDiscount: true,
  },
];

export const shippingSummary = {
  name: "Kenny Clark",
  phone: "+234 081300000000",
  street: "1234 Lavender Lane, Apartment 5B",
  city: "Beverly Hills, CA 90210, United States",
};

export const trackingTimeline = [
  {
    title: "Order Processed",
    description: "Your order has been confirmed and is being prepared.",
    datetime: "March 15, 2025 at 2:30 PM",
    location: "Beverly Hills, CA",
    completed: true,
  },
  {
    title: "Shipped",
    description: "Package departed from fulfillment center.",
    datetime: "March 16, 2025 at 9:15 AM",
    location: "Los Angeles, CA",
    completed: true,
  },
  {
    title: "In Transit",
    description: "Package is on the way to destination facility.",
    datetime: "March 17, 2025 at 6:22 AM",
    location: "Phoenix, AZ",
    completed: true,
  },
  {
    title: "Delivered",
    description: "Package delivered to recipient.",
    datetime: "Expected March 20, 2025",
    location: "Beverly Hills, CA",
    completed: false,
  },
];
