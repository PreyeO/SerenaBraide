"use client";

import React, { useState } from "react";
import EmptyCustomerDefault from "../shared/empty/EmptyCustomerDefault";
import { Stars } from "lucide-react";
import OrdersTabCard from "../shared/OrdersTabCard";

const EmptyReview = () => {
  const [activeTab, setActiveTab] = useState("ready-for-review");
  const [searchQuery, setSearchQuery] = useState("");

  const reviewTabs = [
    {
      value: "ready-for-review",
      label: "Orders ready for review (0)",
    },
  ];

  return (
    <section className="flex flex-col gap-4 sm:gap-6 px-4 sm:px-0">
      <OrdersTabCard
        activeTab={activeTab}
        onTabChange={setActiveTab}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        tabs={reviewTabs}
      />
      <EmptyCustomerDefault
        src="/empty-payment-icon.png"
        alt="icon of a cards"
        width={100}
        height={100}
        className=""
        subHeading="Ratings & Reviews"
        contentOne="No reviews yet. Be the first to share your experience!"
        contentTwo="Write a review"
        Icon={Stars}
        useCircle={false}
        href="/products"
      />
    </section>
  );
};

export default EmptyReview;

