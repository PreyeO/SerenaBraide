import React from "react";
import SubHeading from "../../ui/typography/subHeading";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../ui/tabs";
import ProductCard from "../../ui/cards/product-card";
import { Product } from "@/types/product";

interface ProductSectionProps {
  title: string;
  linkText: string;
  linkHref: string;
  bgColor?: string;
  textColor?: string;
  linkColor?: string;
  categories: string[];
  productDisplay: Record<string, Product[]>;
}

const ProductSection: React.FC<ProductSectionProps> = ({
  title,
  linkText,
  linkHref,
  bgColor = "bg-black",
  categories,
  textColor = "text-white",
  linkColor = "text-white",
  productDisplay,
}) => {
  return (
    <section className={`px-16 py-[50px] ${bgColor}`}>
      <div className="flex flex-col">
        <SubHeading
          title={title}
          className={` ${textColor} font-extralight italic text-[40px] text-center pt-5`}
        />
      </div>

      <Link
        href={linkHref}
        className={`flex gap-[10px] items-center justify-end  ${linkColor}`}
      >
        <p className={`text-[12px]  underline`}>{linkText}</p>
        <ChevronRight size={24} />
      </Link>

      <Tabs
        defaultValue={categories[0]}
        className="w-full bg-transparent pt-[21px] text-white"
      >
        <TabsList className="mx-auto gap-4 max-w-[583px]">
          {categories.map((cat) => (
            <TabsTrigger key={cat} value={cat}>
              {cat.toUpperCase()}
            </TabsTrigger>
          ))}
        </TabsList>

        {categories.map((cat) => (
          <TabsContent key={cat} value={cat}>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 justify-items-center">
              {productDisplay[cat]?.map((product, idx) => (
                <ProductCard key={idx} product={product} />
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </section>
  );
};

export default ProductSection;
