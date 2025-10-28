import React from "react";
import LegalTypography from "./shared-components/LegalTypography";
import Paragraph from "../ui/typography/paragraph";
import { CookiesTypeList, useCookiesList } from "@/constant/legal";

const Cookies = () => {
  return (
    <section className="px-[50px] flex flex-col gap-[34px] pb-[50px]">
      <div className="gap-[6px] flex flex-col text-[#3B3B3B] font-normal">
        <h2 className=" text-[26px]">Cookies Policy</h2>

        <p className="text-sm leading-[22px] w-[832px] ">
          {`This Cookies Policy explains how Serena Braide ("we," "our," or "us")
          uses cookies and similar technologies when you visit or interact with
          our website at `}
          <a
            href="https://www.serenabraide.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 underline cursor-pointer transition-colors"
          >
            www.serenabraide.com
          </a>
          . By continuing to browse our site, you consent to the use of cookies
          as described below.
        </p>
      </div>

      <LegalTypography title="What Are Cookies?" className="">
        <Paragraph
          className="text-sm leading-[22px] w-[832px]"
          content="Cookies are small text files placed on your device when you visit a website. 
          They help the site recognize your browser, remember your preferences, and improve your 
          overall user experience."
        />
      </LegalTypography>

      <LegalTypography title="Why Use Cookies?" className="">
        <div className="text-sm leading-[22px] w-[832px]">
          <Paragraph
            content="We use cookies for:"
            className="text-sm leading-[22px] w-[832px] "
          />
          <ul className="list-disc ml-8">
            {useCookiesList.map((item, index) => (
              <li key={index}>{item.list}</li>
            ))}
          </ul>
        </div>
      </LegalTypography>

      <LegalTypography title="Types of Cookies We Use" className="">
        <div className="text-sm leading-[22px] w-[832px]">
          <ul className="list-disc ml-8">
            {CookiesTypeList.map((item, index) => (
              <li key={index}>{item.list}</li>
            ))}
          </ul>
        </div>
      </LegalTypography>

      <LegalTypography title="How To Manage Cookies" className="">
        <Paragraph
          className="text-sm leading-[22px] w-[832px]"
          content="You can choose to accept or reject certain types of cookies through 
          your browser settings or by adjusting cookie preferences on our site (if applicable).
          Most browsers also allow you to delete cookies that have already been placed."
        />
        <Paragraph
          className="text-sm leading-[22px] w-[832px]"
          content="Please note: disabling some cookies may affect your experience on our website."
        />
      </LegalTypography>
      <LegalTypography title="Privacy" className="">
        <Paragraph
          className="text-sm leading-[22px] w-[832px]"
          content="We may update this Cookies Policy from time to time to reflect changes in 
          technology or regulation. Please revisit this page for the latest information."
        />
      </LegalTypography>
    </section>
  );
};

export default Cookies;
