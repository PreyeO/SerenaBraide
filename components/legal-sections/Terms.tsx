import React from "react";
import LegalIntro from "./shared-components/LegalIntro";
import LegalTypography from "./shared-components/LegalTypography";
import Paragraph from "../ui/typography/paragraph";
import {
  ordersList,
  useOfWebsite,
} from "@/components/legal-sections/data/legal";
import Link from "next/link";

const Terms = () => {
  return (
    <section className="px-[50px] flex flex-col gap-[34px] pb-[50px]">
      <LegalIntro
        title="Terms of Service"
        content="Welcome to Serena Braide. By accessing or using our website, you agree to 
        be bound by the following Terms of Service. Please read them carefully before making a 
        purchase or browsing our offerings."
      />
      <LegalTypography className="" title="Overview">
        <Paragraph
          className="text-sm leading-[22px] w-[832px] "
          content="This website is operated by Serena Braide. Throughout the site, 
        the terms “we,” “us,” and “our” refer to Serena Braide. 
        These Terms apply to all users of the site, including browsers, customers, vendors, 
        and content contributors."
        />
      </LegalTypography>
      <LegalTypography className="" title="Use Of Website">
        <div className="text-sm leading-[22px]  w-[832px]">
          <Paragraph
            className=" "
            content="You agree to use this website only for lawful purposes and in accordance with these Terms. You may not:"
          />
          <ul className="list-disc ml-8 ">
            {useOfWebsite.map((item, index) => (
              <li key={index} className="">
                {item.list}
              </li>
            ))}
          </ul>
        </div>
      </LegalTypography>
      <LegalTypography className="" title="Product Information">
        <Paragraph
          className="text-sm leading-[22px] w-[832px] "
          content="We make every effort to display the colors, descriptions, and packaging 
          of our perfumes as accurately as possible. However, we cannot guarantee that your 
          device’s display will reflect the true appearance. All product availability and 
          pricing are subject to change without notice."
        />
      </LegalTypography>
      <LegalTypography className="" title="Orders & Payments">
        <div className="text-sm leading-[22px]  w-[832px]">
          <Paragraph
            className=" "
            content="By placing an order, you confirm that:"
          />
          <ul className="list-disc ml-8  ">
            {ordersList.map((item, index) => (
              <li key={index} className="">
                {item.list}
              </li>
            ))}
          </ul>
        </div>
      </LegalTypography>
      <LegalTypography className="" title="Privacy">
        <p className="text-sm leading-[22px] w-[832px] ">
          We value your privacy. Please refer to our{" "}
          <span className="underline text-blue-400">
            <Link href="/privacy_policy">Privacy Policy</Link>
          </span>{" "}
          to understand how we collect, use, and protect your personal
          information.
        </p>
      </LegalTypography>
    </section>
  );
};

export default Terms;
