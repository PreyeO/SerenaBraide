import React from "react";
import SubHeading from "../../ui/typography/subHeading";
import { ChevronRight } from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "../../ui/tabs";

import { Product } from "@/types/product";
import UnderlineLink from "@/components/ui/btns/underline-cta";

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
  // productDisplay,
}) => {
  return (
    <section className={`px-16 py-12.5 ${bgColor}`}>
      <div className="flex flex-col">
        <SubHeading
          title={title}
          className={` ${textColor} font-extralight italic text-[40px] text-center pt-5`}
        />
      </div>
      <div className="flex gap-2.5 items-center justify-end">
        <UnderlineLink
          href={linkHref}
          text={linkText}
          className={`text-[12px] ${linkColor}`}
        />
        <ChevronRight size={24} className={linkColor} />
      </div>

      <Tabs
        defaultValue={categories[0]}
        className="w-full bg-transparent pt-5.25 text-white"
      >
        <TabsList className="mx-auto gap-4 max-w-145.7">
          {categories.map((cat) => (
            <TabsTrigger key={cat} value={cat}>
              {cat.toUpperCase()}
            </TabsTrigger>
          ))}
        </TabsList>

        {/* {categories.map((cat) => (
          <TabsContent key={cat} value={cat}>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 justify-items-center">
              {productDisplay[cat]?.map((product, idx) => (
                <LandingProductCard key={idx} product={product} />
              ))}
            </div>
          </TabsContent>
        ))} */}
      </Tabs>
    </section>
  );
};

export default ProductSection;
