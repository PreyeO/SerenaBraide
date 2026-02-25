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
import MobileProfileOverview from "./mobile-components/MobileProfileOverview";

const Overview = () => {
  const user = useAuthStore((state) => state.user);
  const { data: addresses, isLoading } = useGetAddresses();

  if (!user) {
    return <DashboardLoader />;
  }

  const defaultAddress =
    addresses?.find((addr) => addr.is_default) || addresses?.[0];

  const userName = `${user.first_name} ${user.last_name}`;
  const memberSince = `Member since ${new Date(
    user.date_joined,
  ).toLocaleDateString("en-US", { month: "long", year: "numeric" })}`;

  return (
    <>
      {/* Mobile Layout - shown below lg breakpoint */}
      <MobileProfileOverview
        userName={userName}
        memberSince={memberSince}
        country={user.country}
      />

      {/* Desktop Layout - shown at lg breakpoint and above */}
      <section className="hidden md:flex flex-col gap-6">
        <EmptyCustomerSummary
          subHeadingOne="Profile Summary"
          subHeadingTwo={`Hello, ${user.first_name} ${user.last_name}`}
          subHeadingThree="Country/Region:"
          contentOne={memberSince}
          contentTwo={user.country}
          firstName={user.first_name}
          lastName={user.last_name}
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
            href="/"
          />
        )}
      </section>
    </>
  );
};

export default Overview;
