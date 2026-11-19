"use client";

import { Control, FieldValues, Path } from "react-hook-form";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

interface CompareAtPriceFieldProps<T extends FieldValues> {
  control: Control<T>;
}

/**
 * Optional "was" price for sales. When filled in (and higher than the selling
 * price) the shop shows it crossed out next to the price, with a "-X%" badge.
 * Display only — customers are always charged the selling price. Empty it to
 * end the sale.
 */
function CompareAtPriceField<T extends FieldValues>({ control }: CompareAtPriceFieldProps<T>) {
  return (
    <FormField
      control={control}
      name={"compare_at_price" as Path<T>}
      render={({ field }) => (
        <FormItem>
          <FormLabel className="text-sm font-normal text-[#3B3B3B]">
            &quot;Was&quot; price (sales only)
          </FormLabel>
          <FormControl>
            <Input
              type="number"
              step="0.01"
              placeholder="Leave empty if not on sale"
              className="h-11"
              {...field}
              value={field.value ?? ""}
            />
          </FormControl>
          <p className="text-xs text-[#6F6E6C]">
            Shown crossed out, e.g. <s>₦88,000</s> ₦70,400. Must be higher than the
            price. Clear it when the sale ends.
          </p>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

export default CompareAtPriceField;
