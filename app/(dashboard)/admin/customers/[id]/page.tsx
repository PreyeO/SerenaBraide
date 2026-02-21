"use client";

import CustomerDetailScreen from "@/features/profile/dashboard/admin-screens/CustomerDetailScreen";
import { use } from "react";

export default function CustomerDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  return <CustomerDetailScreen id={id} />;
}
