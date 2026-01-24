"use client";

import React from "react";
import EmptyCustomerSummary from "./shared/empty/EmptyCustomerSummary";
import OverviewCard from "./shared/OverviewCard";
import EmptyCustomerLoyalty from "./shared/empty/EmptyCustomerLoyalty";
import { useGetAddresses } from "@/features/cart-checkout/hooks/useGetAddresses";
import { useAuthStore } from "@/features/auth/auth.store";
import AddressCard from "@/features/cart-checkout/shared/AddressCard";
import EmptyCustomerDefault from "./shared/empty/EmptyCustomerDefault";
import LoadingState from "@/components/ui/loaders/loading-state";
import DashboardLoader from "@/components/ui/loaders/dasboard-loader";

const Overview = () => {
  const user = useAuthStore((state) => state.user);
  const { data: addresses, isLoading } = useGetAddresses();

  if (!user) {
    return <DashboardLoader />;
  }

  const defaultAddress =
    addresses?.find((addr) => addr.is_default) || addresses?.[0];

  return (
    <section className="flex flex-col gap-6">
      <EmptyCustomerSummary
        subHeadingOne="Profile Summary"
        subHeadingTwo={`Hello, ${user.first_name} ${user.last_name}`}
        subHeadingThree="Country/Region:"
        contentOne={`Member since ${new Date(
          user.date_joined,
        ).toLocaleDateString("en-US", { month: "long", year: "numeric" })}`}
        contentTwo={user.country}
      />
      {isLoading ? (
        <OverviewCard subHeading="Default Address">
          <LoadingState />
        </OverviewCard>
      ) : defaultAddress ? (
        <OverviewCard subHeading="Default Address">
          <AddressCard
            address={defaultAddress}
            variant="overview"
            showActions={false}
          />
        </OverviewCard>
      ) : (
        <EmptyCustomerDefault
          src="/empty-location-icon.png"
          alt="icon of a maps"
          width={153.33}
          height={100}
          className=""
          subHeading="Default Address"
          contentOne="No saved address. Add address to make checkout faster and smoother."
          contentTwo="Add shipping address"
          useCircle
        />
      )}

      <EmptyCustomerLoyalty
        subHeading="Loyalty Points"
        contentOne=" You have 0 points = $0.00"
      />
    </section>
  );
};

export default Overview;
