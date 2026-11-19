import React from "react";
import ProductImage from "@/components/ui/images/product-image";
import { ProductListItem } from "@/features/products/product.type";
import { listSaleFields } from "./ConvertToProduct";

interface SearchProductItemProps {
  item: ProductListItem;
  onClick: (slug: string, categorySlug: string) => void;
}

const formatPrice = (price: string) => {
  return `₦${parseFloat(price).toLocaleString()}`;
};

const SearchProductItem: React.FC<SearchProductItemProps> = ({
  item,
  onClick,
}) => {
  const sale = listSaleFields(item);
  return (
    <li
      className="flex gap-4 items-center text-[#363438] text-sm font-normal group cursor-pointer"
      onClick={() => onClick(item.slug, item.category_slug)}
    >
      <div className="overflow-hidden rounded-md w-12.5 h-12.5 shrink-0 bg-gray-100">
        {item.primary_image && (
          <ProductImage
            src={item.primary_image}
            width={50}
            height={50}
            alt={item.name}
            className=""
            imageClassName="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
          />
        )}
      </div>
      <div className="flex flex-col gap-1">
        <span className="font-medium line-clamp-1">{item.name}</span>
        <span className="text-[#6F6E6C] text-xs font-light flex gap-1.5">
          {sale.compareAtPrice && (
            <s className="text-[#9A9A98]">
              <span className="sr-only">Was </span>
              {sale.compareAtPrice}
            </s>
          )}
          <span>
            {item.price_range
              ? formatPrice(item.price_range)
              : formatPrice(item.base_price)}
          </span>
        </span>
      </div>
    </li>
  );
};

export default SearchProductItem;
