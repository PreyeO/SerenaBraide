"use client";

export default function DeliveryInformation() {
  return (
    <div>
      <h4 className="text-[#3B3B3B] font-medium text-sm">
        Delivery Information:
      </h4>

      <div className="mt-[10px] border border-[#D1D5DB] rounded-[10px] text-sm leading-[22px] font-normal px-[12.5px] py-[10px]">
        <p>
          <span className="font-medium">Standard Shipping:</span> Arrives within
          2–4 business days. <br />
          Orders placed after 10 PM on Friday or during the weekend will be
          processed on Monday, excluding public holidays.
        </p>
      </div>
    </div>
  );
}
