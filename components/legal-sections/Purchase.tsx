import React from "react";
import LegalIntro from "./shared-components/LegalIntro";
import LegalTypography from "./shared-components/LegalTypography";
import LegalParagraph from "./shared-components/LegalParagraph";

const Purchase = () => {
  return (
    <section className="lg:px-12.5 md:px-6 px-0 flex flex-col lg:gap-8.5 gap-6 pb-12.5">
      <LegalIntro
        title="Purchase Policy"
        content1="Serena Braide Purchase Policy"
        content="Thank you for shopping with Serena Braide. By placing an order on our website, you agree to the terms below."
      />
      <LegalTypography title="Order Processing">
        <LegalParagraph>
          Orders are typically processed within 1–2 business days, excluding
          weekends and public holidays. You will receive a confirmation email
          after purchase and another once your order has shipped. If there is a
          delay or stock issue, we will contact you.
          <br />
          <br />
          Modifications or cancellations are not possible once an order has been
          placed. Please double-check all shipping details, items, and
          quantities before purchasing.
        </LegalParagraph>
      </LegalTypography>
      <LegalTypography title="Orders & Payments">
        <LegalParagraph>
          We accept major debit and credit cards, Flutterwave, and Serena Braide
          gift cards. All transactions are processed through secure, certified
          payment providers, and Serena Braide does not store your card
          information
        </LegalParagraph>
      </LegalTypography>
      <LegalTypography title="Shipping & Delivery">
        <LegalParagraph>
          Delivery timelines and fees are calculated at checkout and vary by
          destination. Estimated delivery times are not guaranteed and may be
          affected by courier or customs delays.
          <br />
          <br />
          Customers are responsible for providing accurate shipping information.
          We are not liable for orders delivered to an incorrect address
          supplied at checkout.
        </LegalParagraph>
      </LegalTypography>
      <LegalTypography title="International Orders">
        <LegalParagraph>
          Duties, taxes, or customs fees may apply depending on your country.
          These charges are the responsibility of the customer.
        </LegalParagraph>
      </LegalTypography>
      <LegalTypography title="Returns & Exchanges">
        <LegalParagraph>
          For hygiene and safety reasons, we can only accept returns of items
          that are{" "}
          <strong>unused, unopened, and in their original packaging</strong>{" "}
          within <strong>7 days</strong> of delivery.
          <br />
          <br />
          To request a return, contact us at{" "}
          <a
            href="mailto:hello@serenabraide.com"
            className="underline text-blue-400"
          >
            hello@serenabraide.com
          </a>{" "}
          with your order number. If approved, return instructions will be
          provided.
          <br />
          <br />
          Shipping fees are non-refundable unless the return is due to our error
          (wrong or defective item).
        </LegalParagraph>
      </LegalTypography>
      <LegalTypography title="Damaged or Incorect Items">
        <LegalParagraph>
          Please notify us within <strong>48 hours</strong> of delivery and
          include photo evidence. We will arrange a replacement or refund where
          appropriate.
        </LegalParagraph>
      </LegalTypography>

      <LegalTypography title="Gift Card">
        <LegalParagraph>
          Gift cards are non-refundable, non-transferable, and cannot be
          exchanged for cash.
          <br />
          <br />
          You can check your balance at any time on our Serena Braide reserves
          the right to refuse returns that do not meet these conditions.
        </LegalParagraph>
      </LegalTypography>
    </section>
  );
};

export default Purchase;
