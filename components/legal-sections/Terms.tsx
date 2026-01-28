import React from "react";
import LegalIntro from "./shared-components/LegalIntro";
import LegalTypography from "./shared-components/LegalTypography";
import LegalParagraph from "./shared-components/LegalParagraph";
import LegalList from "./shared-components/LegalList";
import {
  ordersList,
  useOfWebsite,
} from "@/components/legal-sections/data/legal";
import Link from "next/link";

const Terms = () => {
  return (
    <section className="lg:px-12.5 md:px-6 px-0 flex flex-col lg:gap-8.5 gap-6 pb-12.5">
      <LegalIntro
        title="Terms of Service"
        content="Welcome to Serena Braide. By accessing or using our website, you agree to 
        be bound by the following Terms of Service. Please read them carefully before making a 
        purchase or browsing our offerings."
      />

      <LegalTypography title="Overview">
        <LegalParagraph>
          This website is operated by Serena Braide. Throughout the site, the
          terms “we,” “us,” and “our” refer to Serena Braide. These Terms apply
          to all users of the site, including browsers, customers, vendors, and
          content contributors.
        </LegalParagraph>
      </LegalTypography>

      <LegalTypography title="Use Of Website">
        <LegalParagraph>
          You agree to use this website only for lawful purposes and in
          accordance with these Terms. You may not:
        </LegalParagraph>

        <LegalList items={useOfWebsite} />
      </LegalTypography>

      <LegalTypography title="Product Information">
        <LegalParagraph>
          We make every effort to display the colors, descriptions, and
          packaging of our perfumes as accurately as possible. However, we
          cannot guarantee that your device’s display will reflect the true
          appearance. All product availability and pricing are subject to change
          without notice.
        </LegalParagraph>
      </LegalTypography>

      <LegalTypography title="Orders & Payments">
        <LegalParagraph>By placing an order, you confirm that:</LegalParagraph>
        <LegalList items={ordersList} />
      </LegalTypography>

      <LegalTypography title="Privacy">
        <LegalParagraph>
          We value your privacy. Please refer to our{" "}
          <Link href="/privacy_policy" className="underline text-blue-400">
            Privacy Policy
          </Link>{" "}
          to understand how we collect, use, and protect your personal
          information.
        </LegalParagraph>
      </LegalTypography>
    </section>
  );
};

export default Terms;
