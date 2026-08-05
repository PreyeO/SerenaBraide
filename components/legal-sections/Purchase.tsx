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
          weekends and public holidays. You’ll receive a confirmation email
          after purchase, and another once your order ships. If there’s a delay
          or stock issue, we’ll reach out directly.
          <br />
          <br />
          Orders cannot be modified or cancelled once placed. Please
          double-check shipping details, items, and quantities before completing
          your purchase.
        </LegalParagraph>
      </LegalTypography>
      <LegalTypography title="Payments">
        <LegalParagraph>
          We accept major debit and credit cards, Flutterwave, and Serena Braide
          gift cards. All transactions are processed through secure, certified
          payment providers. Serena Braide does not store your card information.
        </LegalParagraph>
      </LegalTypography>
      <LegalTypography title="Shipping & Delivery">
        <LegalParagraph>
          Delivery timelines and fees are calculated at checkout and vary by
          destination. Estimated delivery times are not guaranteed and may be
          affected by courier or customs delays.
          <br />
          <br />
          You’re responsible for providing accurate shipping information. We’re
          not liable for orders delivered to an incorrect address supplied at
          checkout.
        </LegalParagraph>
      </LegalTypography>
      <LegalTypography title="International Orders">
        <LegalParagraph>
          Duties, taxes, or customs fees may apply depending on your country.
          These charges are the customer’s responsibility.
        </LegalParagraph>
      </LegalTypography>
      <LegalTypography title="Returns & Exchanges">
        <LegalParagraph>
          For hygiene and safety reasons, we only accept returns of items that
          are{" "}
          <strong>unused, unopened, and in their original packaging</strong>,
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
          with your order number. If approved, we’ll send return instructions.
          <br />
          <br />
          Shipping fees are non-refundable unless the return is due to our error
          (wrong or defective item).
        </LegalParagraph>
      </LegalTypography>
      <LegalTypography title="Damaged or Incorrect Items">
        <LegalParagraph>
          Please notify us within <strong>48 hours</strong> of delivery, with
          photo evidence. We’ll arrange a replacement or refund where
          appropriate.
        </LegalParagraph>
      </LegalTypography>

      <LegalTypography title="Gift Cards">
        <LegalParagraph>
          Gift cards are non-refundable, non-transferable, and cannot be
          exchanged for cash.
          <br />
          <br />
          Serena Braide reserves the right to refuse returns that don’t meet
          these conditions.
        </LegalParagraph>
      </LegalTypography>
    </section>
  );
};

export default Purchase;
