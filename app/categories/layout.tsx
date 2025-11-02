"use client";

import ProductHero from "@/components/product-sections/all-product/ProductHero";
import { categoryHeroInfo } from "@/constant/product";
import { usePathname } from "next/navigation";

export default function ProductsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const category = pathname.split("/")[2];

  const hero = categoryHeroInfo[category as keyof typeof categoryHeroInfo];

  return (
    <div>
      {hero && (
        <ProductHero
          title={hero.title}
          description={hero.description}
          alt={hero.title}
          src={hero.image}
        />
      )}

      <main className="px-16">{children}</main>
    </div>
  );
}
