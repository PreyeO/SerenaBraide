"use client";
import React from "react";
import EmptyCustomerSummary from "./shared/empty/EmptyCustomerSummary";
import { useAuthStore } from "@/features/auth/auth.store";
import OverviewCard from "./shared/OverviewCard";
import AuthSpan from "@/components/ui/typography/auth-span";
import UnderlineLink from "@/components/ui/btns/underline-cta";
import { CheckCircle } from "lucide-react";
import { useGetAddresses } from "@/features/cart-checkout/hooks/useGetAddresses";
import BackNavigation from "@/components/ui/btns/back-navigation";
import LoadingState from "@/components/ui/loaders/loading-state";
import {
  displayValue,
  formatDateOfBirth,
  getPrimaryPhoneNumber,
} from "../../utils/profile.utils";

const AccountSetting = () => {
  const user = useAuthStore((state) => state.user);
  const { data: addresses } = useGetAddresses();

  if (!user) {
    return <LoadingState />;
  }

  if (!user) {
    return <LoadingState />;
  }

  return (
    <section className="flex flex-col gap-4 lg:gap-6">
      <BackNavigation
        href="/profile"
        text="Back"
        className="lg:hidden mb-4 hover:text-[#3B3B3B] transition-colors"
      />
      <EmptyCustomerSummary
        subHeadingOne="Profile Summary"
        subHeadingTwo={`Hello, ${user.first_name} ${user.last_name}`}
        subHeadingThree="Country/Region:"
        contentOne={`Member since ${new Date(
          user.date_joined,
        ).toLocaleDateString("en-US", { month: "long", year: "numeric" })}`}
        contentTwo={user.country}
        firstName={user.first_name}
        lastName={user.last_name}
      />
      <OverviewCard subHeading="Profile Information">
        <div className="flex flex-col gap-2 sm:gap-0">
          <AuthSpan className="text-sm sm:text-base font-medium pb-2 sm:pb-2.5 wrap-break-word">
            <span className="text-[#6F6E6C] font-normal">First Name: </span>
            {displayValue(user.first_name)}
          </AuthSpan>

          <AuthSpan className="text-sm sm:text-base font-medium pb-2 sm:pb-2.5 wrap-break-word">
            <span className="text-[#6F6E6C] font-normal">Last Name: </span>
            {displayValue(user.last_name)}
          </AuthSpan>

          <AuthSpan className="text-sm sm:text-base font-medium pb-2 sm:pb-2.5 items-center gap-1 sm:gap-1.5 flex flex-wrap">
            <span className="text-[#6F6E6C] font-normal">Email Address: </span>
            <span className="break-all">{displayValue(user.email)}</span>
            <CheckCircle
              fill="#01AD73"
              size={14}
              className="sm:size-3.75 shrink-0"
              color="white"
            />
          </AuthSpan>

          <AuthSpan className="text-sm sm:text-base font-medium pb-2 sm:pb-2.5 wrap-break-word">
            <span className="text-[#6F6E6C] font-normal">Phone Number: </span>
            {displayValue(getPrimaryPhoneNumber(addresses, user.phone_number))}
          </AuthSpan>

          <AuthSpan className="text-sm sm:text-base font-medium pb-2 sm:pb-2.5 wrap-break-word">
            <span className="text-[#6F6E6C] font-normal">Date of Birth: </span>
            {formatDateOfBirth(user.date_of_birth)}
          </AuthSpan>
        </div>
      </OverviewCard>
      <OverviewCard subHeading="Password & Security">
        <div className="flex flex-col gap-2 sm:gap-0">
          <AuthSpan className="text-sm sm:text-base font-medium pb-2 sm:pb-2.5 flex items-center flex-wrap gap-1">
            <span className="text-[#6F6E6C] font-normal">Password : </span>
            <span>**********</span>
          </AuthSpan>
          <UnderlineLink
            href="/auth/forgot-password"
            text="change password"
            className="text-xs sm:text-sm text-[#2F88FF] font-normal"
          />
        </div>
      </OverviewCard>
    </section>
  );
};

export default AccountSetting;
