import React from "react";
import { categories, productDisplay } from "@/constant/data";
import ProductSection from "./shared/ProductSection";

const BestSeller = () => {
  return (
    <ProductSection
      title="Our Product Categories"
      linkText="Shop More Best Sellers"
      linkHref="/best-sellers"
      bgColor="bg-black"
      categories={categories}
      productDisplay={productDisplay}
    />
  );
};

export default BestSeller;
