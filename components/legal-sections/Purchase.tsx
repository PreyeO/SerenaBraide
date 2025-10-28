import React from "react";
import LegalIntro from "./shared-components/LegalIntro";
import LegalTypography from "./shared-components/LegalTypography";
import Paragraph from "../ui/typography/paragraph";
import {
  giftCardList,
  ordersList,
  purchaseOrdersList,
  purchasePaymentList,
  returnList,
  shippingList,
  useOfWebsite,
} from "@/constant/legal";
import Link from "next/link";

const Purchase = () => {
  return (
    <section className="px-[50px] flex flex-col gap-[34px] pb-[50px]">
      <LegalIntro
        title="Purchase Policy — Serena Braide"
        content="Thank you for choosing Serena Braide. We’re committed to 
        providing you with a seamless and satisfying shopping experience. 
        Please review the following purchase policy to understand our terms regarding orders, 
        payments, shipping, returns, and more."
      />

      <LegalTypography className="" title="Order Processing">
        <div className="text-sm leading-[22px]  w-[832px]">
          <ul className="list-disc ml-8 ">
            {purchaseOrdersList.map((item, index) => (
              <li key={index} className="">
                {item.list}
              </li>
            ))}
          </ul>
        </div>
      </LegalTypography>

      <LegalTypography className="" title="Orders & Payments">
        <div className="text-sm leading-[22px]  w-[832px]">
          <Paragraph
            className=" "
            content="We accept the following payment options:"
          />
          <ul className="list-disc ml-8  ">
            {purchasePaymentList.map((item, index) => (
              <li key={index} className="">
                {item.list}
              </li>
            ))}
          </ul>
          <Paragraph
            className=" "
            content="All payments are processed securely. We do not store your credit card information."
          />
        </div>
      </LegalTypography>
      <LegalTypography className="" title="Shipping & Delivery">
        <div className="text-sm leading-[22px]  w-[832px]">
          <ul className="list-disc ml-8 ">
            {shippingList.map((item, index) => (
              <li key={index} className="">
                {item.list}
              </li>
            ))}
          </ul>
        </div>
      </LegalTypography>
      <LegalTypography className="" title="Returns & Exchanges">
        <div className="text-sm leading-[22px]  w-[832px]">
          <ul className="list-disc ml-8 ">
            {returnList.map((item, index) => (
              <li key={index} className="">
                {item.list}
              </li>
            ))}
          </ul>
        </div>
      </LegalTypography>
      <LegalTypography className="" title="Gift Card Terms">
        <div className="text-sm leading-[22px]  w-[832px]">
          <ul className="list-disc ml-8 ">
            {giftCardList.map((item, index) => (
              <li key={index} className="">
                {item.list}
              </li>
            ))}
          </ul>

          <p className=" ">
            You can check your balance at any time on our
            <span className="underline text-blue-400">
              <Link href="/gift-card-balance"> Gift Card Balance page.</Link>
            </span>
          </p>
        </div>
      </LegalTypography>
    </section>
  );
};

export default Purchase;
