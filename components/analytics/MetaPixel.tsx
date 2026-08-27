// components/analytics/MetaPixel.tsx
"use client";

import Script from "next/script";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import {
  META_PIXEL_ID,
  PixelEvent,
  pixelTrack,
} from "@/lib/analytics/meta-pixel";

/**
 * Meta's base code, loaded once per browser session.
 *
 * `afterInteractive` is deliberate: the pixel is not needed to paint the page,
 * and deferring it keeps it off the critical path. The snippet queues any events
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
 * Reports a PageView for every client-side navigation after the first.
 *
 * The base code above already covers the initial load, so the first run of this
 * effect is skipped — otherwise the landing page would be counted twice.
 *
 * Keyed on pathname alone, not the query string: checkout rewrites its own
 * params several times per visit (attaching an order number, stripping a payment
 * status), and none of those are a new page to a customer.
 */
function PixelPageView() {
  const pathname = usePathname();
  const isInitialLoad = useRef(true);

  useEffect(() => {
    if (isInitialLoad.current) {
      isInitialLoad.current = false;
      return;
    }

    pixelTrack(PixelEvent.PageView);
  }, [pathname]);

  return null;
}

/**
 * Mounted once in the root layout, which puts the pixel on every page of the
 * site — the placement Meta's install instructions ask for.
 */
export default function MetaPixel() {
  // No pixel ID configured (local dev, preview builds) — render nothing rather
  // than shipping a snippet that would init against an empty ID.
  if (!META_PIXEL_ID) return null;

  return (
    <>
      <Script
        id="meta-pixel-base"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: baseCode }}
      />

      {/* Fallback for customers browsing with JavaScript disabled. */}
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

      <PixelPageView />
    </>
  );
}
