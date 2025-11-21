"use client";
import Heading from "@/components/ui/typography/heading";
import Paragraph from "@/components/ui/typography/paragraph";
import React from "react";
import EmptyCustomerSummary from "../../shared/empty-screens/EmptyCustomerSummary";
import EmptyCustomerDefault from "../../shared/empty-screens/EmptyCustomerDefault";
import EmptyCustomerLoyalty from "../../shared/empty-screens/EmptyCustomerLoyalty";
import { useAuthStore } from "@/features/auth/auth.store";
import LoadingState from "@/components/ui/loaders/loading-state";

const EmptyOverview = () => {
  const user = useAuthStore((state) => state.user);

  if (!user) {
    <LoadingState />;
  }

  return (
    <section className="">
      <div className="flex flex-col gap-6">
        <div className="text-[#3B3B3B] max-w-[437px] flex flex-col gap-[6px] pb-[34px]">
          <Heading
            className="text-[40px] font-normal"
            title={`Welcome back, ${user.first_name}.`}
          />
          <Paragraph
            className="font-normal text-[#6F6E6C] leading-[26px] text-lg"
            content="Your orders, saved scents, and more — all in one place."
          />
        </div>
        <EmptyCustomerSummary
          subHeadingOne="Profile Summary"
          subHeadingTwo="Hello, Sophia Laurent"
          subHeadingThree="Country/Region:"
          contentOne="Member since March 2019"
          contentTwo="Nigeria"
        />
        <EmptyCustomerDefault
          src="/empty-location-icon.png"
          alt="icon of a maps"
          width={153.33}
          height={100}
          className=""
          subHeading="Default Address"
          contentOne="No saved address. add address to make checkout faster and smoother."
          contentTwo="Add shipping address"
          useCircle
        />
        <EmptyCustomerDefault
          src="/empty-payment-icon.png"
          alt="icon of a cards"
          width={100}
          height={100}
          className=""
          subHeading="Payment Card"
          contentOne="No cards saved. Add card to speed up future orders."
          contentTwo="Add payment method"
          useCircle
        />
        <EmptyCustomerLoyalty
          subHeading="Loyalty Points"
          contentOne=" You have 0 points = $0.00"
        />
      </div>
    </section>
  );
};

export default EmptyOverview;
