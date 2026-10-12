"use client";

import { Quote } from "lucide-react";
import BorderLine from "@/components/ui/border-line";
import Paragraph from "@/components/ui/typography/paragraph";
import SubHeading from "@/components/ui/typography/subHeading";
import { StarRating } from "./shared";
import { CUSTOMER_TESTIMONIALS } from "../data/customer-testimonials";

const initials = (name: string) =>
  name
    .split(/\s+/)
    .filter((part) => /^[a-z]/i.test(part))
    .slice(0, 2)
    .map((part) => part[0].toUpperCase())
    .join("");

const formatDate = (date: string) =>
  new Date(date).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

const CustomerTestimonials = () => {
  if (CUSTOMER_TESTIMONIALS.length === 0) return null;

  return (
    <section className="text-[#3B3B3B] lg:pb-12.5 pb-6">
      <BorderLine className="" />

      <div className="lg:pt-12.5 pt-6 flex flex-col gap-1.5 max-w-125.75 mx-auto items-center text-center">
        <SubHeading
          title="What customers are saying"
          className="lg:text-[40px] text-[22px] font-medium"
        />
        <Paragraph
          className="leading-5.5 text-sm text-[#6F6E6C]"
          content="Kindly drop a review after your purchase."
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6 lg:pt-12.5 pt-6">
        {CUSTOMER_TESTIMONIALS.map((testimonial, index) => (
          <article
            key={`${testimonial.name}-${index}`}
            className="bg-[#F6F7F8] rounded-[10px] border border-[#F5F5F5] lg:p-8 p-6 flex flex-col gap-5"
          >
            <Quote
              className="size-7 text-[#D6D6D6] fill-[#D6D6D6] shrink-0"
              aria-hidden="true"
            />

            {testimonial.rating && (
              <StarRating rating={testimonial.rating} size="sm" />
            )}

            <p className="flex-1 font-normal text-sm lg:text-base leading-5.5 lg:leading-6.5">
              {testimonial.text}
            </p>

            <div className="flex gap-3 items-center pt-5 border-t border-[#E5E5E5]">
              <span className="rounded-full bg-white text-[#3B3B3B] text-sm font-medium size-10 flex items-center justify-center shrink-0">
                {initials(testimonial.name)}
              </span>
              <div className="flex flex-col">
                <span className="font-medium text-sm lg:text-base">
                  {testimonial.name}
                </span>
                <span className="text-xs text-[#6F6E6C]">
                  Shared via {testimonial.source}
                  {testimonial.date && ` · ${formatDate(testimonial.date)}`}
                </span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default CustomerTestimonials;
