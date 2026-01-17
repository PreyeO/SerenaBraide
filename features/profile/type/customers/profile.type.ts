import { LucideIcon } from "lucide-react";

export type FulfilmentType = "PROCESSING" | "IN_TRANSIT" | "DELIVERED";

export interface FulfilmentStatusProps {
  statusType: FulfilmentType;
  header: string;
  status: string;
  title: string;
  src: string;
  alt: string;
  color: string;
  icon: LucideIcon;
  iconBg: string;
  price: string;
  quantity: string;
  size: string;
}
export interface OrderInfo {
  id?: number; // Order item ID for API calls
  statusType: FulfilmentType; // ✅ ADD THIS
  title: string;
  color: string;
  orderNumber: string;
  productName: string;
  src: string;
  alt: string;
  price: string;
  size: string;
  quantity: string;
  date: string;
  total: string;
  extraInfo: string;
  icon: LucideIcon;
  iconBg: string;
  OrderAction1: string;
  orderAction2: string;
}

export interface Props {
  statusType: FulfilmentType;
}
