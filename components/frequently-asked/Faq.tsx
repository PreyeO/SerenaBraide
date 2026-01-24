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
    <section className="pb-20 pt-38 text-[#3B3B3B] ">
      <Accordion type="single" collapsible className="w-full max-w-175 mx-auto">
        <SubHeading
          className=" font-normal text-[26px]"
          title="Frequently Asked Questions — Serena Braide"
        />
        {faq.map((item, index) => (
          <AccordionItem
            key={index}
            value={`item-${index}`}
            className="pt-12.5"
          >
            <AccordionTrigger className="text-base font-normal ">
              {item.question}
            </AccordionTrigger>
            <AccordionContent className=" text-base font-normal leading-6 text-[#6F6E6C]">
              {item.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
};

export default Faq;
