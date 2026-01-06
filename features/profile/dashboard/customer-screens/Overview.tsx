import React from "react";
import EmptyCustomerSummary from "./shared/empty/EmptyCustomerSummary";
import OverviewCard from "./shared/OverviewCard";
import SubHeading from "@/components/ui/typography/subHeading";
import Image from "next/image";
import EmptyCustomerLoyalty from "./shared/empty/EmptyCustomerLoyalty";

const Overview = () => {
  return (
    <section>
      <EmptyCustomerSummary
        subHeadingOne="Profile Summary"
        subHeadingTwo="Hello, Sophia Laurent"
        subHeadingThree="Country/Region:"
        contentOne="Member since March 2019"
        contentTwo="Nigeria"
      />
      <OverviewCard subHeading="Default Address">
        <SubHeading
          title="Home"
          className="font-semibold text-[#3B3B3B] text-lg"
        />{" "}
        <div className="font-normal text-base max-w-84 flex flex-col gap-1.5">
          <p> Sarah Praise </p>
          <p>7 Lekki phase 1 crown estate road, sango Lagos</p>
          <p>Eti-osa, Lagos state 302116, Nigeria</p>
          <p>
            <span className=" font-medium">Phone</span>: +23408132802414
          </p>
        </div>
      </OverviewCard>
      <OverviewCard subHeading="Payment Card">
        <div className="font-normal text-base flex  gap-6">
          <Image
            className=""
            alt="customer card"
            src="/payment-card-1.png"
            width={352}
            height={175}
          />
          <Image
            className=""
            alt="customer card"
            src="/payment-card-2.png"
            width={352}
            height={175}
          />
        </div>
      </OverviewCard>
      <EmptyCustomerLoyalty
        subHeading="Loyalty Points"
        contentOne=" You have 0 points = $0.00"
      />
    </section>
  );
};

export default Overview;
