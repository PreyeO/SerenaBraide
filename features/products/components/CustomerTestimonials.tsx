"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import BorderLine from "@/components/ui/border-line";
import Paragraph from "@/components/ui/typography/paragraph";
import SubHeading from "@/components/ui/typography/subHeading";
import { StarRating } from "./shared";
import { CUSTOMER_TESTIMONIALS } from "../data/customer-testimonials";

const SWIPE_THRESHOLD_PX = 50;
const AUTOPLAY_MS = 6000;

const CustomerTestimonials = () => {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);

  const count = CUSTOMER_TESTIMONIALS.length;

  // Re-armed on every change of review, so after a click or swipe the customer
  // gets a full interval on the one they chose. Paused while hovered, focused
  // or touched, and off entirely for people who've asked for reduced motion.
  useEffect(() => {
    if (paused || count < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const timer = setTimeout(
      () => setIndex((current) => (current + 1) % count),
      AUTOPLAY_MS,
    );
    return () => clearTimeout(timer);
  }, [index, paused, count]);

  if (count === 0) return null;

  const goTo = (next: number) => setIndex((next + count) % count);
  const testimonial = CUSTOMER_TESTIMONIALS[index];

  const handleTouchEnd = (endX: number) => {
    if (touchStartX.current === null) return;
    const delta = endX - touchStartX.current;
    touchStartX.current = null;
    if (Math.abs(delta) < SWIPE_THRESHOLD_PX) return;
    goTo(delta < 0 ? index + 1 : index - 1);
  };

  return (
    <section className="text-[#3B3B3B] lg:pb-16 pb-10">
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

      <div
        className="max-w-3xl mx-auto lg:pt-14 pt-8 text-center"
        aria-roledescription="carousel"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocus={() => setPaused(true)}
        onBlur={() => setPaused(false)}
        onTouchStart={(e) => {
          setPaused(true);
          touchStartX.current = e.touches[0].clientX;
        }}
        onTouchEnd={(e) => {
          setPaused(false);
          handleTouchEnd(e.changedTouches[0].clientX);
        }}
      >
        {/* Keyed so each quote fades in fresh when it changes. */}
        <figure
          key={index}
          className="animate-in fade-in duration-500 flex flex-col items-center"
          aria-live="polite"
        >
          <span
            className="font-PPEditorialNew text-[#D6D6D6] lg:text-[96px] text-[64px] leading-none h-10 lg:h-14"
            aria-hidden="true"
          >
            &ldquo;
          </span>

          {testimonial.rating && (
            <StarRating
              rating={testimonial.rating}
              size="sm"
              className="justify-center mb-4"
            />
          )}

          <blockquote className="font-PPEditorialNew lg:text-[28px] text-xl lg:leading-10 leading-8 px-2 min-h-32 lg:min-h-40 flex items-center">
            {testimonial.text}
          </blockquote>

          <figcaption className="lg:pt-8 pt-6 flex flex-col gap-1">
            <span className="font-medium text-sm lg:text-base tracking-wide">
              {testimonial.name}
            </span>
            <span className="text-xs text-[#6F6E6C]">
              Shared via {testimonial.source}
              {testimonial.date &&
                ` · ${new Date(testimonial.date).toLocaleDateString("en-GB", {
                  month: "short",
                  year: "numeric",
                })}`}
            </span>
          </figcaption>
        </figure>

        {count > 1 && (
          <div className="flex items-center justify-center gap-6 lg:pt-10 pt-8">
            <button
              type="button"
              onClick={() => goTo(index - 1)}
              aria-label="Previous review"
              className="size-10 rounded-full border border-[#D6D6D6] flex items-center justify-center hover:border-[#3B3B3B] transition-colors"
            >
              <ArrowLeft className="size-4" />
            </button>

            <div className="flex gap-2">
              {CUSTOMER_TESTIMONIALS.map((item, i) => (
                <button
                  key={`${item.name}-${i}`}
                  type="button"
                  onClick={() => goTo(i)}
                  aria-label={`Show review ${i + 1} of ${count}`}
                  aria-current={i === index}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    i === index ? "w-6 bg-[#3B3B3B]" : "w-1.5 bg-[#D6D6D6]"
                  }`}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={() => goTo(index + 1)}
              aria-label="Next review"
              className="size-10 rounded-full border border-[#D6D6D6] flex items-center justify-center hover:border-[#3B3B3B] transition-colors"
            >
              <ArrowRight className="size-4" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default CustomerTestimonials;
