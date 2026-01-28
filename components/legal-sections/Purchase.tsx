import React from "react";
import LegalIntro from "./shared-components/LegalIntro";
import LegalTypography from "./shared-components/LegalTypography";
import LegalParagraph from "./shared-components/LegalParagraph";
import LegalList from "./shared-components/LegalList";
import {
  giftCardList,
  purchaseOrdersList,
  purchasePaymentList,
  returnList,
  shippingList,
} from "@/components/legal-sections/data/legal";
import Link from "next/link";

const Purchase = () => {
  return (
    <section className="lg:px-12.5 md:px-6 px-0 flex flex-col lg:gap-8.5 gap-6 pb-12.5">
      <LegalIntro
        title="Purchase Policy — Serena Braide"
        content="Thank you for choosing Serena Braide. We’re committed to 
        providing you with a seamless and satisfying shopping experience. 
        Please review the following purchase policy to understand our terms regarding orders, 
        payments, shipping, returns, and more."
      />

      <LegalTypography title="Order Processing">
        <LegalList items={purchaseOrdersList} />
      </LegalTypography>

      <LegalTypography title="Orders & Payments">
        <LegalParagraph>
          We accept the following payment options:
        </LegalParagraph>

        <LegalList items={purchasePaymentList} />

        <LegalParagraph>
          All payments are processed securely. We do not store your credit card
          information.
        </LegalParagraph>
      </LegalTypography>

      <LegalTypography title="Shipping & Delivery">
        <LegalList items={shippingList} />
      </LegalTypography>

      <LegalTypography title="Returns & Exchanges">
        <LegalList items={returnList} />
      </LegalTypography>

      <LegalTypography title="Gift Card Terms">
        <LegalList items={giftCardList} />

        <LegalParagraph>
          You can check your balance at any time on our{" "}
          <Link href="/gift-card-balance" className="underline text-blue-400">
            Gift Card Balance page
          </Link>
          .
        </LegalParagraph>
      </LegalTypography>
    </section>
  );
};

export default Purchase;
