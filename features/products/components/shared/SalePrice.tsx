import React from "react";
import { getSaleInfo } from "@/lib/sale-price";
import { formatPrice } from "../../product.utils";

interface SalePriceProps {
  /** What the customer pays (the variant's effective_price). */
  price: string | number;
  /** Display-only "was" price; ignored unless it's above `price`. */
  compareAt?: string | number | null;
  className?: string;
}

/**
 * Selling price, with the "was" price crossed out and a "-20%" badge when the
 * item is on sale. Shows just the price otherwise.
 */
const SalePrice: React.FC<SalePriceProps> = ({ price, compareAt, className = "" }) => {
  const sale = getSaleInfo(price, compareAt);

  return (
    <div className={`flex flex-wrap items-baseline gap-x-2 gap-y-1 ${className}`}>
      {sale && (
        <s className="text-[#9A9A98] font-normal text-[0.85em]">
          <span className="sr-only">Was </span>
          {formatPrice(sale.compareAt)}
        </s>
      )}
      <span>
        {sale && <span className="sr-only">now </span>}
        {formatPrice(price)}
      </span>
      {sale?.percentOff ? (
        <span className="self-center rounded-[40px] bg-[#C40606] text-white px-2 py-0.5 text-[10px] font-medium leading-4">
          -{sale.percentOff}%
        </span>
      ) : null}
    </div>
  );
};

export default SalePrice;
