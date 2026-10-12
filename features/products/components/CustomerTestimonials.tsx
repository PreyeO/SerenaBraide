"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, Instagram, User } from "lucide-react";
import BorderLine from "@/components/ui/border-line";
import Paragraph from "@/components/ui/typography/paragraph";
import SubHeading from "@/components/ui/typography/subHeading";
import { StarRating } from "./shared";
import {
  CUSTOMER_TESTIMONIALS,
  CustomerTestimonial,
} from "../data/customer-testimonials";

// Lucide has no WhatsApp icon: its speech bubble with a small phone inside, in
// the same outline style as the rest of the site's icons.
const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
    <path
      transform="translate(12 12) scale(0.42) translate(-12 -12)"
      vectorEffect="non-scaling-stroke"
      d="M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384"
    />
  </svg>
);

const SourceIcon = ({ source }: { source: CustomerTestimonial["source"] }) => {
  const className = "size-3.5 shrink-0";
  if (source === "WhatsApp") return <WhatsAppIcon className={className} />;
  if (source === "Instagram")
    return <Instagram className={className} aria-hidden="true" />;
  return <User className={className} aria-hidden="true" />;
};

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
        <span
          className="block font-PPEditorialNew text-[#D6D6D6] lg:text-[96px] text-[64px] leading-none h-10 lg:h-14"
          aria-hidden="true"
        >
          &ldquo;
        </span>

        {/* Every review sits in the same grid cell and they crossfade, so one
            is always on screen (no blink) and the block keeps the height of
            the longest review (no jump between short and long ones). */}
        <div className="grid" aria-live="polite">
          {CUSTOMER_TESTIMONIALS.map((item, i) => {
            const isActive = i === index;
            return (
              <figure
                key={`${item.name}-${i}`}
                aria-hidden={!isActive}
                className={`col-start-1 row-start-1 flex flex-col items-center justify-center transition-opacity duration-700 ease-in-out ${
                  isActive ? "opacity-100" : "opacity-0 pointer-events-none"
                }`}
              >
                {item.rating && (
                  <StarRating
                    rating={item.rating}
                    size="sm"
                    className="justify-center mb-4"
                  />
                )}

                <blockquote className="font-PPEditorialNew lg:text-[28px] text-xl lg:leading-10 leading-8 px-2">
                  {item.text}
                </blockquote>

                <figcaption className="lg:pt-8 pt-6 flex flex-col gap-1">
                  <span className="font-medium text-sm lg:text-base tracking-wide">
                    {item.name}
                  </span>
                  <span className="text-xs text-[#6F6E6C] flex items-center justify-center gap-1.5">
                    <SourceIcon source={item.source} />
                    Shared via {item.source}
                    {item.date &&
                      ` · ${new Date(item.date).toLocaleDateString("en-GB", {
                        month: "short",
                        year: "numeric",
                      })}`}
                  </span>
                </figcaption>
              </figure>
            );
          })}
        </div>

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
