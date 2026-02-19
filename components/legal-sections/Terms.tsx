import React from "react";
import LegalIntro from "./shared-components/LegalIntro";
import LegalTypography from "./shared-components/LegalTypography";
import LegalParagraph from "./shared-components/LegalParagraph";

const Terms = () => {
  return (
    <section className="lg:px-12.5 md:px-6 px-0 flex flex-col lg:gap-8.5 gap-6 pb-12.5">
      <LegalIntro
        title="Terms of Service"
        content1="Serena Braide Terms of Service"
        content="By accessing or purchasing from our website, you agree to these Terms."
      />

      <LegalTypography title="Use of Site">
        <LegalParagraph>
          You agree to use this website only for lawful purposes. You must not
          attempt to interfere with site security, misuse the platform, or use
          our products for illegal activities.
        </LegalParagraph>
      </LegalTypography>

      <LegalTypography title="Eligibility">
        <LegalParagraph>
          By placing an order, you confirm that you are legally capable of
          entering into a binding agreement.
        </LegalParagraph>
      </LegalTypography>

      <LegalTypography title="Product Information">
        <LegalParagraph>
          We aim to present products as accurately as possible. However, colors,
          packaging, or minor details may vary. Availability and pricing may
          change without notice.
        </LegalParagraph>
      </LegalTypography>

      <LegalTypography title="Orders">
        <LegalParagraph>
          {" "}
          We reserve the right to refuse or cancel orders where fraud is
          suspected, payment is not authorized, or items are unavailable.
        </LegalParagraph>
      </LegalTypography>

      <LegalTypography title="Intellectual Property">
        <LegalParagraph>
          {" "}
          All content on this website including our name, logos, product names,
          images, and designs belongs to Serena Braide and may not be used
          without written permission.
        </LegalParagraph>
      </LegalTypography>
      <LegalTypography title="Limitation of Liability">
        <LegalParagraph>
          {" "}
          To the extent permitted by law, Serena Braide is not liable for
          indirect or consequential damages arising from the use of our website
          or products.
        </LegalParagraph>
      </LegalTypography>

      <LegalTypography title="Third-Party Services">
        <LegalParagraph>
          {" "}
          We may link to or use third-party providers. We are not responsible
          for their content or practices.
        </LegalParagraph>
      </LegalTypography>
      <LegalTypography title="Changes">
        <LegalParagraph>
          {" "}
          We may update these Terms at any time. Continued use of the website
          means you accept any revisions.
        </LegalParagraph>
      </LegalTypography>
    </section>
  );
};

export default Terms;
