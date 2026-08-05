import React from "react";
import LegalTypography from "./shared-components/LegalTypography";
import LegalParagraph from "./shared-components/LegalParagraph";
import LegalList from "./shared-components/LegalList";
import {
  CookiesTypeList,
  useCookiesList,
} from "@/components/legal-sections/data/legal";
import LegalIntro from "./shared-components/LegalIntro";

const Cookies = () => {
  return (
    <section className="lg:px-12.5 md:px-6 px-0 flex flex-col lg:gap-8.5 gap-6 pb-12.5">
      <LegalIntro
        title="Cookie Policy"
        content1="Serena Braide Cookie Policy"
        content="We use cookies and similar technologies to improve your browsing experience and understand how our website is used."
      />

      <LegalTypography title="What Cookies Do?">
        <LegalParagraph>Cookies help us:</LegalParagraph>
        <LegalList items={useCookiesList} />
      </LegalTypography>

      <LegalTypography title="Types of Cookies">
        <LegalList items={CookiesTypeList} />
        <LegalParagraph className="mt-3">
          Analytics, functionality, and marketing cookies are only set with your
          consent, collected through our cookie banner when you first visit. You
          can change your preferences at any time through your browser settings
          or our cookie preference center.
        </LegalParagraph>
      </LegalTypography>

      <LegalTypography title="Managing Cookies">
        <LegalParagraph>
          You can control cookies through your browser settings. Disabling some
          may affect site functionality.
        </LegalParagraph>
      </LegalTypography>
    </section>
  );
};

export default Cookies;
