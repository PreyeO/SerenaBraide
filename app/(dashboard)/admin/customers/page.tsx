"use client";

import { useGetCustomers } from "@/hooks/useCustomers";
import { CustomerTable } from "@/components/shared/tables/CustomerTable";
import { Button } from "@/components/ui/button";
import { Filter, Calendar } from "lucide-react";

export default function CustomersPage() {
  const { data: customersResponse, isLoading, error } = useGetCustomers();

  if (isLoading) {
    return <div className="p-8 text-center text-gray-500">Loading customers...</div>;
  }

  if (error) {
    return <div className="p-8 text-center text-red-500">Error loading customers</div>;
  }

  const customers = customersResponse?.results || [];

  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold text-gray-900">Customer</h1>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="h-9 px-4 bg-gray-50 border-gray-200">
            Export
          </Button>
          <Button variant="outline" className="h-9 px-4 gap-2 bg-gray-50 border-gray-200">
            <Filter className="h-4 w-4 text-gray-500" />
            <span className="text-gray-700">Filter by</span>
          </Button>
          <Button variant="ghost" className="h-9 px-3 gap-2 text-gray-500 hover:text-gray-700">
            <span>Today</span>
            <Calendar className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <CustomerTable data={customers} />
    </div>
  );
}
