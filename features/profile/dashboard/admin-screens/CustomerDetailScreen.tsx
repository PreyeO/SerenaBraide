"use client";

import { useGetCustomerDetail } from "@/features/profile/hooks/admin/useCustomers";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import DashboardLoader from "@/components/ui/loaders/dasboard-loader";
import { ArrowLeft, Mail, MapPin, Phone } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

const CustomerDetailScreen = ({ id }: { id: string }) => {
  const router = useRouter();
  const customerId = parseInt(id);

  const { data: customer, isLoading, error } = useGetCustomerDetail(customerId);

  if (isLoading) return <DashboardLoader />;

  if (error || !customer) {
    return (
      <div className="p-6">
        <div className="text-red-500 mb-4">Error loading customer details</div>
        <Button onClick={() => router.back()}>Go Back</Button>
      </div>
    );
  }

  return (
    <section>
      <div className="flex flex-col gap-8 p-6 max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => router.back()}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              {customer.first_name} {customer.last_name}
            </h1>
            <p className="text-gray-500 text-sm">Customer ID: #{customer.id}</p>
          </div>
          <div className="ml-auto flex gap-3">
            {customer.is_active ? (
              <Badge className="bg-green-100 text-green-700 hover:bg-green-100 border-none">
                Active
              </Badge>
            ) : (
              <Badge variant="secondary">Inactive</Badge>
            )}
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Main Info Card */}
          <div className="md:col-span-2 space-y-6">
            <div className="bg-white rounded-xl border p-6 shadow-sm">
              <h2 className="text-lg font-semibold mb-4">
                Contact Information
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-start gap-3">
                  <div className="bg-blue-50 p-2 rounded-lg">
                    <Mail className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      Email Address
                    </p>
                    <p className="text-sm text-gray-500">{customer.email}</p>
                    {customer.email_validated && (
                      <span className="text-xs text-green-600 flex items-center gap-1 mt-1">
                        ✓ Verified
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="bg-purple-50 p-2 rounded-lg">
                    <Phone className="h-5 w-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      Phone Number
                    </p>
                    <p className="text-sm text-gray-500">
                      {customer.phone_number || "Not provided"}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl border p-6 shadow-sm">
              <h2 className="text-lg font-semibold mb-4">Default Address</h2>
              {customer.customer_profile?.addresses?.find(
                (a) => a.is_default,
              ) ? (
                (() => {
                  const addr = customer.customer_profile.addresses.find(
                    (a) => a.is_default,
                  )!;
                  return (
                    <div className="flex items-start gap-3">
                      <div className="bg-orange-50 p-2 rounded-lg">
                        <MapPin className="h-5 w-5 text-orange-600" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-900">{addr.address}</p>
                        <p className="text-sm text-gray-500">
                          {addr.city}, {addr.state} {addr.zip_code}
                        </p>
                        <p className="text-sm text-gray-500">{addr.country}</p>
                      </div>
                    </div>
                  );
                })()
              ) : (
                <div className="text-gray-500 text-sm">
                  No default address found
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl border p-6 shadow-sm">
              <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">
                Overview
              </h2>
              <div className="space-y-4">
                <div className="flex justify-between items-center py-2 border-b border-gray-100 last:border-0">
                  <span className="text-sm text-gray-600">Joined</span>
                  <span className="text-sm font-medium text-gray-900">
                    {new Date(customer.date_joined).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-100 last:border-0">
                  <span className="text-sm text-gray-600">Country</span>
                  <span className="text-sm font-medium text-gray-900">
                    {customer.country || "N/A"}
                  </span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-100 last:border-0">
                  <span className="text-sm text-gray-600">User ID</span>
                  <span className="text-sm font-medium text-gray-900">
                    {customer.id}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CustomerDetailScreen;
