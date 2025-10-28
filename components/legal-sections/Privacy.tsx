import React from "react";
import LegalTypography from "./shared-components/LegalTypography";
import Paragraph from "../ui/typography/paragraph";
import {
  collectedCookiesList,
  CookiesTypeList,
  dataRights,
  dataShared,
  useCookiesList,
  useOfData,
  whyCookiesList,
} from "@/constant/legal";
import { effectiveDate } from "@/lib/utils";
import Link from "next/link";

const Privacy = () => {
  return (
    <section className="px-[50px] flex flex-col gap-[34px] pb-[50px]">
      <div className="gap-[6px] flex flex-col text-[#3B3B3B] font-normal">
        <h2 className=" text-[26px]">Privacy Policy</h2>
        <p className="text-sm leading-[22px] w-[832px] ">
          Effective Date: {effectiveDate}
        </p>
        <p className="text-sm leading-[22px] w-[832px] ">
          Welcome to Serena Braide. Your privacy matters to us. This Privacy
          Policy explains how we collect, use, and protect your personal
          information when you visit or interact with our website at
          <a
            href="https://www.serenabraide.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 underline cursor-pointer transition-colors"
          >
            {" "}
            www.serenabraide.com
          </a>
          . By using our website, you agree to the terms of this Privacy Policy.
        </p>
      </div>

      <LegalTypography title="Information We Collect" className="">
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
            content="We collect the following type of information:"
            className="text-sm leading-[22px] w-[832px] "
          />
          <ul className="list-disc ml-8">
            {whyCookiesList.map((item, index) => (
              <li key={index}>{item.list}</li>
            ))}
          </ul>
        </div>
      </LegalTypography>

      <LegalTypography title="Automatically Collected Information" className="">
        <div className="text-sm leading-[22px] w-[832px]">
          <ul className="list-disc ml-8">
            {collectedCookiesList.map((item, index) => (
              <li key={index}>{item.list}</li>
            ))}
          </ul>
          <Link href="/coolie-policy" className="underline text-blue-400">
            (see our Cookies Policy)
          </Link>
        </div>
      </LegalTypography>
      <LegalTypography title="How We Use Your Information" className="">
        <div className="text-sm leading-[22px] w-[832px]">
          <Paragraph
            content="We use your information to:"
            className="text-sm leading-[22px] w-[832px] "
          />
          <ul className="list-disc ml-8">
            {useOfData.map((item, index) => (
              <li key={index}>{item.list}</li>
            ))}
          </ul>
        </div>
      </LegalTypography>
      <LegalTypography title="Sharing Your Information" className="">
        <div className="text-sm leading-[22px] w-[832px]">
          <Paragraph
            content="We do not sell your personal data"
            className="text-sm leading-[22px] w-[832px] "
          />
          <Paragraph
            content="We may share limited informtion with:"
            className="text-sm leading-[22px] w-[832px] "
          />
          <ul className="list-disc ml-8">
            {dataShared.map((item, index) => (
              <li key={index}>{item.list}</li>
            ))}
          </ul>
          <Paragraph
            content=" Only trusted partners are used, and they are required to protect your data and use it only for agreed purposes."
            className="text-sm leading-[22px] w-[832px] "
          />
        </div>
      </LegalTypography>

      <LegalTypography title="Your Privacy Rights" className="">
        <div className="text-sm leading-[22px] w-[832px]">
          <Paragraph
            content="Depending on your location, you may have rights to:"
            className="text-sm leading-[22px] w-[832px] "
          />
          <Paragraph
            content="We may share limited informtion with:"
            className="text-sm leading-[22px] w-[832px] "
          />
          <ul className="list-disc ml-8">
            {dataRights.map((item, index) => (
              <li key={index}>{item.list}</li>
            ))}
          </ul>
          <Paragraph
            content="To exercise these rights, please contact us at support@serenabraide.com."
            className="text-sm leading-[22px] w-[832px] "
          />
        </div>
      </LegalTypography>

      <LegalTypography title="Marketing Communications" className="">
        <Paragraph
          className="text-sm leading-[22px] w-[832px]"
          content="We only send promotional emails if you opt-in via our 
          newsletter or during checkout. You may unsubscribe at any time by clicking the 
          link in our emails."
        />
      </LegalTypography>
      <LegalTypography title="Data Security" className="">
        <Paragraph
          className="text-sm leading-[22px] w-[832px]"
          content="We take reasonable measures to protect your data using industry-standard 
          encryption, secure hosting, and access controls. However, no method of online transmission 
          is 100% secure."
        />
      </LegalTypography>
      <LegalTypography title="Children's Privacy" className="">
        <Paragraph
          className="text-sm leading-[22px] w-[832px]"
          content="Our website is not intended for children under 13. We do not knowingly 
          collect data from minors. If you believe a child has submitted data to us, please 
          contact us for removal."
        />
      </LegalTypography>
      <LegalTypography title="Third-Party Links" className="">
        <Paragraph
          className="text-sm leading-[22px] w-[832px]"
          content="We may update this Privacy Policy from time to time. 
          Any significant changes will be posted here. We encourage you to review this page 
          periodically."
        />
      </LegalTypography>
      <LegalTypography title="Changes to This Policy" className="">
        <Paragraph
          className="text-sm leading-[22px] w-[832px]"
          content="We may update this Privacy Policy from time to time. 
          Any significant changes will be posted here. We encourage you to review this page 
          periodically."
        />
      </LegalTypography>
    </section>
  );
};

export default Privacy;
