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
      </LegalTypography>

      <LegalTypography title="How To Manage Cookies">
        <LegalParagraph>
          You can control cookies through your browser settings. Disabling some
          may affect site functionality.
          <br />
          <br />
          By continuing to use our website, you agree to our use of cookies.
        </LegalParagraph>
      </LegalTypography>
    </section>
  );
};

export default Cookies;
