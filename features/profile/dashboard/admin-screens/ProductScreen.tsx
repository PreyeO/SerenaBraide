"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useGetProducts } from "@/features/profile/hooks/admin/useGetProducts";
import ProductForm from "./components/forms/ProductForm";
import CategoryForm from "./components/forms/CategoryForm";
import VariantForm from "./components/forms/VariantForm";
import ProductTable from "./components/tables/ProductTable";
import SubHeading from "@/components/ui/typography/subHeading";
import DashboardLoader from "@/components/ui/loaders/dasboard-loader";

const ProductScreen = () => {
  const { data: products, isLoading, refetch } = useGetProducts();
  const [activeTab, setActiveTab] = useState("all-products");

  if (isLoading) return <DashboardLoader />;

  const handleProductCreated = () => {
    refetch();
    setActiveTab("all-products");
  };

  const handleVariantCreated = () => {
    refetch();
  };

  const handleAddProduct = () => {
    setActiveTab("add-product");
  };

  return (
    <section className="py-7.5">
      <SubHeading
        title="Product Management"
        className="text-sm text-[#3B3B3B] font-semibold pb-6  "
      />

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="inline-flex h-12 items-center justify-start gap-2 bg-transparent p-0 mb-6 border-b border-[#E5E5E5] w-full">
          <TabsTrigger
            value="all-products"
            className="px-6 py-3 text-sm font-medium text-[#6F6E6C] border-b-2 border-transparent rounded-none data-[state=active]:text-[#3B3B3B] data-[state=active]:border-[#3B3B3B] data-[state=active]:bg-transparent hover:text-[#3B3B3B] transition-colors"
          >
            All Products
          </TabsTrigger>
          <TabsTrigger
            value="add-category"
            className="px-6 py-3 text-sm font-medium text-[#6F6E6C] border-b-2 border-transparent rounded-none data-[state=active]:text-[#3B3B3B] data-[state=active]:border-[#3B3B3B] data-[state=active]:bg-transparent hover:text-[#3B3B3B] transition-colors"
          >
            Add Product Category
          </TabsTrigger>
          <TabsTrigger
            value="add-product"
            className="px-6 py-3 text-sm font-medium text-[#6F6E6C] border-b-2 border-transparent rounded-none data-[state=active]:text-[#3B3B3B] data-[state=active]:border-[#3B3B3B] data-[state=active]:bg-transparent hover:text-[#3B3B3B] transition-colors"
          >
            Add New Product
          </TabsTrigger>

          <TabsTrigger
            value="add-variant"
            className="px-6 py-3 text-sm font-medium text-[#6F6E6C] border-b-2 border-transparent rounded-none data-[state=active]:text-[#3B3B3B] data-[state=active]:border-[#3B3B3B] data-[state=active]:bg-transparent hover:text-[#3B3B3B] transition-colors"
          >
            Add Variant
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all-products" className="mt-0">
          <ProductTable products={products || []} onAddProduct={handleAddProduct} />
        </TabsContent>

        <TabsContent value="add-product" className="mt-0">
          <ProductForm onProductCreated={handleProductCreated} />
        </TabsContent>

        <TabsContent value="add-category" className="mt-0">
          <CategoryForm />
        </TabsContent>

        <TabsContent value="add-variant" className="mt-0">
          <VariantForm onVariantCreated={handleVariantCreated} />
        </TabsContent>
      </Tabs>
    </section>
  );
};

export default ProductScreen;
