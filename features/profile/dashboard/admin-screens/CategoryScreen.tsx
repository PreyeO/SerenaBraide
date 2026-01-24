"use client";

import React from "react";
import SubHeading from "@/components/ui/typography/subHeading";
import CategoryForm from "./forms/CategoryForm";

const CategoryScreen = () => {
  return (
    <section className="flex flex-col px-6 py-6 space-y-6">
      <SubHeading
        title="Add new Product Category"
        className="text-sm text-[#3B3B3B] font-semibold pt-7.5  "
      />
      <div className="border border-[#F0F0F0] rounded-lg p-6 pt-4 ">
        <CategoryForm />
      </div>
    </section>
  );
};

export default CategoryScreen;
