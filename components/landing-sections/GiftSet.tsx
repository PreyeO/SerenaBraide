import React from "react";
import { categories, GiftProductDisplay } from "@/constant/data";
import ProductSection from "./shared/ProductSection";

const GiftSet = () => {
  return (
    <ProductSection
      title="DISCOVER GIFTS & SETS"
      linkText="Shop More Gift Sets"
      linkHref="/gifts-sets"
      bgColor="bg-[#F7E8D0]"
      textColor="text-[#3B3B3B]"
      linkColor="text-[#3B3B3B]"
      categories={categories}
      productDisplay={GiftProductDisplay}
    />
  );
};

export default GiftSet;
