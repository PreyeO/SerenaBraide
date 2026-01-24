"use client";

import React, { useState } from "react";
import ProductForm from "./forms/ProductForm";
import VariantForm from "./forms/VariantForm";
import SubHeading from "@/components/ui/typography/subHeading";

const NewProductScreen = () => {
  const [createdProductId, setCreatedProductId] = useState<number | null>(null);

  const handleProductCreated = (productId: number) => {
    setCreatedProductId(productId);
  };

  const handleVariantCreated = () => {
    // Optionally reset or show success message
    // You can add more variants or reset the form
  };

  return (
    <section className="flex flex-col px-6 py-6 space-y-6">
      <SubHeading
        title="Add new Product"
        className="text-sm text-[#3B3B3B] font-semibold pt-7.5  "
      />
      <div className="border border-[#F0F0F0] rounded-lg p-6 pt-4 ">
        <ProductForm onProductCreated={handleProductCreated} />
        {createdProductId && (
          <div className="flex flex-col gap-7.5 ">
            <SubHeading
              title="Add variant to product"
              className="text-sm text-[#3B3B3B] font-semibold pt-7.5  "
            />
            <VariantForm
              productId={createdProductId}
              onVariantCreated={handleVariantCreated}
            />
          </div>
        )}
      </div>
    </section>
  );
};

export default NewProductScreen;
