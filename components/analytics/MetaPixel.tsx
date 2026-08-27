// components/analytics/MetaPixel.tsx
"use client";

import Script from "next/script";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import {
  META_PIXEL_ID,
  PixelEvent,
  pixelTrack,
} from "@/lib/analytics/meta-pixel";

/**
 * Routes the pixel stays off entirely.
 *
 * Staff spend their working day in the dashboard, and those page views would
 * otherwise land in the same audiences and conversion data the ad spend is
 * optimised against — a handful of daily users looking like the site's most
 * engaged customers.
 *
 * Note this is admin only. The customer-facing auth pages are deliberately left
 * tracked: registering is a funnel step, and CompleteRegistration fires there.
 */
const EXCLUDED_PREFIXES = ["/admin"];

function isTrackedPath(pathname: string): boolean {
  return !EXCLUDED_PREFIXES.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`),
  );
}

/**
 * Meta's base code, verbatim, loaded once per browser session.
 *
 * `afterInteractive` is deliberate: the pixel isn't needed to paint the page, so
 * deferring it keeps it off the critical path. The snippet queues any events
 * fired before `fbevents.js` finishes downloading, so nothing is lost in the gap.
 */
const baseCode = `!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window,document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '${META_PIXEL_ID}');
fbq('track', 'PageView');`;

/**
 * Mounted once in the root layout, which puts the pixel on every page of the
 * site bar the exclusions above — the placement Meta's install instructions ask
 * for.
 */
export default function MetaPixel() {
  const pathname = usePathname() ?? "";
  const isTracked = Boolean(META_PIXEL_ID) && isTrackedPath(pathname);

  // Whether the base code is in the document. Latches on and never off: pulling
  // the snippet out and putting it back would re-run it and report a second
  // PageView. Someone who opens the dashboard first and then browses the shop
  // picks the pixel up from that point on.
  const [baseCodeMounted, setBaseCodeMounted] = useState(isTracked);
  const baseCodeMountedRef = useRef(isTracked);

  // The snippet reports the page it loads on itself, so that first view is
  // already covered and must not be sent twice.
  const initialViewPending = useRef(isTracked);

  useEffect(() => {
    if (!isTracked) return;

    // First tracked page after starting somewhere excluded. Mounting the base
    // code reports it, so there's nothing to send by hand here.
    if (!baseCodeMountedRef.current) {
      baseCodeMountedRef.current = true;
      setBaseCodeMounted(true);
      return;
    }

    if (initialViewPending.current) {
      initialViewPending.current = false;
      return;
    }

    // Every client-side navigation after that. The snippet only ever runs once,
    // so these views have to be reported manually.
    pixelTrack(PixelEvent.PageView);
  }, [pathname, isTracked]);

  // No pixel ID configured (local dev, preview builds) — render nothing rather
  // than shipping a snippet that would init against an empty ID.
  if (!META_PIXEL_ID) return null;

  return (
    <>
      {baseCodeMounted && (
        <Script
          id="meta-pixel-base"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{ __html: baseCode }}
        />
      )}

      {/* Fallback for customers browsing with JavaScript disabled. */}
      {isTracked && (
        <noscript>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            alt=""
            src={`https://www.facebook.com/tr?id=${META_PIXEL_ID}&ev=PageView&noscript=1`}
          />
        </noscript>
      )}
    </>
  );
}
