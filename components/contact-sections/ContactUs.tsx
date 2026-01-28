import React from "react";
import ContactForm from "./ContactForm";
import SubHeading from "../ui/typography/subHeading";
import Paragraph from "../ui/typography/paragraph";

const ContactUs = () => {
  return (
    <section className=" pb-12.5 pt-38 px-6  ">
      <div className="w-full max-w-175 flex flex-col gap-1.5 items-start">
        <SubHeading
          className="text-[#3B3B3B] lg:text-[26px] text-[22px] font-normal "
          title="We'd Love to Hear from You"
        />
        <Paragraph
          className="text-[#3B3B3B] font-normal text-sm"
          content="Feel free to reach out with questions, feedback, or special requests."
        />
      </div>
      <ContactForm />
    </section>
  );
};

export default ContactUs;
