import React from "react";
import ProductSection from "./shared/ProductSection";
import {
  categories,
  productDisplay,
} from "@/features/products/data/product.data";

const BestSeller = () => {
  return (
    <ProductSection
      title="Best Sellers"
      linkText="Shop More Best Sellers"
      linkHref="/best-sellers"
      bgColor="bg-black"
      categories={categories}
      productDisplay={productDisplay}
    />
  );
};

export default BestSeller;
