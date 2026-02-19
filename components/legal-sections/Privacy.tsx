import React from "react";
import LegalTypography from "./shared-components/LegalTypography";
import {
  collectedCookiesList,
  dataRights,
  dataShared,
  processedBasis,
  useOfData,
  whyCookiesList,
} from "@/components/legal-sections/data/legal";
import { effectiveDate } from "@/lib/utils";
import LegalParagraph from "./shared-components/LegalParagraph";
import LegalList from "./shared-components/LegalList";
import LegalIntro from "./shared-components/LegalIntro";

const Privacy = () => {
  return (
    <section className="lg:px-12.5  md:px-6 px-0 flex flex-col lg:gap-8.5 gap-6 pb-12.5">
      <LegalIntro
        title="Privacy Policy"
        content1="Serena Braide Privacy Policy"
        content={`Effective Date: ${effectiveDate}`}
      />
      <LegalParagraph>
        Serena Braide (“we”, “our”, or “us”) respects your privacy and is
        committed to protecting your personal data. This Privacy Policy explains
        how we collect, use, disclose, and safeguard your information when you
        visit or make a purchase from our website or otherwise interact with us.
        <br />
        <br />
        This policy is designed in line with the Nigeria Data Protection Act
        (NDPA), the Nigeria Data Protection Regulation (NDPR), and, where
        applicable, international data protection principles.
      </LegalParagraph>
      <LegalTypography title="Information We Collect">
        <LegalParagraph>
          We may collect the following categories of personal data:
        </LegalParagraph>
      </LegalTypography>
      <LegalTypography>
        <LegalParagraph>Information We Provide</LegalParagraph>
        <LegalList items={whyCookiesList} />
      </LegalTypography>
      <LegalTypography>
        <LegalParagraph> Information collected automatically</LegalParagraph>

        <LegalList items={collectedCookiesList} />
      </LegalTypography>
      <LegalTypography title="">
        <LegalParagraph>
          Payment Information
          <br />
          Payments are processed by secure third-party providers. We do not
          store your card or banking details.
        </LegalParagraph>
      </LegalTypography>
      <LegalTypography title="How We Use Your Information">
        <LegalParagraph>We process personal data to</LegalParagraph>

        <LegalList items={useOfData} />
      </LegalTypography>
      <LegalTypography title="Lawful Basis for Processing">
        <LegalParagraph>
          Under applicable data protection laws, we rely on one or more of the
          following grounds:
        </LegalParagraph>

        <LegalList items={processedBasis} />
      </LegalTypography>
      <LegalTypography title="Sharing of Personal Data">
        <LegalParagraph>
          We do not sell your personal information.
          <br />
          <br />
          We may share necessary data with trusted third parties such as:
        </LegalParagraph>

        <LegalList items={dataShared} />
        <LegalParagraph>
          These parties are required to process data only for agreed purposes
          and to safeguard it.
        </LegalParagraph>
      </LegalTypography>
      <LegalTypography title="International Transfers">
        <LegalParagraph>
          Because some of our partners operate globally, your information may be
          transferred outside Nigeria. Where this happens, we take reasonable
          steps to ensure adequate protection consistent with applicable law.
        </LegalParagraph>
      </LegalTypography>
      <LegalTypography title="Data Retention">
        <LegalParagraph>
          We keep personal data only for as long as necessary for business,
          legal, tax, or regulatory requirements, or to resolve disputes.
        </LegalParagraph>
      </LegalTypography>

      <LegalTypography title="Your Rights">
        <LegalParagraph>
          Subject to applicable law, you may have the right to:
        </LegalParagraph>

        <LegalList items={dataRights} />

        <LegalParagraph>
          To exercise your rights, contact us using the details below.
        </LegalParagraph>
      </LegalTypography>
      <LegalTypography title="Marketing Communications">
        <LegalParagraph>
          If you opt in to receive promotions, we may send you emails or
          messages about new products and offers. You may unsubscribe at any
          time via the link in the message.
        </LegalParagraph>
      </LegalTypography>
      <LegalTypography title="Cookies & Tracking">
        <LegalParagraph>
          We use cookies and similar technologies to operate the website,
          remember preferences, analyze usage, and support marketing. Please see
          our Cookie Policy for more information.
        </LegalParagraph>
      </LegalTypography>
      <LegalTypography title="Data Security">
        <LegalParagraph>
          We implement reasonable administrative, technical, and organizational
          safeguards designed to protect personal information. However, no
          internet transmission is completely secure.
        </LegalParagraph>
      </LegalTypography>
      <LegalTypography title="Children's Data">
        <LegalParagraph>
          Our website and products are not directed at children under 13. We do
          not knowingly collect personal data from minors.
        </LegalParagraph>
      </LegalTypography>
      <LegalTypography title="Compliants">
        <LegalParagraph>
          If you believe your data has been handled improperly, please contact
          us first so we can resolve the issue. You also have the right to lodge
          a complaint with the relevant data protection authority.
        </LegalParagraph>
      </LegalTypography>
      <LegalTypography title="Conntact Us">
        <LegalParagraph>
          For questions, requests, or concerns about this Privacy Policy or your
          personal data, please contact:
          <br />
          <br />
          Email:{" "}
          <a
            href="mailto:hello@serenabraide.com"
            className="underline text-blue-400"
          >
            hello@serenabraide.com
          </a>{" "}
        </LegalParagraph>
      </LegalTypography>
      <LegalTypography title="Updates to This Policy">
        <LegalParagraph>
          We may revise this Privacy Policy from time to time. The latest
          version will always be available on our website.
          <br />
          <br />
          By using our website, you acknowledge that you have read and
          understood this policy.
          <br />
          <br />
          Serena Braide
        </LegalParagraph>
      </LegalTypography>
    </section>
  );
};

export default Privacy;
