"use client";
import React from "react";
import Masonry from "react-masonry-css";
import SubHeading from "../ui/typography/subHeading";
import { productCategories } from "@/constant/data";
import ProductImage from "../ui/images/product-image";

const breakpointColumnsObj = {
  default: 3,
  1024: 3,
  768: 2,
  500: 1,
};

const ProductCategory = () => {
  return (
    <section className="px-16 py-12.5 bg-[#FAF5EF]">
      <SubHeading
        title="Our Product Categories"
        className="text-[#3B3B3B] font-extralight italic text-[40px] text-center"
      />

      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="flex gap-5 mt-12.5" // Container for columns
        columnClassName="space-y-5" // Spacing between items in a column
      >
        {productCategories.map((product, index) => (
          <div key={index}>
            <ProductImage
              className="w-full max-w-106" // Ensure image respects size
              src={product.src}
              alt={product.name}
              width={424}
              height={product.height}
            />
          </div>
        ))}
      </Masonry>
    </section>
  );
};

export default ProductCategory;
