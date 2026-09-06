"use client";

import React, { useState } from "react";
import { Mail, Instagram, Facebook, Youtube, Copy, Check } from "lucide-react";
import Caption from "@/components/ui/typography/caption";
import Paragraph from "@/components/ui/typography/paragraph";
import { CONTACT_EMAIL, socialLinks } from "@/constant/contact";
import { trackContact } from "@/lib/analytics/pixel-events";
import { notify } from "@/lib/notify";

/** TikTok has no lucide icon, so it ships as inline art that inherits colour. */
const TikTokIcon = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    aria-hidden="true"
  >
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.28 6.28 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.14 8.14 0 0 0 4.78 1.53V6.79a4.85 4.85 0 0 1-1-.1z" />
  </svg>
);

const socials: {
  name: string;
  href: string;
  Icon: React.ComponentType<{ className?: string }>;
}[] = [
  { name: "Instagram", href: socialLinks.instagram, Icon: Instagram },
  { name: "TikTok", href: socialLinks.tiktok, Icon: TikTokIcon },
  { name: "Facebook", href: socialLinks.facebook, Icon: Facebook },
  { name: "YouTube", href: socialLinks.youtube, Icon: Youtube },
];

const cardClassName =
  "border border-[#D1D5DB] rounded-[10px] lg:px-[12.5px] px-2.5 py-3.5 flex flex-col gap-2";

const ContactChannels = () => {
  const [copied, setCopied] = useState(false);

  // The address is shown as plain text with an explicit copy button rather than
  // relying on a mailto link. A mailto only works when the browser has a mail
  // app registered as a handler — on desktop Chrome with no default mail client
  // the click silently does nothing, which reads as a broken page. Copying works
  // everywhere, so mailto is kept only as a clearly-labelled second option.
  const handleCopy = async () => {
    trackContact();

    try {
      await navigator.clipboard.writeText(CONTACT_EMAIL);
      setCopied(true);
      notify.success("Email address copied");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard access needs a secure context and permission; if either is
      // missing the address is still on screen to select by hand.
      notify.error("Couldn't copy — please select the address to copy it.");
    }
  };

  return (
    <div className="w-full max-w-175 flex flex-col gap-4 lg:mt-8.5 mt-6">
      {/* Email */}
      <div className={cardClassName}>
        <div className="flex items-center gap-2">
          <Mail className="size-4 text-[#6F6E6C]" />
          <Caption
            className="text-[#3B3B3B] text-sm lg:text-base font-medium"
            title="Email"
          />
        </div>

        <span className="select-all text-[#3B3B3B] lg:text-base text-sm font-medium break-all">
          {CONTACT_EMAIL}
        </span>

        <div className="flex items-center gap-2 flex-wrap">
          <button
            type="button"
            onClick={handleCopy}
            className="inline-flex items-center gap-1.5 rounded-[10px] border border-[#D1D5DB] px-2.5 py-1.5 text-xs font-medium text-[#3B3B3B] hover:bg-[#F6F7F8] transition-colors"
          >
            {copied ? (
              <Check className="size-3.5" />
            ) : (
              <Copy className="size-3.5" />
            )}
            {copied ? "Copied" : "Copy address"}
          </button>

          {/* Only works where a mail app is registered, so it's labelled for
              what it does rather than sitting on the address itself. */}
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            onClick={() => trackContact()}
            className="inline-flex items-center rounded-[10px] border border-[#D1D5DB] px-2.5 py-1.5 text-xs font-medium text-[#3B3B3B] hover:bg-[#F6F7F8] transition-colors"
          >
            Open in mail app
          </a>
        </div>

        <Paragraph
          className="text-[#6F6E6C] lg:text-sm text-xs font-normal"
          content="For orders, returns, and general enquiries."
        />
      </div>

      {/* Social */}
      <div className={cardClassName}>
        <Caption
          className="text-[#3B3B3B] text-sm lg:text-base font-medium"
          title="Social"
        />

        <Paragraph
          className="text-[#6F6E6C] lg:text-sm text-xs font-normal"
          content="Follow along, or send us a message on any of our channels."
        />

        <div className="flex gap-3 mt-1">
          {socials.map(({ name, href, Icon }) => (
            <a
              key={name}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={name}
              className="rounded-full bg-[#3B3B3B] text-white size-10 flex justify-center items-center hover:opacity-80 transition-opacity"
            >
              <Icon className="size-5" />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ContactChannels;
