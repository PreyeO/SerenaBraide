"use client";
import React from "react";
import EmptyCustomerSummary from "./shared/empty/EmptyCustomerSummary";
import { useAuthStore } from "@/features/auth/auth.store";
import LoadingState from "@/components/ui/loaders/loading-state";
import OverviewCard from "./shared/OverviewCard";
import AuthSpan from "@/components/ui/typography/auth-span";
import UnderlineLink from "@/components/ui/btns/underline-cta";
import { CheckCircle } from "lucide-react";

const AccountSetting = () => {
  const user = useAuthStore((state) => state.user);

  if (!user) {
    return <LoadingState />;
  }

  // Helper function to display value or "null"
  const displayValue = (value: string | null | undefined): string => {
    if (value === null || value === undefined || value === "") {
      return "null";
    }
    return value;
  };

  // Format date of birth if available
  const formatDateOfBirth = (dateStr: string | null): string => {
    if (!dateStr) return "null";
    try {
      return new Date(dateStr).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    } catch {
      return dateStr;
    }
  };

  return (
    <section className="flex flex-col gap-6">
      <EmptyCustomerSummary
        subHeadingOne="Profile Summary"
        subHeadingTwo={`Hello, ${user.first_name} ${user.last_name}`}
        subHeadingThree="Country/Region:"
        contentOne={`Member since ${new Date(
          user.date_joined,
        ).toLocaleDateString("en-US", { month: "long", year: "numeric" })}`}
        contentTwo={displayValue(user.country)}
      />
      <OverviewCard subHeading="Profile Information">
        <AuthSpan className="text-base font-medium pb-2.5">
          <span className="text-[#6F6E6C] font-normal">First Name: </span>
          {displayValue(user.first_name)}
        </AuthSpan>

        <AuthSpan className="text-base font-medium pb-2.5">
          <span className="text-[#6F6E6C] font-normal">Last Name: </span>
          {displayValue(user.last_name)}
        </AuthSpan>

        <AuthSpan className="text-base font-medium pb-2.5 items-center gap-1.5 flex">
          <span className="text-[#6F6E6C] font-normal">Email Address: </span>
          {displayValue(user.email)}{" "}
          <CheckCircle fill="#01AD73" size={15} color="white" />
        </AuthSpan>

        <AuthSpan className="text-base font-medium pb-2.5">
          <span className="text-[#6F6E6C] font-normal">Phone Number: </span>
          {displayValue(user.phone_number)}
        </AuthSpan>

        <AuthSpan className="text-base font-medium pb-2.5">
          <span className="text-[#6F6E6C] font-normal">Date of Birth: </span>
          {formatDateOfBirth(user.date_of_birth)}
        </AuthSpan>
      </OverviewCard>
      <OverviewCard subHeading="Password & Security">
        <AuthSpan className="text-base font-medium pb-2.5 flex items-center">
          <span className="text-[#6F6E6C] font-normal ">Password : </span>
          **********
        </AuthSpan>
        <UnderlineLink
          href="/auth/forgot-password"
          text="change password"
          className="text-sm text-[#2F88FF] font-normal"
        />
      </OverviewCard>
    </section>
  );
};

export default AccountSetting;
