import React from "react";
import LegalTypography from "./shared-components/LegalTypography";
import LegalParagraph from "./shared-components/LegalParagraph";
import LegalList from "./shared-components/LegalList";
import LegalHeader from "./shared-components/LegalHeader";
import {
  CookiesTypeList,
  useCookiesList,
} from "@/components/legal-sections/data/legal";

const Cookies = () => {
  return (
    <section className="lg:px-12.5 md:px-6 px-0 flex flex-col lg:gap-8.5 gap-6 pb-12.5">
      <LegalHeader title="Cookies Policy">
        <LegalParagraph>
          This Cookies Policy explains how Serena Braide{" "}
          {`("we," "our," or "us")`} uses cookies and similar technologies when
          you visit or interact with our website at{" "}
          <a
            href="https://www.serenabraide.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 underline transition-colors"
          >
            www.serenabraide.com
          </a>
          . By continuing to browse our site, you consent to the use of cookies
          as described below.
        </LegalParagraph>
      </LegalHeader>

      <LegalTypography title="What Are Cookies?">
        <LegalParagraph>
          Cookies are small text files placed on your device when you visit a
          website. They help the site recognize your browser, remember your
          preferences, and improve your overall user experience.
        </LegalParagraph>
      </LegalTypography>

      <LegalTypography title="Why Use Cookies?">
        <LegalParagraph>We use cookies for:</LegalParagraph>
        <LegalList items={useCookiesList} />
      </LegalTypography>

      <LegalTypography title="Types of Cookies We Use">
        <LegalList items={CookiesTypeList} />
      </LegalTypography>

      <LegalTypography title="How To Manage Cookies">
        <LegalParagraph>
          You can choose to accept or reject certain types of cookies through
          your browser settings or by adjusting cookie preferences on our site.
        </LegalParagraph>

        <LegalParagraph>
          Please note: disabling some cookies may affect your experience on our
          website.
        </LegalParagraph>
      </LegalTypography>
    </section>
  );
};

export default Cookies;
