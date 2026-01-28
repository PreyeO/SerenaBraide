import React from "react";
import LegalTypography from "./shared-components/LegalTypography";
import {
  collectedCookiesList,
  dataRights,
  dataShared,
  useOfData,
  whyCookiesList,
} from "@/components/legal-sections/data/legal";
import { effectiveDate } from "@/lib/utils";
import Link from "next/link";
import LegalParagraph from "./shared-components/LegalParagraph";
import LegalList from "./shared-components/LegalList";
import LegalHeader from "./shared-components/LegalHeader";

const Privacy = () => {
  return (
    <section className="lg:px-12.5  md:px-6 px-0 flex flex-col lg:gap-8.5 gap-6 pb-12.5">
      <LegalHeader title="Privacy Policy" effectiveDate={effectiveDate}>
        Welcome to Serena Braide. Your privacy matters to us. This Privacy
        Policy explains how we collect, use, and protect your personal
        information when you visit or interact with our website at{" "}
        <a
          href="https://www.serenabraide.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-400 underline transition-colors"
        >
          www.serenabraide.com
        </a>
      </LegalHeader>
      <LegalTypography title="Information We Collect">
        <LegalParagraph>
          Cookies are small text files placed on your device when you visit a
          website. They help the site recognize your browser, remember your
          preferences, and improve your overall user experience.
        </LegalParagraph>
      </LegalTypography>

      <LegalTypography title="Why We Collect Information">
        <LegalParagraph>
          We collect the following type of information:
        </LegalParagraph>

        <LegalList items={whyCookiesList} />
      </LegalTypography>

      <LegalTypography title="Automatically Collected Information">
        <LegalList items={collectedCookiesList} />

        <Link href="/cookie_policy" className="underline text-blue-400 text-sm">
          (see our Cookies Policy)
        </Link>
      </LegalTypography>

      <LegalTypography title="How We Use Your Information">
        <LegalParagraph>We use your information to:</LegalParagraph>

        <LegalList items={useOfData} />
      </LegalTypography>

      <LegalTypography title="Sharing Your Information">
        <LegalParagraph>We do not sell your personal data.</LegalParagraph>

        <LegalParagraph>We may share limited information with:</LegalParagraph>

        <LegalList items={dataShared} />

        <LegalParagraph>
          Only trusted partners are used, and they are required to protect your
          data and use it only for agreed purposes.
        </LegalParagraph>
      </LegalTypography>

      <LegalTypography title="Your Privacy Rights">
        <LegalParagraph>
          Depending on your location, you may have rights to:
        </LegalParagraph>

        <LegalList items={dataRights} />

        <LegalParagraph>
          To exercise these rights, please contact us at
          support@serenabraide.com.
        </LegalParagraph>
      </LegalTypography>

      <LegalTypography title="Marketing Communications">
        <LegalParagraph>
          We only send promotional emails if you opt-in via our newsletter or
          during checkout. You may unsubscribe at any time by clicking the link
          in our emails.
        </LegalParagraph>
      </LegalTypography>

      <LegalTypography title="Data Security">
        <LegalParagraph>
          We take reasonable measures to protect your data using
          industry-standard encryption, secure hosting, and access controls.
          However, no method of online transmission is 100% secure.
        </LegalParagraph>
      </LegalTypography>

      <LegalTypography title="Children's Privacy">
        <LegalParagraph>
          Our website is not intended for children under 13. We do not knowingly
          collect data from minors. If you believe a child has submitted data to
          us, please contact us for removal.
        </LegalParagraph>
      </LegalTypography>

      <LegalTypography title="Third-Party Links">
        <LegalParagraph>
          Our website may contain links to third-party sites. We are not
          responsible for their privacy practices or content.
        </LegalParagraph>
      </LegalTypography>

      <LegalTypography title="Changes to This Policy">
        <LegalParagraph>
          We may update this Privacy Policy from time to time. Any significant
          changes will be posted here. We encourage you to review this page
          periodically.
        </LegalParagraph>
      </LegalTypography>
    </section>
  );
};

export default Privacy;
