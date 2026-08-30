"use client";

import AuthSpan from "@/components/ui/typography/auth-span";
import Caption from "@/components/ui/typography/caption";

export default function DeliveryInformation() {
  return (
    <div>
      <Caption
        className="text-[#3B3B3B] text-sm lg:text-base font-medium"
        title="  Delivery Information:"
      />

      <div className="mt-2.5 border border-[#D1D5DB] rounded-[10px]  lg:px-[12.5px] px-2.5 py-2.5">
        <AuthSpan className="lg:text-sm text-xs leading-4.5 lg:*:leading-5.5 font-normal text-[#3B3B3B]">
          <span className="font-medium">Standard Shipping:</span> Arrives within
          1–2 days in Lagos and 2–3 days outside Lagos.
        </AuthSpan>
      </div>
    </div>
  );
}
