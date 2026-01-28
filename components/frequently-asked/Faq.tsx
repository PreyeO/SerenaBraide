import React from "react";
import SubHeading from "../ui/typography/subHeading";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { faq } from "@/constant/data";

const Faq = () => {
  return (
    <section className="lg:pb-20 pb-8.5 pt-38 text-[#3B3B3B] px-6 ">
      <Accordion type="single" collapsible className="w-full max-w-175 mx-auto">
        <SubHeading
          className=" font-normal lg:text-[26px] text-[22px]"
          title="Frequently Asked Questions — Serena Braide"
        />
        {faq.map((item, index) => (
          <AccordionItem
            key={index}
            value={`item-${index}`}
            className="lg:pt-12.5 pt-8.5"
          >
            <AccordionTrigger className="lg:text-base tex-sm font-normal text-[#3B3B3B] lg:leading-6 leading-5.5">
              {item.question}
            </AccordionTrigger>
            <AccordionContent className=" lg:text-base text-sm font-normal lg:leading-6 leading-5.5 text-[#6F6E6C]">
              {item.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
};

export default Faq;
